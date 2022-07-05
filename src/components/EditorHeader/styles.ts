import styled from "styled-components/macro";
import { primary } from "../../constants/color";

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const TopBarBlock = styled.div`
  position: relative;
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
