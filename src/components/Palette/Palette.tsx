import { useState, useRef } from "react";
import * as S from "./styles";

import { RootState } from "../../store";
import { useSelector } from "react-redux";

export default function Palette() {
  const { layers } = useSelector((state: RootState) => state);

  return (
    <S.Block>
      <S.TrackList>
        {layers.layers.map((layer) => (
          <S.Layer key={layer.id}>{layer.id}</S.Layer>
        ))}
      </S.TrackList>
      <S.TrackLanes></S.TrackLanes>
    </S.Block>
  );
}
