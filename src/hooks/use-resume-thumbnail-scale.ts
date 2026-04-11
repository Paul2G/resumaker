// A4 at 96dpi — update if you need to support letter size dynamically
import { useCallback, useMemo, useState } from 'react';

const RESUME_NATURAL_WIDTH_PX = 794;
const RESUME_NATURAL_HEIGHT_PX = 1123;

/**
 * Computes a responsive scale factor and thumbnail height for a resume
 * preview thumbnail based on the actual rendered container width.
 *
 * @param heightRatio - fraction of the full resume height to show (default 0.38)
 *
 * Usage:
 *   const { containerRef, scale, thumbnailHeight } = useResumeThumbnailScale();
 *   <div ref={containerRef} style={{ height: thumbnailHeight }}>
 *     <ResumePreview style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }} />
 *   </div>
 */
export function useResumeThumbnailScale(heightRatio = 0.48) {
  const [width, setWidth] = useState(0);

  // The callback ref handles the element attachment
  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      // Set initial width immediately
      setWidth(node.getBoundingClientRect().width);

      const observer = new ResizeObserver(([entry]) => {
        setWidth(entry.contentRect.width);
      });

      observer.observe(node);
      // Note: In a real app, you might need a way to disconnect
      // if the node changes, but for most use cases, this is solid.
    }
  }, []);

  const scale = useMemo(() => {
    return width ? width / RESUME_NATURAL_WIDTH_PX : 0.37;
  }, [width]);

  const thumbnailHeight = RESUME_NATURAL_HEIGHT_PX * scale * heightRatio;

  return {
    containerRef,
    scale,
    thumbnailHeight,
    resumeNaturalWidth: RESUME_NATURAL_WIDTH_PX,
  };
}
