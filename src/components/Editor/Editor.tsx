import * as S from "./styles";

import EditorHeader from "../EditorHeader";
import EditorBody from "../EditorBody";
import EditorPanel from "../EditorPanel";

export default function Editor() {
  return (
    <S.EditorContainer>
      <EditorHeader />
      <EditorBody />
      <EditorPanel />
    </S.EditorContainer>
  );
}
