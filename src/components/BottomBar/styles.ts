import styled from "styled-components";
import { GoPlay } from "react-icons/go";
import { primary } from "../../constants/color";

export const BottomBarBlock = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  border-top: 1px solid ghostwhite;
  background: white;
`;

export const BottomBarContainer = styled.div`
  padding: 0 40px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;
