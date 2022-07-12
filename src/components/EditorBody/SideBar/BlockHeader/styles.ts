import styled from "styled-components/macro";
import { editor_bg, editor_stroke } from "../../../../constants/color";

export const BlockHeaderContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  min-height: 80px;
  position: relative;
  border-bottom: 1px solid ${editor_stroke};
  background-color: ${(props) => (props.isSelected ? "white" : editor_bg)};
`;
