import styled from "styled-components";

export const RemoveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666666;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

export const LayerBlock = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #eee;
  margin-bottom: 50px;

  &:hover {
    ${RemoveButton} {
      display: initial;
    }
  }
`;

export const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// Header
export const LayerHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
`;

export const LayerTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-right: 10px;
`;

export const LayerOptionContainer = styled.div``;

export const OverviewBlock = styled.div``;

export const EditorBlock = styled.svg`
  background: #056950;
`;

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
