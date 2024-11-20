import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { ModalButton, customStyles } from "../style.js";
import Abas from "./Abas.js";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const MesaModal = ({
  modalIsOpen,
  closeModal,
  mesaAtual,
  adicionarPedido,
  pedidos,
  setPedidos,
  setMesas,
}) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itensSelecionados, setItensSelecionados] = useState([]);

  const inputRef = useRef(null);

  // Foco no campo de pesquisa ao abrir o modal
  useEffect(() => {
    if (modalIsOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [modalIsOpen]);

  // Função para lidar com a mudança de entrada no campo de pesquisa
  const handleInputChange = async (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (!value) {
      setData([]);
      return;
    }

    try {
      const url = `https://system-manager-dl4u.onrender.com/api/obter-dados`;
      const response = await fetch(url);
      const result = await response.json();

      if (Array.isArray(result)) {
        const filteredResults = result.filter((item) =>
          item.produtos.some((produto) =>
            produto.nome.toLowerCase().includes(value.toLowerCase())
          )
        );
        setData(filteredResults);
      }
    } catch (error) {
      toast.error("Erro ao buscar os dados:", error);
    }
  };

  // Função para adicionar um item à lista de itens selecionados
  const adicionarItem = (produto) => {
    setItensSelecionados((prev) => [...prev, produto]);
  };

  // Função para lidar com o envio do pedido
  const handlePedidos = async () => {
    if (itensSelecionados.length === 0) {
      toast.info("Selecione ao menos um item antes de confirmar o pedido.");
      return;
    }

    let pedidoComMesa = {
      mesaId: mesaAtual.id,
      pedido: itensSelecionados,
      status: "Em andamento",
      horario: new Date().toISOString(),
    };

    try {
      const url = `https://system-manager-dl4u.onrender.com/api/salvar-pedidos`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoComMesa),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro do servidor: ${errorData.message}`);
      }

      toast.success("Pedido criado com sucesso!");
      adicionarPedido(mesaAtual.id, itensSelecionados);
      setSearchTerm("");
      setItensSelecionados([]); // Limpa os itens selecionados
      closeModal();
    } catch (error) {
      toast.error("Erro ao salvar os pedidos:", error);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Detalhes da Mesa"
    >
      <ModalButton>
        <IoClose onClick={closeModal} />
      </ModalButton>
      <Abas
        inputRef={inputRef}
        data={data}
        searchTerm={searchTerm}
        handleInputChange={handleInputChange}
        adicionarItem={adicionarItem}
        itensSelecionados={itensSelecionados}
        setItensSelecionados={setItensSelecionados}
        handlePedidos={handlePedidos}
        pedidos={pedidos}
        setPedidos={setPedidos}
        mesaAtual={mesaAtual}
        setMesas={setMesas}
      />
    </Modal>
  );
};

export default MesaModal;
