// =============================================================================
// 📏 ReadingGuide — Horizontal line following the cursor
// =============================================================================

import React, { useState, useEffect } from "react";

interface ReadingGuideProps {
  zIndex?: number;
}

export const ReadingGuide: React.FC<ReadingGuideProps> = ({
  zIndex = 9998,
}) => {
  const [y, setY] = useState(0);
  const [isTouch, setIsTouch] = useState(true); // default true to avoid flash on SSR

  useEffect(() => {
    setIsTouch(!window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const handleMove = (e: MouseEvent) => setY(e.clientY);
    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      className="ga11y-reading-guide"
      style={{ top: y - 20, zIndex }}
      aria-hidden="true"
    />
  );
};
