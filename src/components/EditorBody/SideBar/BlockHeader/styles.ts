import styled, { css } from "styled-components/macro";
import {
  editor_bg,
  editor_stroke,
  primary,
  primary_dark,
  primary_light,
  primary_semi_dark,
} from "../../../../constants/color";

export const BlockHeaderContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  min-height: 80px;
  position: relative;
  border-bottom: 1px solid ${editor_stroke};
  background-color: ${(props) => (props.isSelected ? "white" : editor_bg)};
`;

export const BorderLeft = styled.div<{ isSelected: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  ${(props) =>
    props.isSelected &&
    css`
      background-color: ${primary};
    `}
`;

export const Wrapper = styled.div`
  display: flex;
  margin-left: 5px;
  flex-grow: 1;
`;

export const Col1 = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
`;

export const InstButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${editor_stroke};
  background-color: white;

  ${(props) =>
    props.isSelected &&
    css`
      border-color: ${primary_light};
      background-color: ${primary_light};
      color: ${primary};
    `}
`;

export const Col2 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding-right: 15px;
`;

export const NameRow = styled.div`
  padding-top: 12px;

  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const CtrlRow = styled.div`
  display: flex;
  padding-top: 12px;
`;
