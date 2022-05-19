import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { primary } from "../../constants/color";

interface Props extends ButtonStyleProps {
  children: ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
}

export default function CircleButton({
  children,
  onClick,
  background = primary,
  size = "medium",
  style,
}: Props) {
  return (
    <ButtonContainer
      onClick={onClick}
      background={background}
      size={size}
      style={style}
    >
      {children}
    </ButtonContainer>
  );
}

interface ButtonStyleProps {
  background?: string;
  size?: "large" | "medium" | "small";
}

const sizeStyle = css<ButtonStyleProps>`
  ${(props) =>
    props.size === "large" &&
    css`
      width: 50px;
      height: 50px;
    `}

  ${(props) =>
    props.size === "medium" &&
    css`
      width: 40px;
      height: 40px;
    `}

    ${(props) =>
    props.size === "small" &&
    css`
      width: 20px;
      height: 20px;
    `}
`;

export const ButtonContainer = styled.button<ButtonStyleProps>`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${(props) => props.background};

  ${sizeStyle}
`;
