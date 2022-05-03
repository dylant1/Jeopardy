import styled from "styled-components";

const AboutWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

export const About = () => {
  return (
    <AboutWrapper>
      <div>description</div>
    </AboutWrapper>
  );
};
