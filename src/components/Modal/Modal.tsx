import ModalPortal from "../../ModalPortal";
import * as S from "./styles";
import { IoClose } from "react-icons/io5";

interface IModal {
  children: React.ReactNode;
  title?: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ children, title, setModal }: IModal) {
  return (
    <ModalPortal>
      <S.DarkBackground>
        <S.ModalBlock>
          <S.Header>
            {title && <h3>{title}</h3>}
            <IoClose onClick={() => setModal(false)} />
          </S.Header>

          {children}
        </S.ModalBlock>
      </S.DarkBackground>
    </ModalPortal>
  );
}
