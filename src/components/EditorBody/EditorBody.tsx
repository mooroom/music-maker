import * as S from "./styles";
import SideBar from "./SideBar";
import Tracks from "./Tracks";

export default function EditorBody() {
  return (
    <S.Container>
      <SideBar />
      <Tracks />
    </S.Container>
  );
}
