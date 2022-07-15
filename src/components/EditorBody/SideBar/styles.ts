import styled from "styled-components/macro";
import {
  editor_bg,
  editor_ruler_bg,
  editor_stroke,
} from "../../../constants/color";

export const SiderBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
`;

export const SiderBarHeader = styled.div`
  display: flex;
  min-height: 40px;
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
