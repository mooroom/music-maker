import { useDispatch, useSelector } from "react-redux";
import { primary_light } from "../../../constants/color";
import { RootState } from "../../../store";
import Button from "../../atoms/Button";
import * as S from "./styles";
import Modal from "../../Modal";
import AddTrackModal from "./AddTrackModal";
import { useState } from "react";
import BlockHeader from "./BlockHeader";

export default function SideBar() {
  const { layers } = useSelector((state: RootState) => state);

  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <S.SiderBarContainer>
      <S.SiderBarHeader>
        <Button
          onClick={() => setModal(true)}
          color="primary_light"
          size="small"
          rounded
        >
          악기추가
        </Button>
      </S.SiderBarHeader>
      <S.BlockHeaders>
        {layers.layers.map((layer) => (
          <BlockHeader
            key={layer.id}
            layer={layer}
            isSelected={layer.id === selected}
            onSelect={() => setSelected(layer.id)}
          />
        ))}
      </S.BlockHeaders>
      {modal && (
        <Modal title="악기추가" setModal={setModal}>
          <AddTrackModal />
        </Modal>
      )}
    </S.SiderBarContainer>
  );
}
