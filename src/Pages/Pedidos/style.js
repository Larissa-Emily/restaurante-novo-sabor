import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width:780px){
      padding: 0 20px ;
    }
`;

export const Grid = styled.div`
  max-width: 100%;
  margin-top: 150px;

  h1 {
    padding-bottom: 30px;
    color: #2d2827;
  }

  button {
    width: 150px;
    padding: 8px;
    margin: 10px;
    border: none;
    border-radius: 8px;
    background-color: #ffb347;
    color: #fafafa;
    cursor: pointer;
  }


`;
