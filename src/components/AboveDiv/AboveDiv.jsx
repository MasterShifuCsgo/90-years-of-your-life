// AboveDiv.jsx
import styled from 'styled-components';

const AboveDiv = styled.div`
  background-color: #C8C8C8;
  margin-bottom: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em 5vw;

  @media (max-width: 768px) {
    padding: 1.5em 4vw;
    text-align: center;
  }
`;

export default AboveDiv;