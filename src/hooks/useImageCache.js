import { useCallback, useRef } from "react";

export const useImageCache = () => {
  const imageCache = useRef(new Map());
  const preloadImage = useCallback((src) => {
    if (!imageCache.current.has(src)) {
      const img = new Image();
      img.src = src;
      imageCache.current.set(src, img);
    }
    return imageCache.current.get(src);
  }, []);

  return { preloadImage };
};
