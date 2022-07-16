import styled from "styled-components/macro";
import {
  editor_bg,
  editor_ruler_bg,
  editor_ruler_text,
  editor_stroke,
  primary,
} from "../../../constants/color";
import { z_playHead } from "../../../constants/zIndex";

export const RulerContainer = styled.div`
  width: 36000px;
  background-color: ${editor_ruler_bg};
`;

export const RulerWrapper = styled.div`
  border-bottom: 1px solid black;
  min-height: 40px;
  border-bottom: 1px solid ${editor_stroke};
  min-width: calc(100vw - 281px);
  position: relative;
  width: 36000px;
`;

export const RulerGraduation = styled.div`
  color: ${editor_ruler_text};
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

export const RulerCursorContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 20px;
  cursor: default;
`;

export const PlayHead = styled.span`
  cursor: col-resize;
  display: inline-block;
  width: 15px;
  height: 1200px;
  position: absolute;
  left: 20px;
  top: 20px;
  will-change: transform;
  z-index: ${z_playHead};

  svg {
    position: absolute;
    top: -6px;
    left: calc(50% - 3px);
    width: 6px;
    height: 6px;
    fill: ${primary};
  }

  &:after {
    background-color: ${primary};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0, 1);
    content: "";
    display: inline-block;
    height: 100%;
    margin-left: 7px;
    margin-top: -1px;
    width: 1px;
  }
`;
