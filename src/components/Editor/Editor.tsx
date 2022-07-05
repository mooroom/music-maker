import * as S from "./styles";

import EditorHeader from "../EditorHeader";
import EditorBody from "../EditorBody";

export default function Editor() {
  return (
    <S.EditorContainer>
      <EditorHeader />
      <EditorBody />
    </S.EditorContainer>
  );
}
