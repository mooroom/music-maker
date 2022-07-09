import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  will-change: scroll-position;
`;

export const Ruler = styled.div`
  width: 36000px;
`;

export const BlockTracks = styled.div`
  position: relative;
  overflow: hidden;
  will-change: scroll-position;
  width: 36000px;
`;
