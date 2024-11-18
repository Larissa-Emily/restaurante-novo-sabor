import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Registro, Input, InputContainer, Container } from "../style.js";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

export default function Register() {
  const [produtos] = useState([]);
  const [nomeProduto, setNomeProduto] = useState("");
  const [categoriaProduto, setCategoriaProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");

  const [insumos, setInsumos] = useState([]);
  const [nomeInsumo, setNomeInsumo] = useState("");
  const [categoriaInsumo, setCategoriaInsumo] = useState("");
  const [quantidadeInsumo, setQuantidadeInsumo] = useState("");
  const [unidadeInsumo, setUnidadeInsumo] = useState("KG");

  const addInsumo = () => {
    if (nomeInsumo && categoriaInsumo && quantidadeInsumo > 0) {
      setInsumos((prevInsumos) => [
        ...prevInsumos,
        {
          nome: nomeInsumo,
          categoria: categoriaInsumo,
          quantidade: quantidadeInsumo,
          unidade: unidadeInsumo,
        },
      ]);
      // Limpar campos após adição
      setNomeInsumo("");
      setCategoriaInsumo("");
      setQuantidadeInsumo("");
      setUnidadeInsumo("KG");
    } else {
      toast.info("Preencha todos os campos do insumo corretamente!");
    }
  };

  const saveData = async () => {
    if (nomeProduto && categoriaProduto && precoProduto > 0) {
      const novoProduto = {
        nome: nomeProduto,
        categoria: categoriaProduto,
        preco: Number(precoProduto), // Garantir que o preço é um número
      };
      const dadosParaEnviar = { produtos: [...produtos, novoProduto], insumos };

      try {
        const response = await fetch("https://system-manager-dl4u.onrender.com/api/salvar-dados", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosParaEnviar),
        });

        if (!response.ok) {
          throw new Error(`Erro na resposta da API: ${response.statusText}`);
        }

        const data = await response.json();
        toast.success("Dados salvos com sucesso!");

        // Limpar campos após o envio
        setNomeProduto("");
        setCategoriaProduto("");
        setPrecoProduto("");
        setInsumos([]);
      } catch (error) {
        console.error("Erro ao salvar os dados:", error);
        toast.error("Houve um erro ao salvar os dados. Tente novamente.");
      }
    } else {
      toast.info("Preencha todos os campos do produto corretamente!");
    }
  };

  return (
    <Container>
      <Registro>
        <h2>Cadastro de Produtos</h2>
        <form>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              placeholder="Nome do produto"
              value={nomeProduto}
              onChange={(e) => setNomeProduto(e.target.value)}
            />
          </div>
          <div>
            <label>Categoria:</label>
            <input
              type="text"
              placeholder="Categoria do produto"
              value={categoriaProduto}
              onChange={(e) => setCategoriaProduto(e.target.value)}
            />
          </div>
          <div>
            <label>Preço de venda:</label>
            <input
              type="number"
              placeholder="Preço"
              value={precoProduto}
              onChange={(e) => setPrecoProduto(e.target.value)}
            />
          </div>
        </form>
      </Registro>

      <InputContainer>
        <h3>Tabela de Insumos</h3>
        <Input>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Medida</th>
              <th>Adicionar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Nome do insumo"
                  value={nomeInsumo}
                  onChange={(e) => setNomeInsumo(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Categoria do insumo"
                  value={categoriaInsumo}
                  onChange={(e) => setCategoriaInsumo(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Quantidade"
                  value={quantidadeInsumo}
                  onChange={(e) => setQuantidadeInsumo(e.target.value)}
                />
              </td>
              <td>
                <select
                  value={unidadeInsumo}
                  onChange={(e) => setUnidadeInsumo(e.target.value)}
                >
                  <option value="KG">KG</option>
                  <option value="UN">UN</option>
                </select>
              </td>
              <td>
                <button className="addInsumo" type="button" onClick={addInsumo}>
                  +
                </button>
              </td>
            </tr>
            {insumos.map((insumo, index) => (
              <tr key={index}>
                <td data-label="Produto">{insumo.nome}</td>
                <td data-label="Categoria">{insumo.categoria}</td>
                <td data-label="Quantidade">{insumo.quantidade}</td>
                <td data-label="Medida">{insumo.unidade}</td>
                <td className="buttons">
                  <button>
                    <MdEdit />
                  </button>
                  <button>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Input>
        <div className="saveButton">
          <button className="toback">
            <Link to="/produtos">Voltar</Link>
          </button>
          <button className="saveData" onClick={saveData}>
            Salvar Todos os Dados
          </button>
        </div>
      </InputContainer>
    </Container>
  );
}
