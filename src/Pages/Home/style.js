import styled from "styled-components";

export const Components = styled.div`
  padding-top: 50px;
`;

export const Title = styled.div`
  text-align: center; 
  color: #2d2827;
  padding-top: 50px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px 0;
`;

export const ContainerMesas = styled.div`
  max-width: 90%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

// Função que retorna o objeto de estilo com base nas props
export const mesaStyles = (ocupada) => ({
  width: "225px",
  height: "105px",
  margin: "10px",
  backgroundColor: ocupada ? "#ff6347" : "#32CD32",
  color: "white",
  fontSize: "20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff", // Cor de fundo do modal
    padding: "20px", // Padding interno
    borderRadius: "10px", // Bordas arredondadas
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Sombra para profundidade
    minHeight: "350px", // Altura automática
    width: "70%",
    outline: "none", // Remove a borda padrão do modal
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente
  },
};

export const ModalButton = styled.div`
  width: 100%;
  text-align: end;

  svg {
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    color: #ffb347;
  }

  svg:hover {
    color: #f0b061;
  }
`;

export const MesaContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Mesa = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  border: 2px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

export const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2d3d50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2d3d60;
  }
`;
