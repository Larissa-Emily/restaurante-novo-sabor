import styled from "styled-components";

export const User = styled.div`
  padding-top: 15px;
  font-family: 'Open Sans', sans-serif; /* Aplicando Open Sans ao User */
`;

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => (props.isOpen ? "0" : "-250px")}; /* Controle da posição */
  height: 150vh;
  width: 250px;
  background-color: #2c3e50;
  transition: left 0.3s ease;
  padding-top: 30px;
  color: #ecf0f1;
  line-height: 50px;
  z-index: 999;

  /* Aplicando a fonte Roboto ao Container */
  font-family: 'Roboto', sans-serif;

  ul {
    text-transform: capitalize;
    list-style-type: none;
    padding: 0;
    margin: 0;

    span {
      font-size: 23px;
      font-weight: 600;
      margin-left: 20px;
    }
  }
  li {
    display: flex;
    align-items: center; /* Centraliza verticalmente ícones e texto */
    padding: 15px 20px;
    color: white;
    cursor: pointer;
    transition: 0.5s all;
  }

  li a {
    display: flex;
    align-items: center; /* Garante que o ícone e o texto fiquem centralizados */
    color: inherit;
    text-decoration: none;
    font-size: 18px;
    width: 100%; /* Faz o link ocupar todo o espaço do item */
  }

  svg {
    flex-shrink: 0; /* Evita que o ícone diminua de tamanho */
    margin-right: 15px; /* Espaçamento entre ícone e texto */
    font-size: 20px;
    color: #ffb347;
    align-self: center; /* Centraliza verticalmente em relação ao texto */
  }

  li:hover {
    background-color: #34495e;
    transition: background-color 0.3s ease;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: white;
  }
`;

export const Hamburger = styled.div`
  position: fixed;
  top: 15px;
  left: 15px;
  cursor: pointer;
  color: #000;
  font-family: 'Roboto', sans-serif; /* Aplicando Roboto ao Hamburger */
`;
