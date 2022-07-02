import { useState, useRef } from "react";
import * as S from "./styles";

import Modal from "../Modal";
import Button from "../atoms/Button";

import { LayerType } from "../../store/layers/types";
import {
  COLS,
  NOTE_NAMES,
  NOTE_COUNT,
  LABEL_WIDTH,
} from "../../constants/grid";
import { createInstSeq } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { addLayer } from "../../store/layers";

import { IoAdd } from "react-icons/io5";
import CircleButton from "../atoms/CircleButton";
import { BsBullseye } from "react-icons/bs";
import { GRID_COLOR } from "../../constants/grid";
import { FaDrum, FaItunesNote } from "react-icons/fa";

export default function Header() {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

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
    <S.HeaderBlock>
      <button onClick={() => setModal(true)}>악기 추가</button>
      {modal && (
        <Modal title="악기 추가" setModal={setModal}>
          <S.LayerAddContainer>
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
          </S.LayerAddContainer>
        </Modal>
      )}
    </S.HeaderBlock>
  );
}
