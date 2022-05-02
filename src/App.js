import { Home } from "./Home";
import styled from "styled-components";

const PageWrapper = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <PageWrapper>
      <div>navbar</div>
      <Home />
      {
        //add routes here
      }
      <div>footer</div>
    </PageWrapper>
  );
}

export default App;
