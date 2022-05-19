import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { primary } from "../../constants/color";

interface Props extends ButtonStyleProps {
  children: ReactNode;
}

export default function CircleButton({
  children,
  background = primary,
  size = "medium",
}: Props) {
  return (
    <ButtonContainer background={background} size={size}>
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
      width: 40px;
      height: 40px;
    `}

  ${(props) =>
    props.size === "medium" &&
    css`
      width: 30px;
      height: 30px;
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
  background: ${(props) => props.background};

  ${sizeStyle}
`;
