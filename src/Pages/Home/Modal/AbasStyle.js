// AbasStyle.js
import styled from "styled-components";
import { Tabs as AntTabs } from "antd";

export const StyledTabs = styled(AntTabs)`
  /* Estilos para o componente Tabs */
  .ant-tabs-nav {
    background-color: #2d3d50;
    padding: 10px;
    border-radius: 5px;
  }

  .ant-tabs-tab {
    color: #fff !important; /* Cor do texto das abas */
    font-weight: bold;

    &:hover {
      color: #fff; /* Cor ao passar o mouse */
    }
  }

  .ant-tabs-tab-active {
    border-radius: 5px;
    color: #fafafa !important;
  }

  .ant-tabs-ink-bar {
    background-color: #fff; /* Cor da barra embaixo das abas */
  }

  .ant-tabs-content-holder {
    overflow-y: auto; /* Adiciona rolagem vertical */
    max-height: 70vh; /* Define uma altura máxima para o conteúdo da aba */
    min-height: 350px;
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 5px;
  }
`;

export const SearchInput = styled.input`
  margin: 10px 0; /* Margem do campo de busca */
  padding: 10px; /* Espaçamento interno do campo de busca */
  border: 1px solid #ccc; /* Borda do campo de busca */
  border-radius: 4px; /* Borda arredondada do campo de busca */
  width: 98%; /* Largura total do campo de busca */
`;

export const Total = styled.div`
  padding-top: 1rem;
`;

export const ModalButton = styled.button`
  background-color: #2d3d50; /* Cor de fundo do botão */
  color: white; /* Cor do texto do botão */
  padding: 10px 20px; /* Espaçamento interno do botão */
  border: none; /* Remove a borda do botão */
  border-radius: 4px; /* Borda arredondada do botão */
  cursor: pointer; /* Cursor de ponteiro ao passar o mouse */
  transition: background-color 0.3s; /* Transição para a cor de fundo */
  margin: 10px 0;

  &:hover {
    background-color: #ffa500;
  }
`;

export const FormPay = styled.form`
  max-height: 60vh; /* Altura máxima */
  overflow-y: auto; /* Adiciona rolagem vertical */
  padding: 1rem;
  input {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 97%;
  }
`;

export const Summary = styled.div`
  max-height: 60vh; /* Altura máxima */
  overflow-y: auto; /* Adiciona rolagem vertical */
  padding: 1rem;
  ul {
    padding: 20px 0;

    li {
      padding: 5px 0;
    }
    button {
      color: #fafafa;
      background-color: #ffb347;
      padding: 2px 8px;
      cursor: pointer;
    }

    buttom:hover {
      background-color: #ffa500;
    }
  }
`;
