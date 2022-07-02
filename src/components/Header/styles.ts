import styled from "styled-components";
import { light } from "../../constants/color";

export const HeaderBlock = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  height: 60px;
  background: green;
`;

export const LayerAddContainer = styled.div`
  background: ${light};
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 50px;
  margin-left: 100px;
`;
