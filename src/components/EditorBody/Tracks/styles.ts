import styled from "styled-components/macro";
import { primary_dark } from "../../../constants/color";

export const TracksContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  will-change: scroll-position;
`;

export const BlockTracks = styled.div`
  position: relative;
  overflow: hidden;
  will-change: scroll-position;
  width: 36000px;
  background-color: ${primary_dark};
`;
