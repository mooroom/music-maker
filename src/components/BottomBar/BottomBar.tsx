import * as S from "./styles";
import { FaPlay } from "react-icons/fa";
import CircleButton from "../atoms/CircleButton";
import { IoPlay, IoStop } from "react-icons/io5";
import { light } from "../../constants/color";

export default function BottomBar() {
  return (
    <S.BottomBarBlock>
      <S.BottomBarContainer>
        <CircleButton size="large">
          <IoPlay fill="white" size={30} style={{ marginLeft: 2 }} />
        </CircleButton>
        <CircleButton background={light} style={{ marginLeft: 15 }}>
          <IoStop size={20} />
        </CircleButton>
        <FaPlay fill="white" size={20} />
      </S.BottomBarContainer>
    </S.BottomBarBlock>
  );
}
