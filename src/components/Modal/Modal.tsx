import ModalPortal from "../../ModalPortal";
import * as S from "./styles";

interface IModal {
  children: React.ReactNode;
  title?: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ children, title, setModal }: IModal) {
  return (
    <ModalPortal>
      <S.DarkBackground onClick={() => setModal(false)}>
        <S.ModalBlock>
          {title && <h3>{title}</h3>}
          {children}
        </S.ModalBlock>
      </S.DarkBackground>
    </ModalPortal>
  );
}
