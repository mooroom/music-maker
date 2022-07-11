import { primary_light } from "../../../constants/color";
import Button from "../../atoms/Button";
import * as S from "./styles";

export default function SideBar() {
  return (
    <S.SiderBarContainer>
      <S.SiderBarHeader>
        <Button onClick={() => {}} color="primary_light" size="small" rounded>
          악기추가
        </Button>
      </S.SiderBarHeader>
      <S.BlockHeaders></S.BlockHeaders>
    </S.SiderBarContainer>
  );
}
