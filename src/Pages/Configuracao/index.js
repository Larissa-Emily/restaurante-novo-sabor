import React from "react";
import { Container} from "./style.js";
import EmBreve from "../../assets/config-em-breve.svg";

const Configuracao = () => {
  return (
    <Container>
      <img src={EmBreve} alt="img-em-breve" />
      <h1>Em breve</h1>
    </Container>
  );
};

export default Configuracao;
