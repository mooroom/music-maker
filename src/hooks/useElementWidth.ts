import { useCallback, useEffect, useState } from "react";
import useEventListener from "./useEventListener";

type Width = number;

function useElementWidth<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  Width
] {
  const [ref, setRef] = useState<T | null>(null);
  const [width, setWidth] = useState<Width>(0);

  const handleWidth = useCallback(() => {
    setWidth(ref?.offsetWidth || 0);
  }, [ref?.offsetWidth]);

  useEventListener("resize", handleWidth);

  useEffect(() => {
    handleWidth();
  }, [ref?.offsetWidth]);

  return [setRef, width];
}

export default useElementWidth;
