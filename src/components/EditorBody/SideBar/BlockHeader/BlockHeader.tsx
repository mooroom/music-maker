import { LayerType } from "../../../../store/layers/types";
import * as S from "./styles";
import { FaDrum, FaItunesNote } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Button from "../../../atoms/Button";

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
      <S.BorderLeft isSelected={isSelected} />
      <S.Wrapper>
        <S.Col1>
          <S.InstButton isSelected={isSelected}>
            <FaItunesNote size={20} />
          </S.InstButton>
        </S.Col1>
        <S.Col2>
          <S.NameRow>
            <span>악기 {layer.id + 1}</span>
            <BsThreeDots />
          </S.NameRow>
        </S.Col2>
      </S.Wrapper>
    </S.BlockHeaderContainer>
  );
}
