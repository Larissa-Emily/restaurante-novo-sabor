import { Container, Content, Header, Navegation } from "./styled.js";
import Table from "./Table/index.js";
import Button from "./Button/index.js";

export default function Cardapio() {
  return (
    <Container>
      <Content>
        <Header>
          <h1>Produtos cadastrados</h1>
        </Header>
        <Navegation>
          <Button />
        </Navegation>
        <Table />
      </Content>
    </Container>
  );
}
