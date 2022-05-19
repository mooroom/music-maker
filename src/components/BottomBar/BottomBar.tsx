import * as S from "./styles";
import { FaPlay } from "react-icons/fa";
import CircleButton from "../atoms/CircleButton";
import { IoPlay } from "react-icons/io5";

export default function BottomBar() {
  return (
    <S.BottomBarBlock>
      <S.BottomBarContainer>
        <CircleButton size="large">
          <IoPlay fill="white" size={20} />
        </CircleButton>
        <FaPlay fill="white" size={20} />
      </S.BottomBarContainer>
    </S.BottomBarBlock>
  );
}
