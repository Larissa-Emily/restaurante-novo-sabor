import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  DashboardStyled,
  Header,
  Box,
  DashboardContainer,
  ChartContainer,
} from "./style.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Relatorio = () => { 
  const [pedidosPorDia, setPedidosPorDia] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [ultimaSemana, setUltimaSemana] = useState(null);
  const [totalDinheiro, setTotalDinheiro] = useState(0);
  const [totalCredito, setTotalCredito] = useState(0);
  const [totalDebito, setTotalDebito] = useState(0);

  useEffect(() => {
    const buscarPedidos = async () => {
      const url = `https://system-manager-dl4u.onrender.com/api/obter-pedidos`;
      try {
        const response = await fetch(url);
        const result = await response.json();

        if (Array.isArray(result)) {
          const hoje = new Date();
          const semanaAtual = getSemanaInicio(hoje);

          if (
            !ultimaSemana ||
            semanaAtual.getTime() !== ultimaSemana.getTime()
          ) {
            setPedidosPorDia([0, 0, 0, 0, 0, 0, 0]);
            setUltimaSemana(semanaAtual);
          }

          const diasDaSemana = Array(7).fill(0);

          result.forEach((pedido) => {
            const dataPedido = new Date(pedido.horario);
            if (
              getSemanaInicio(dataPedido).getTime() === semanaAtual.getTime()
            ) {
              const diaDaSemana = dataPedido.getDay();
              diasDaSemana[diaDaSemana]++;
            }
          });

          setPedidosPorDia(diasDaSemana);
        } else {
          console.error("Formato de resposta inesperado", result);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    buscarPedidos();
  }, [ultimaSemana]);

  useEffect(() => {
    const buscarPagamentos = async () => {
      const url = `https://system-manager-dl4u.onrender.com/api/obter-pagamentos`;
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`); 
        }

        const pagamentos = await response.json();

        if (Array.isArray(pagamentos)) {
          const totalDinheiro = pagamentos
            .filter((pagamento) => pagamento.meioPagamento === "dinheiro")
            .reduce((acc, pagamento) => acc + pagamento.valor, 0);

          const totalCredito = pagamentos
            .filter((pagamento) => pagamento.meioPagamento === "credito")
            .reduce((acc, pagamento) => acc + pagamento.valor, 0);

          const totalDebito = pagamentos
            .filter((pagamento) => pagamento.meioPagamento === "debito")
            .reduce((acc, pagamento) => acc + pagamento.valor, 0);

          setTotalDinheiro(totalDinheiro);
          setTotalCredito(totalCredito);
          setTotalDebito(totalDebito);
        } else {
          console.error("Formato de resposta inesperado", pagamentos);
        }
      } catch (error) {
        console.error("Erro ao buscar os pagamentos:", error);
      }
    };
    buscarPagamentos();
  }, []);

  const lineData = {
    labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    datasets: [
      {
        label: "Pedidos por dia",
        data: pedidosPorDia,
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Tendência de Pedidos por Dia" },
    },
  };

  return (
    <DashboardStyled>
      <Header>
        <h1>Dashboard de pedidos por dia</h1>
      </Header>
      <DashboardContainer>
        <Box>
          <span>Valor em dinheiro</span>
          <div>R${totalDinheiro.toFixed(2)}</div>
        </Box>
        <Box>
          <span>Valor em cartão de crédito</span>
          <div>R${totalCredito.toFixed(2)}</div>
        </Box>
        <Box>
          <span>Valor em cartão de débito</span>
          <div>R${totalDebito.toFixed(2)}</div>
        </Box>
      </DashboardContainer>
      <ChartContainer>
        <Line data={lineData} options={options} />
      </ChartContainer>
    </DashboardStyled>
  );
};

// Função para obter o início da semana (domingo)
const getSemanaInicio = (data) => {
  const novaData = new Date(data);
  const dia = novaData.getDay();
  novaData.setDate(novaData.getDate() - dia);
  novaData.setHours(0, 0, 0, 0);
  return novaData;
};

export default Relatorio;
