import { useCallback, useEffect, useRef, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export function useDebounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number,
) {
  let timer = 0;
  return (...args: Args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export function useThrottle<Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number,
) {
  const lastCall = useRef(0);

  const throttle = useCallback(
    (...args: Args) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        func(...args);
      }
    },
    [func, delay],
  );

  return throttle;
}

export function useWindowSize(): WindowSize {
  const [WindowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const throttle = useThrottle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 1000);

  useEffect(() => {
    addEventListener("resize", throttle);

    return () => window.removeEventListener("resize", throttle);
  }, [throttle]);

  return WindowSize;
}
