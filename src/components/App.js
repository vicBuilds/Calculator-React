import Screen from "./Screen";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Container>
      <Screen />
    </Container>
  );
}

export default App;
