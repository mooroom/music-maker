import styled from "styled-components";
import { primary } from "../../constants/color";

export const TopBarBlock = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 60px;
  background: ${primary};
`;

export const TopBarLogo = styled.div`
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translate(0%, -50%);
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  color: white;
  letter-spacing: 1px;
`;
