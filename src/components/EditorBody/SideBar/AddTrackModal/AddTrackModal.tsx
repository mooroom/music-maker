import { useRef, useState } from "react";
import { BsBullseye } from "react-icons/bs";
import { FaDrum, FaItunesNote } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { COLS, GRID_COLOR, NOTE_COUNT } from "../../../../constants/grid";
import { addLayer } from "../../../../store/layers";
import { LayerType } from "../../../../store/layers/types";
import { createInstSeq } from "../../../../utils";
import CircleButton from "../../../atoms/CircleButton";
import * as S from "./styles";

export default function AddTrackModal() {
  const dispatch = useDispatch();

  const LayerId = useRef(0);

  const handleAddLayer = (type: LayerType["type"]) => {
    const newLayer: LayerType = {
      id: LayerId.current++,
      type,
      sequence: Array.from({ length: NOTE_COUNT[type] }, () =>
        new Array(COLS).fill(0)
      ),
      instruments: createInstSeq(type),
    };
    dispatch(addLayer(newLayer));
  };

  return (
    <S.ModalContainer>
      <IoAdd size={15} />
      <CircleButton
        onClick={() => handleAddLayer("melody")}
        background="white"
        style={{ marginLeft: 10 }}
      >
        <FaItunesNote size={20} fill={GRID_COLOR["melody"].label} />
      </CircleButton>
      <CircleButton
        onClick={() => handleAddLayer("beat")}
        background="white"
        style={{ marginLeft: 10 }}
      >
        <FaDrum size={20} fill={GRID_COLOR["beat"].label} />
      </CircleButton>
      <CircleButton
        onClick={() => handleAddLayer("chord")}
        background="white"
        style={{ marginLeft: 10 }}
      >
        <BsBullseye size={20} fill={GRID_COLOR["chord"].label} />
      </CircleButton>
    </S.ModalContainer>
  );
}
