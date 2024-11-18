import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 60px;
  align-items: center;
  font-family: "Roboto", sans-serif;
`;

export const Registro = styled.header`
  width: 100%;
  padding: 40px 0;

  h2 {
    padding-bottom: 15px;
    color: #333;
    text-transform: uppercase;
  }

  form {
    display: flex;
  }

  label {
    color: #333;
  }

  input {
    width: 200px;
    padding: 12px;
    border: 1px solid #332e;
    outline: none;
    border-radius: 20px;
    margin: 0 20px 0 10px;
  }

  @media (max-width: 820px) {
    padding: 0;
    form {
      display: block;
    }

    input {
      width: 95%; /* Faz o input ocupar 100% da largura */
      margin-bottom: 10px;
      box-sizing: border-box; /* Garante que padding e borda sejam incluídos na largura total */
    }
  }
`;

export const Input = styled.table`
  border: 1px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;

  caption {
    padding: 10px;
    font-weight: bold;
  }

  input {
    text-align: center;
    padding: 10px;
  }

  button {
    width: 50px;
    padding: 5px;
    background-color: #2d3d50;
    color: #fafafa;
    cursor: pointer;
    border: none;
    transition: ease-in-out 0.3s;
  }

  button:hover {
    background-color: #ffa500;
  }

  thead {
    background-color: #2d3d50;
    color: #fafafa;
  }

  th,
  td {
    padding: 8px 10px;
    border: 1px solid rgb(160 160 160);
  }

  tr:nth-child(even) {
    background-color: #eee;
  }

  .buttons {
    display: flex;
  }

  .buttons button {
    margin: 0 5px;
  }

  @media (max-width: 980px) {
    thead {
      display: none;
    }

    tr {
      display: block;
      margin-bottom: 10px;
    }

    td {
      display: block;
      position: relative;
    }

    td:last-child {
      padding: 0;
    }

    td:before {
      content: attr(
        data-label
      ); /* O conteúdo do data-label é adicionado antes de cada coluna */
      position: absolute;
      left: 0;
      width: 50%;
      padding-left: 10px;
      font-weight: bold;
      text-align: left;
    }

    td input {
      width: 100%; /* Faz o input ocupar 100% da largura */
      padding: 20px;
      box-sizing: border-box; /* Garante que padding e borda sejam incluídos na largura total */
    }

    button {
      width: 100%;
      padding: 10px;
    }
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 20px 0px;

  h3 {
    padding-bottom: 20px;
    color: #333;
  }

  .saveButton {
    width: 100%;
    display: flex;
    justify-content: end;
  }

  .saveData, .toback {
    width: 200px;
    padding: 10px;
    border: none;
    background-color: #2d3d50;
    color: #fff;
    margin: 100px 10px 0 0;
    transition: ease-in-out 0.3s;
    cursor: pointer;
  }

  .toback a{
    color: inherit;
    text-decoration: none;
  }

  .saveData:hover, .toback:hover {
    background-color: #ffa500;
    box-shadow: 0px 10px 20px #ccc;
  }

  @media (max-width: 980px) {
    .saveData {
      width: 100%;
    }
  }
`;
