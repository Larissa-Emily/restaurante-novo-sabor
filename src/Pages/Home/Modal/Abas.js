import React, { useState } from "react";
import SearchResults from "../../../Components/SearchResults/index.js";
import {
  ModalButton,
  SearchInput,
  StyledTabs,
  FormPay,
  Total,
  Summary,
} from "./AbasStyle.js"; // Importe os estilos
import { toast } from 'react-toastify';

const Abas = ({
  inputRef,
  data,
  searchTerm,
  handleInputChange,
  adicionarItem,
  itensSelecionados,
  handlePedidos,
  pedidos,
  setPedidos,
  setItensSelecionados,
  mesaAtual,
  setMesas,
}) => {
  function Values({ itensSelecionados, pedidos }) {
    const totalSelecionados = itensSelecionados.reduce((acc, item) => {
      const preco = parseFloat(item.preco); // Converte o preço para número
      return acc + (isNaN(preco) ? 0 : preco); // Soma os preços, ignorando valores não numéricos
    }, 0);

    const totalPedidos = pedidos.reduce((acc, item) => {
      const preco = parseFloat(item.preco); // Converte o preço para número
      return acc + (isNaN(preco) ? 0 : preco); // Soma os preços, ignorando valores não numéricos
    }, 0);

    return totalSelecionados + totalPedidos; // Retorna a soma total
  }

  const total = Values({ itensSelecionados, pedidos });

  const [meioPagamento, setMeioPagamento] = useState("");

  const handleRemove = (index) => {
    setItensSelecionados((prevItens) => {
      const novosItens = [...prevItens]; // Cria uma cópia do array
      novosItens.splice(index, 1); // Remove o item no índice especificado
      return novosItens; // Retorna o novo array
    });
  };
  const handlePay = async (e) => {
    e.preventDefault();
    if (!meioPagamento) { 
      toast.info("Necessário preencher os campos!");
      return;
    }

    // Verifica o status do pedido
    const urlPedidos = `https://system-manager-dl4u.onrender.com/api/obter-pedidos?mesaId=${mesaAtual.id}`;
    const responsePedidos = await fetch(urlPedidos);

    if (!responsePedidos.ok) {
      toast.error("Erro ao verificar os pedidos. Tente novamente mais tarde.");
      return;
    }

    const pedidosData = await responsePedidos.json();

    // Verifica se o status do pedido é "Em andamento"
    const pedidoEmAndamento = pedidosData.some(
      (pedido) => pedido.status === "Em andamento"
    );

    if (pedidoEmAndamento) {
      toast.info(
        "O pedido ainda não foi finalizado. Não é possível efetuar o pagamento."
      );
      return;
    }

    const pagamento = {
      meioPagamento: meioPagamento,
      valor: total,
      mesaId: mesaAtual.id,
    };

    const url = `https://system-manager-dl4u.onrender.com/api/salvar-pagamentos`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pagamento),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          console.log("Resposta do servidor:", text);
          throw new Error(`Erro do servidor: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Limpar o campo de meio de pagamento
        setMeioPagamento("");

        // Limpar os itens selecionados da mesa atual
        setItensSelecionados([]);

        // Limpar o estado de pedidos para atualizar a interface
        setPedidos([]);

        // Remover o pedido da mesa atual do localStorage
        const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || {};
        delete pedidosSalvos[mesaAtual.id]; // Remove o pedido da mesa atual
        localStorage.setItem("pedidos", JSON.stringify(pedidosSalvos));

        // Torna a mesa livre (ocupada = false)
        setMesas((prevMesas) =>
          prevMesas.map((mesa) =>
            mesa.id === mesaAtual.id ? { ...mesa, ocupada: false } : mesa
          )
        );
      })
      .catch((error) => {
        console.error("Erro ao salvar os pedidos:", error);
      });
  };

  const tabItems = [
    {
      key: "1",
      label: "Pedido",
      children: (
        <div>
          <form>
            <label htmlFor="search">Buscar Item</label>
            <SearchInput // Use o componente estilizado
              name="search"
              id="search"
              onChange={handleInputChange}
              ref={inputRef}
              value={searchTerm}
              placeholder="Pesquisar"
            />
          </form>
          <SearchResults data={data} adicionarItem={adicionarItem} />
        </div>
      ),
    },
    {
      key: "2",
      label: "Resumo de pedido",
      children: (
        <Summary>
          <h3>Resumo dos Pedidos:</h3>
          <ul>
            {itensSelecionados.map((item, index) => (
              <li key={index}>
                {item.nome} - R$ {item.preco ? item.preco : "0.00"} -{" "}
                <button onClick={() => handleRemove(index)}>X</button>
              </li>
            ))}
            {/* Aqui você pode adicionar a lista de pedidos que já foram feitos */}
            {pedidos.map((item, index) => (
              <li key={index}>
                {item.nome} - R$ {item.preco}
              </li>
            ))}
          </ul>
          <Total>
            <p>Valor total: R$ {total.toFixed(2)}</p>
          </Total>
          <ModalButton type="button" onClick={handlePedidos}>
            Enviar para a cozinha
          </ModalButton>
        </Summary>
      ),
    },
    {
      key: "3",
      label: "Pagamento",
      children: (
        <FormPay>
          <div>
            <label>
              Método de Pagamento:
              <input
                type="text"
                name="pagamento"
                value={meioPagamento}
                onChange={(e) => setMeioPagamento(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Valor:
              <input
                type="number"
                name="valor"
                value={total.toFixed(2)}
                readOnly
              />
            </label>
          </div>
          <ModalButton type="submit" onClick={handlePay}>
            Confirmar Pagamento
          </ModalButton>
        </FormPay>
      ),
    },
  ];

  return <StyledTabs defaultActiveKey="1" items={tabItems} />; // Use o componente estilizado
};

export default Abas;
