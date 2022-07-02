import styled from "styled-components";

export const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`;

export const ModalBlock = styled.div`
  width: 320px;
  padding: 20px;
  background: white;
  border-radius: 5px;
  h3 {
    margin: 0;
    font-size: 20px;
  }
  p {
    font-size: 16px;
  }
`;
