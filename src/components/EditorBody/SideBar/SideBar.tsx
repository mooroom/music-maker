import Button from "../../atoms/Button";
import * as S from "./styles";

export default function SideBar() {
  return (
    <S.SiderBarContainer>
      <S.SiderBarHeader>
        <Button onClick={() => {}} size="small">
          악기추가
        </Button>
      </S.SiderBarHeader>
      <S.BlockHeaders></S.BlockHeaders>
    </S.SiderBarContainer>
  );
}
