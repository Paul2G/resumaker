// A4 at 96dpi — update if you need to support letter size dynamically
import { useEffect, useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.37);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / RESUME_NATURAL_WIDTH_PX);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const thumbnailHeight = RESUME_NATURAL_HEIGHT_PX * scale * heightRatio;

  return {
    containerRef,
    scale,
    thumbnailHeight,
    resumeNaturalWidth: RESUME_NATURAL_WIDTH_PX,
  };
}
