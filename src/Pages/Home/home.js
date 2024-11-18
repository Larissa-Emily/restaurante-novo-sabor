import React, { useState, useEffect } from "react";
import Modal from "./Modal/index.js";
import {
  Title,
  Container,
  ContainerMesas,
  MesaContainer,
  Mesa,
  Button,
  mesaStyles,
  Components,
} from "./style.js";

export default function Home() {
  const [mesas, setMesas] = useState(() => {
    const mesasSalvas = localStorage.getItem("mesas");
    return mesasSalvas ? JSON.parse(mesasSalvas) : [];
  });

  const [pedidos, setPedidos] = useState(() => {
    const pedidosSalvos = localStorage.getItem("pedidos");
    return pedidosSalvos ? JSON.parse(pedidosSalvos) : {};
  });

  const [mesaSelecionada, setMesaSelecionada] = useState(null);

  useEffect(() => {
    localStorage.setItem("mesas", JSON.stringify(mesas));
  }, [mesas]);

  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }, [pedidos]);

  const adicionarMesa = () => {
    const novaMesaId = mesas.length + 1;
    const novaMesa = {
      id: novaMesaId,
      nome: `Mesa ${novaMesaId}`,
      valorTotal: "R$0,00",
      ocupada: false,
    };
    setMesas((prevMesas) => [...prevMesas, novaMesa]);
  };

  const abrirModal = (mesa) => {
    setMesaSelecionada(mesa);
  };

  const fecharModal = () => {
    setMesaSelecionada(null);
  };

  const calcularValorTotalMesa = (mesaId) => {
    const mesaPedidos = pedidos[mesaId] || [];
    const total = mesaPedidos.reduce(
      (acc, item) => acc + parseFloat(item.preco || 0),
      0
    );
    return `R$${total.toFixed(2)}`;
  };

  const adicionarPedido = (mesaId, itensSelecionados) => {
    setPedidos((prevPedidos) => {
      const novosPedidos = {
        ...prevPedidos,
        [mesaId]: [...(prevPedidos[mesaId] || []), ...itensSelecionados],
      };
      return novosPedidos;
    });

    setMesas((prevMesas) =>
      prevMesas.map((mesa) =>
        mesa.id === mesaId
          ? {
              ...mesa,
              ocupada: true,
              valorTotal: calcularValorTotalMesa(mesaId),
            }
          : mesa
      )
    );
  };

  const removerPedido = (mesaId, pedidoIndex) => {
    setPedidos((prevPedidos) => {
      const mesaPedidos = prevPedidos[mesaId] || [];
      const novosPedidos = {
        ...prevPedidos,
        [mesaId]: mesaPedidos.filter((_, index) => index !== pedidoIndex),
      };

      setMesas((prevMesas) =>
        prevMesas.map((mesa) =>
          mesa.id === mesaId
            ? { ...mesa, valorTotal: calcularValorTotalMesa(mesaId) }
            : mesa
        )
      );

      return novosPedidos;
    });
  };

  return (
    <Components>
      <Title>
        <h1>Gerenciamento de mesas</h1>
        <Button onClick={adicionarMesa}>Criar mesa</Button>
      </Title>
      <Container>
        <ContainerMesas>
          <MesaContainer>
            {mesas.length < 1
              ? "Não há mesas criadas"
              : mesas.map((mesa) => (
                  <Mesa
                    key={mesa.id}
                    onClick={() => abrirModal(mesa)}
                    style={mesaStyles(mesa.ocupada)}
                  >
                    {mesa.nome}
                  </Mesa>
                ))}
          </MesaContainer>

          {mesaSelecionada && (
            <Modal
              modalIsOpen={!!mesaSelecionada}
              closeModal={fecharModal}
              mesaAtual={mesaSelecionada}
              adicionarPedido={adicionarPedido}
              pedidos={pedidos[mesaSelecionada.id] || []}
              removerPedido={removerPedido}
              setMesas={setMesas}
              setPedidos={setPedidos}
            />
          )}
        </ContainerMesas>
      </Container>
    </Components>
  );
}
