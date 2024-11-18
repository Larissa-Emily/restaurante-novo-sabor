import React, { useState } from "react";
import { Button, List } from "./style.js";

const SearchResults = ({ data, adicionarItem }) => {
  const [adicionados, setAdicionados] = useState({}); // Estado para controlar quais produtos foram adicionados

  if (!data || !data.length) return null;

  const resultList = data.map((item, idx) => {
    const produtosList = item.produtos.map((produto, index) => {
      const preco = parseFloat(produto.preco); // Converte para número

      const handleAddItem = (produto) => {
        adicionarItem(produto);
        setAdicionados((prev) => ({
          ...prev,
          [produto.nome]: true, // Marca o produto como adicionado
        }));

        // Volta para o estado normal após 2 segundos
        setTimeout(() => {
          setAdicionados((prev) => ({
            ...prev,
            [produto.nome]: false, // Retorna ao estado original
          }));
        }, 2000);
      };

      return (
        <List key={index}>
          <span>
            {produto.nome} - R$ {isNaN(preco) ? "0.00" : preco.toFixed(2)}
          </span>
          <Button type="button" onClick={() => handleAddItem(produto)}>
            {adicionados[produto.nome] ? "Adicionado" : "Adicionar"}
          </Button>
        </List>
      );
    });

    return (
      <div key={idx}>
        <h4>{item.nome}</h4>
        <ul>{produtosList}</ul>
      </div>
    );
  });

  return <div className="search-results">{resultList}</div>;
};

export default SearchResults;
