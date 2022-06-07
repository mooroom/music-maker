import styled from "styled-components";
import { GRID_COLOR } from "../../constants/grid";
import { LayerTypeName } from "../../store/layers/types";

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

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

export const LayerHeader = styled(FlexWrapper)`
  width: 100%;
  justify-content: space-between;
  padding: 20px 10px;
`;

export const LayerHeaderLeft = styled(FlexWrapper)``;

export const LayerTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-right: 15px;
`;

export const LayerLabel = styled.div<{ layerType: LayerTypeName }>`
  padding: 5px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => GRID_COLOR[props.layerType].label};
  background: white;
`;

export const LayerOptionContainer = styled.div``;

export const OverviewBlock = styled.div``;

export const EditorBlock = styled.svg<{ layerType: LayerTypeName }>`
  background: ${(props) => GRID_COLOR[props.layerType].background};
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
