import * as S from "./styles";
import SideBar from "./SideBar";
import Tracks from "./Tracks";

export default function EditorBody() {
  return (
    <S.EditorBodyContainer>
      <SideBar />
      <Tracks />
    </S.EditorBodyContainer>
  );
}
