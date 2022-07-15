import styled from "styled-components/macro";
import { editor_stroke } from "../../constants/color";

export const PanelContainer = styled.div`
  display: flex;
  flex-basis: 200px;
  flex-shrink: 0;
  min-height: 300px;
  position: relative;
  background-color: white;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 80px;
`;

export const PanelHeader = styled.div`
  display: flex;
  flex: 0 0 280px;
  flex-direction: column;
  border-right: 1px solid ${editor_stroke};
`;

export const TrackNameHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SettingsHeader = styled.div``;

export const PanelTrack = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
`;
