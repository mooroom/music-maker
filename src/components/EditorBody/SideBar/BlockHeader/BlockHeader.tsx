import { LayerType } from "../../../../store/layers/types";
import * as S from "./styles";

export interface IBlockHeader {
  layer: LayerType;
  isSelected: boolean;
  onSelect: () => void;
}

export default function BlockHeader({
  layer,
  isSelected,
  onSelect,
}: IBlockHeader) {
  return (
    <S.BlockHeaderContainer isSelected={isSelected} onClick={onSelect}>
      {layer.id}
    </S.BlockHeaderContainer>
  );
}
