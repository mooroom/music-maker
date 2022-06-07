import styled from "styled-components";
import { GoPlay } from "react-icons/go";
import { light, primary } from "../../constants/color";

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

export const RightWrapper = styled(Wrapper)``;

export const LayerAddContainer = styled.div`
  background: ${light};
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 50px;
  margin-left: 100px;
`;
