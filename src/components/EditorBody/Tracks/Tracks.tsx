import Ruler from "../Ruler";
import * as S from "./styles";

export default function Tracks() {
  return (
    <S.TracksContainer>
      <Ruler />
      <S.BlockTracks></S.BlockTracks>
    </S.TracksContainer>
  );
}
