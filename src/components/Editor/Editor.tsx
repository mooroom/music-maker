import * as S from "./styles";

import EditorHeader from "../EditorHeader";
import EditorBody from "../EditorBody";
import EditorPanel from "../EditorPanel";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Editor() {
  const { selectedLayer } = useSelector((state: RootState) => state.layers);

  return (
    <S.EditorContainer>
      <EditorHeader />
      <EditorBody />
      {selectedLayer && <EditorPanel />}
    </S.EditorContainer>
  );
}
