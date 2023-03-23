import React, { useCallback, useRef } from "react";
import QuickPinchZoom, { make3dTransformValue, UpdateAction } from "react-quick-pinch-zoom";
import { MapSVG } from "../MapSVG";

type Props = {
  onSelect?: (id: number) => void;
};

export const InteractiveMap: React.FC<Props> = () => {
  const imgRef = useRef<HTMLDivElement>(null);

  const onUpdate = useCallback(({ x, y, scale }: UpdateAction) => {
    const { current: img } = imgRef;

    if (img) {
      const value = make3dTransformValue({ x, y, scale });

      img.style.setProperty("transform", value);
    }
  }, []);

  return (
    <QuickPinchZoom onUpdate={onUpdate} wheelScaleFactor={500} maxZoom={2.5}>
      <div ref={imgRef}>
        <MapSVG />
      </div>
    </QuickPinchZoom>
  );
};
