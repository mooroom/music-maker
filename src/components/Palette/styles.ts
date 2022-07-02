import styled from "styled-components";
import { light } from "../../constants/color";

export const Block = styled.div`
  position: absolute;
  left: 0;
  top: 60px;
  width: 250px;
  bottom: 0;
  background: #f5f5f5;
  border-right: 1px solid black;
`;

export const Header = styled.div`
  width: 100%;
  height: 60px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Layer = styled.div`
  width: 100%;
  height: 85px;
  background-color: white;

  border: 1px solid #d2d2d2;

  & + & {
    border-top: none;
  }
`;

export const LayerAddContainer = styled.div`
  background: ${light};
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 50px;
  margin-left: 100px;
`;
