import styled from "styled-components";
import { GoPlay } from "react-icons/go";
import { light, primary } from "../../constants/color";
import { z_bottomBar } from "../../constants/zIndex";

export const BottomBarBlock = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 80px;
  border-top: 1px solid ghostwhite;
  background: white;
  z-index: ${z_bottomBar};
`;

export const BottomBarContainer = styled.div`
  padding: 0 40px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LeftWrapper = styled(Wrapper)``;

export const CenterWrapper = styled(Wrapper)``;
