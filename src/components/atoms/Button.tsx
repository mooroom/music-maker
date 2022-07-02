import React from "react";
import styled, { css } from "styled-components";
import { darken, lighten } from "polished";
import { ColorKeys } from "../../constants/color";

type SizeKeys = "small" | "medium" | "large";

const colorStyles = css<IButton>`
  ${({ theme, color }) => {
    const selected = theme.palette[color as ColorKeys];
    return css<IButton>`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      ${(props) =>
        props.outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
          &:hover {
            background: ${selected};
            color: white;
          }
        `}
    `;
  }}
`;

const sizes = {
  large: {
    height: "3rem",
    fontSize: "1.25rem",
  },
  medium: {
    height: "2.25rem",
    fontSize: "1rem",
  },
  small: {
    height: "1.75rem",
    fontSize: "0.875rem",
  },
};

const sizeStyles = css<IButton>`
  ${({ size }) => css`
    height: ${sizes[size as SizeKeys].height};
    font-size: ${sizes[size as SizeKeys].fontSize};
  `}
`;

const fullWidthStyle = css<IButton>`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      justify-content: center;
      & + & {
        margin-left: 0;
        margin-top: 1rem;
      }
    `}
`;

const StyledButton = styled.button<IButton>`
  /* 공통 스타일 */
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  ${sizeStyles}

  /* 색상 */
  ${colorStyles}

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }

  ${fullWidthStyle}
`;

interface IButton {
  children: React.ReactNode;
  color?: ColorKeys;
  size?: SizeKeys;
  outline?: boolean;
  fullWidth?: boolean;
  onClick: () => void;
}

function Button({
  children,
  color,
  size,
  outline,
  fullWidth,
  onClick,
}: IButton) {
  return (
    <StyledButton
      color={color}
      size={size}
      outline={outline}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  color: "blue",
  size: "medium",
};

export default Button;
