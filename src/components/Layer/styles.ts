import styled from "styled-components";

export const LayerBlock = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: rgb(102, 102, 102);
  margin-bottom: 50px;
`;

export const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OverviewBlock = styled.div``;

export const EditorBlock = styled.svg``;

export const LaneContainer = styled.svg``;

export const GridContainer = styled.svg``;

export const LabelContainer = styled.svg``;

export const MouseObserverBlock = styled.div`
  position: absolute;
  cursor: pointer;
  left: 60px;
  width: calc(100% - 60px);
  height: 452px;
  bottom: 0;
`;

export const MouseObserver = styled.div`
  width: 100%;
  height: 100%;
`;
