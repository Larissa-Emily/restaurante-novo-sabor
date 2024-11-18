import styled from "styled-components";

export const DashboardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;
export const Header = styled.div`
  padding: 50px;
  h1 {
    color: #2d2827;
  }
`;

export const DashboardContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  border-radius: 8px;
`;

export const Box = styled.div`
  width: 260px;
  height: 80px;
  padding: 20px;
  border: 1px solid #ddd; 
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; 
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 0;
    background-color: orange;
    color: white;
    text-align: center;
    font-weight: bold;
  }

  div {
    text-align: center;
    align-items: center;
    font-size: 30px;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
  }
`;

export const ChartContainer = styled.div`
  width: 90%;
  max-width: 1000px;
  height: 400px; /* Altura fixa para o gráfico */
  margin: 20px 0;
  @media (max-width: 768px) {
    height: 300px; /* Altura reduzida para telas menores */
  }
`;
