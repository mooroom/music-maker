import * as S from "./styles";
import { FaPlay } from "react-icons/fa";
import CircleButton from "../atoms/CircleButton";
import {
  light,
  primary,
  primary_dark,
  primary_light,
} from "../../constants/color";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Range, getTrackBackground } from "react-range";
import { setBpm } from "../../store/settings";
import { SettingsState } from "../../store/settings/types";
import { LayerType } from "../../store/layers/types";

import { IoPlay, IoStop, IoPause, IoAddCircle, IoAdd } from "react-icons/io5";
import { FaDrum, FaMusic } from "react-icons/fa";
import { GRID_COLOR } from "../../constants/grid";

interface Props {
  onPlay: () => void;
  onStop: () => void;
  onAddLayer: (type: LayerType["type"]) => void;
}

export default function BottomBar({ onPlay, onStop, onAddLayer }: Props) {
  const { controls, settings } = useSelector((state: RootState) => state);

  const PlayIconProps = {
    fill: "white",
    size: 30,
  };

  return (
    <S.BottomBarBlock>
      <S.BottomBarContainer>
        <S.LeftWrapper>
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
        </S.LeftWrapper>
        <S.CenterWrapper>
          <p style={{ fontWeight: "bold", color: primary_light }}>빠르기</p>
          <div style={{ width: 200, marginLeft: 20 }}>
            <BpmRange settings={settings} />
          </div>
        </S.CenterWrapper>
        <S.RightWrapper>
          <S.LayerAddContainer>
            <IoAdd size={15} />
            <CircleButton
              onClick={() => onAddLayer("melody")}
              background={GRID_COLOR["melody"].label}
              style={{ marginLeft: 10 }}
            >
              <FaMusic size={20} />
            </CircleButton>
            <CircleButton
              onClick={() => onAddLayer("beat")}
              background={GRID_COLOR["beat"].label}
              style={{ marginLeft: 10 }}
            >
              <FaDrum size={20} />
            </CircleButton>
          </S.LayerAddContainer>
        </S.RightWrapper>
      </S.BottomBarContainer>
    </S.BottomBarBlock>
  );
}

interface RangeProps {
  settings: SettingsState;
}

const BpmRange = ({ settings }: RangeProps) => {
  const dispatch = useDispatch();

  return (
    <Range
      values={[settings.bpm]}
      step={1}
      min={80}
      max={200}
      onChange={(values) => dispatch(setBpm([...values]))}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: "36px",
            display: "flex",
            width: "100%",
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "5px",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values: [settings.bpm],
                colors: [primary, "#ccc"],
                min: 80,
                max: 200,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "42px",
            width: "42px",
            borderRadius: "4px",
            backgroundColor: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 2px 6px #AAA",
          }}
        >
          <div
            style={{
              height: "16px",
              width: "5px",
              backgroundColor: isDragged ? primary : "#CCC",
            }}
          />
        </div>
      )}
    />
  );
};
