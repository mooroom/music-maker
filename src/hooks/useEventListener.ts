import { useEffect, useRef } from "react";

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void
): void {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener: typeof handler = (event) =>
      savedHandler.current(event);
    window.addEventListener(eventName, eventListener);

    return () => window.removeEventListener(eventName, eventListener);
  }, [eventName]);
}

export default useEventListener;
