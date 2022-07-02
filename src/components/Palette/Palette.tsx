import { useState } from "react";
import * as S from "./styles";

import Modal from "../Modal";

export default function Palette() {
  const [modal, setModal] = useState(false);

  return (
    <S.Block>
      <S.Header>
        <button onClick={() => setModal(true)}>악기 추가</button>
      </S.Header>
      <S.Layer></S.Layer>
      <S.Layer></S.Layer>
      <S.Layer></S.Layer>
      {modal && (
        <Modal title="악기 추가" setModal={setModal}>
          모달
        </Modal>
      )}
    </S.Block>
  );
}
