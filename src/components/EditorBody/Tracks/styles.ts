import styled from "styled-components/macro";
import {
  editor_bg,
  primary_dark,
  track_height,
} from "../../../constants/color";

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
`;

export const BlockTrack = styled.div<{ selected: boolean }>`
  width: 100%;
  height: ${track_height}px;
  position: relative;
  border-bottom: 1px solid ${editor_bg};
  background-color: ${(props) =>
    props.selected ? "rgba(0, 199, 153, 0.1)" : "rgba(100, 100, 100, 0.1)"};
`;

export const EditorGrid = styled.svg<{ tracksCount: number }>`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 100%;
  height: ${(props) => props.tracksCount * track_height}px;
`;
