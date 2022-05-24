import * as S from "./styles";
import { IoTrash } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { removeLayer } from "../../store/layers";

interface Props {
  id: number;
}

export default function Header({ id }: Props) {
  const dispatch = useDispatch();

  return (
    <S.LayerHeader>
      <S.LayerTitle>레이어 {id}</S.LayerTitle>
      <S.LayerOptionContainer>
        <S.RemoveButton onClick={() => dispatch(removeLayer(id))}>
          <IoTrash />
        </S.RemoveButton>
      </S.LayerOptionContainer>
    </S.LayerHeader>
  );
}
