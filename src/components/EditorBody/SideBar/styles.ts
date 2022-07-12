import styled from "styled-components/macro";
import {
  editor_bg,
  editor_ruler_bg,
  editor_stroke,
} from "../../../constants/color";

export const SiderBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 281px;
`;

export const SiderBarHeader = styled.div`
  display: flex;
  height: 40px;
  padding: 0px 10px;
  align-items: center;
  border-bottom: 1px solid ${editor_stroke};
`;

export const BlockHeaders = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-right: 1px solid ${editor_stroke};
`;

export const BlockHeader = styled.div`
  display: flex;
  min-height: 80px;
  position: relative;
  border-bottom: 1px solid ${editor_stroke};
  background-color: ${editor_bg};
`;
