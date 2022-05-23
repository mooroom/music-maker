import * as S from "./styles";
import { FaPlay } from "react-icons/fa";
import CircleButton from "../atoms/CircleButton";
import { IoPlay, IoStop, IoPause, IoAddCircle } from "react-icons/io5";
import { light } from "../../constants/color";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Props {
  onPlay: () => void;
  onStop: () => void;
  onAddLayer: () => void;
}

export default function BottomBar({ onPlay, onStop, onAddLayer }: Props) {
  const { controls } = useSelector((state: RootState) => state);

  const PlayIconProps = {
    fill: "white",
    size: 30,
  };

  return (
    <S.BottomBarBlock>
      <S.BottomBarContainer>
        <CircleButton size="large" onClick={onPlay}>
          {!controls.playing ? (
            <IoPlay {...PlayIconProps} style={{ marginLeft: 2 }} />
          ) : (
            <IoPause {...PlayIconProps} />
          )}
        </CircleButton>
        <CircleButton
          onClick={onStop}
          background={light}
          style={{ marginLeft: 15 }}
        >
          <IoStop size={20} />
        </CircleButton>
        <CircleButton
          onClick={onAddLayer}
          background={light}
          style={{ marginLeft: 15 }}
        >
          <IoAddCircle size={20} />
        </CircleButton>
        <FaPlay fill="white" size={20} />
      </S.BottomBarContainer>
    </S.BottomBarBlock>
  );
}
