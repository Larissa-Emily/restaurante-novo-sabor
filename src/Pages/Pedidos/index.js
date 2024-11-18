import { useState, useEffect } from "react";
import { Container, Grid } from "./style.js";
import { Table, Tag, Space, Modal } from "antd";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [produtos, setProdutos] = useState([]); // Estado para os produtos do modal

  useEffect(() => {
    const buscarPedidos = async () => {
      const url = `https://system-manager-dl4u.onrender.com/api/obter-pedidos`;
      try {
        const response = await fetch(url);
        const result = await response.json();

        if (Array.isArray(result)) {
          setPedidos(result);
        } else {
          console.error("Formato de resposta inesperado", result);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    buscarPedidos();
  }, []);
  const handleFinalizar = async (item) => {
    const url = `https://system-manager-dl4u.onrender.com/api/atualizar-pedido/${item.mesaId}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Finalizado" }),
      });

      // Se a resposta não for ok, exibe um erro
      if (!response.ok) {
        const text = await response.text();
        console.error("Erro ao finalizar pedido:", text);
        throw new Error(`Erro do servidor: ${response.status}`);
      }

      // Aqui você pode acessar a lista de pedidos da mesa
      setPedidos((prevPedidos) => {
        return prevPedidos.map((pedido) => {
          // Verifica se o pedido corresponde ao mesaId e atualiza o status
          if (pedido.mesaId === item.mesaId && pedido.status !== "Finalizado") {
            return {
              ...pedido,
              status: "Finalizado", // Atualiza o status do pedido
            };
          }
          return pedido;
        });
      });
    } catch (error) {
      setError(`Erro ao finalizar pedido: ${error.message}`);
      console.error("Erro ao finalizar pedido:", error);
    }
  };

  const handleExcluir = async (item) => {
    const url = `https://system-manager-dl4u.onrender.com/api/deletar-pedido/${Number(
      item.mesaId
    )}`;
    try {
      const response = await fetch(url, { method: "DELETE" });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro ao excluir pedido:", errorText);
        throw new Error(`Erro do servidor: ${response.status} - ${errorText}`);
      }

      setPedidos((prevPedidos) =>
        prevPedidos.filter((pedido) => pedido.mesaId !== item.mesaId)
      );
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
    }
  };

  // Função para abrir o modal e setar os produtos
  const showProdutosModal = (pedidoProdutos) => {
    setProdutos(pedidoProdutos);
    setIsModalVisible(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setProdutos([]); // Limpa os produtos ao fechar o modal
  };

  const columns = [
    {
      title: "Mesa",
      dataIndex: "mesaId",
      key: "mesaId",
      render: (text) => <span>Mesa {text || "Desconhecida"}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Em andamento" ? "blue" : "green"}>{status}</Tag>
      ),
    },
    {
      title: "Ações",
      key: "action",
      render: (_, item) => (
        <Space size="middle">
          <button onClick={() => showProdutosModal(item.pedido)}>
            Ver Pedidos
          </button>
          <button onClick={() => handleExcluir(item)}>Excluir pedido</button>
          <button onClick={() => handleFinalizar(item)}>
            Finalizar Pedido
          </button>
        </Space>
      ),
    },
  ];

  return (
    <Container>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Grid>
        <h1>Painel de pedidos</h1>

        <Table
          columns={columns}
          dataSource={pedidos.filter((item) => item.status === "Em andamento")}
          rowKey="mesaId"
          pagination={false}
        />
      </Grid>

      {/* Modal para mostrar os produtos */}
      <Modal
        title="Produtos do Pedido"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <ul>
          {produtos.length > 0 ? (
            produtos.map((produto, idx) => (
              <li key={idx}>{produto?.nome || "Produto desconhecido"}</li>
            ))
          ) : (
            <li>Nenhum produto encontrado.</li>
          )}
        </ul>
      </Modal>
    </Container>
  );
}
