import styled from "styled-components";

export const Container = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: 80%;

  h1 {
    margin-right: 20px;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: end;
  padding: 40px 0;

  h1 {
    color: #2d2827;
  }
  span {
    color: #332a;
  }
`;

export const Navegation = styled.div`
  width: 100%;
  padding: 30px 0;
  background-color: #fff;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  border-radius: 8px;

  button {
    width: 150px;
    padding: 15px;
    border-radius: 8px;
    background-color: #ffb347;
    color: #fff;
    cursor: pointer;
    border: 0;
    transition: ease-in-out 0.3s;
  }

  button:hover {
    background-color: #ffa500;
    box-shadow: 0px 10px 20px #ccc;
  }
`;
