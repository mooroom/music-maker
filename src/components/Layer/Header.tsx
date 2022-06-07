import * as S from "./styles";
import { IoTrash } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { removeLayer } from "../../store/layers";
import { LayerTypeName } from "../../store/layers/types";

interface Props {
  id: number;
  layerType: LayerTypeName;
}

export default function Header({ id, layerType }: Props) {
  const dispatch = useDispatch();

  const getLayerTypeName = (type: LayerTypeName) => {
    switch (type) {
      case "melody":
        return "멜로디";
      case "chord":
        return "화음";
      case "beat":
        return "비트";
    }
  };

  return (
    <S.LayerHeader>
      <S.LayerHeaderLeft>
        <S.LayerTitle>레이어 {id}</S.LayerTitle>
        <S.LayerLabel layerType={layerType}>
          {getLayerTypeName(layerType)}
        </S.LayerLabel>
      </S.LayerHeaderLeft>

      <S.LayerOptionContainer>
        <S.RemoveButton onClick={() => dispatch(removeLayer(id))}>
          <IoTrash />
        </S.RemoveButton>
      </S.LayerOptionContainer>
    </S.LayerHeader>
  );
}
