import * as S from "./styles";

export default function Tracks() {
  return (
    <S.Container>
      <S.Ruler>
        <div
          style={{ width: "100%", height: "30px", background: "green" }}
        ></div>
      </S.Ruler>
      <S.BlockTracks>
        <div
          style={{ width: "100%", height: "3000px", background: "black" }}
        ></div>
      </S.BlockTracks>
    </S.Container>
  );
}
