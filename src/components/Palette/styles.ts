import styled from "styled-components";
import { light } from "../../constants/color";

export const Block = styled.div`
  position: absolute;
  left: 0;
  top: 120px;
  width: 100%;
  bottom: 0;
  background: #f5f5f5;
  border-right: 1px solid black;
  display: flex;
`;

export const TrackList = styled.div`
  width: 250px;
  height: 100%;
  background: blue;
`;

export const TrackLanes = styled.div`
  flex: 1;
  background: skyblue;
`;

export const Layer = styled.div`
  width: 100%;
  height: 85px;
  background-color: white;

  border: 1px solid #d2d2d2;

  & + & {
    border-top: none;
  }
`;
