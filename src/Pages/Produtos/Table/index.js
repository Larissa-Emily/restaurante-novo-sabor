import React, { useState, useEffect, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";

// Definindo as colunas da tabela
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Nome", width: 150 },
  { field: "price", headerName: "Preço", width: 150, type: "number" },
  { field: "category", headerName: "Categoria", width: 150 },
];

export default function CustomTable() {
  const [data, setData] = useState([]); // Estado para armazenar os dados
  const [error, setError] = useState(null); // Estado para armazenar erros

  // Função para buscar os dados da API
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://system-manager-dl4u.onrender.com/api/obter-dados");
      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }
      const result = await response.json();

      // Transformando os dados se necessário (ex: verificar se têm id, name, price)
      const formattedData = result.flatMap((item, index) =>
        item.produtos.map((produto, i) => ({
          id: index + 1, // Criando um ID único
          name: produto.nome, // Nome do produto
          price: Number(produto.preco).toFixed(2), // Preço do produto
          category: produto.categoria, // Categoria do produto
        }))
      );

      setData(formattedData); // Atualizando o estado com os dados formatados
    } catch (error) {
      setError(error.message); // Capturando e mostrando o erro
    }
  }, []); // Dependência vazia, pois não precisa de outros valores para funcionar

  useEffect(() => {
    fetchData(); // Chamando a função para buscar dados ao montar o componente
  }, [fetchData]); // Incluindo 'fetchData' como dependência

  return (
    <>
      {error && <div style={{ color: "red" }}>{error}</div>} {/* Exibir erro se existir */}
      <div style={{ height: 500, width: "100%", margin: "0 auto" }}>
        <DataGrid
          rows={data} // Usando os dados do estado 'data'
          columns={columns} // Colunas definidas no início
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          localeText={{
            toolbarDensity: "Size",
            toolbarDensityLabel: "Size",
            toolbarDensityCompact: "Small",
            toolbarDensityStandard: "Medium",
            toolbarDensityComfortable: "Large",
          }}
        />
      </div>
    </>
  );
}
