import styled from "styled-components/macro";
import { primary_dark, primary_semi_dark } from "../../../constants/color";

export const RulerContainer = styled.div`
  width: 36000px;
  background-color: ${primary_semi_dark};
`;

export const RulerWrapper = styled.div`
  border-bottom: 1px solid black;
  margin-left: 12px;
  min-height: 40px;
  border-bottom: 1px solid ${primary_dark};
  min-width: calc(100vw - 293px);
  position: relative;
  width: 36000px;
`;

export const RulerGraduation = styled.div`
  color: ghostwhite;
  height: 20px;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;

  span {
    display: inline-block;
    font-size: 12px;
    line-height: 18px;
    position: absolute;
    text-indent: 4px;
    top: 0;
  }
`;

export const RulerGrid = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
`;
