import Add from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton } from "@mui/material";
import React, { useCallback, useRef, useState, MouseEventHandler } from "react";
import QuickPinchZoom, { make3dTransformValue, UpdateAction } from "react-quick-pinch-zoom";
import { MapSVG } from "../MapSVG";

type Props = {
  onSelect?: (id: string) => void;
};

export const InteractiveMap: React.FC<Props> = ({ onSelect }) => {
  const [zoom, setZoom] = useState<UpdateAction>({ x: 0, y: 0, scale: 1 });

  const imgRef = useRef<HTMLDivElement>(null);

  const zoomRef = useRef<QuickPinchZoom>(null);

  const onUpdate = useCallback(({ x, y, scale }: UpdateAction) => {
    const { current: img } = imgRef;

    setZoom({ x, y, scale });

    if (img) {
      const value = make3dTransformValue({ x, y, scale });

      img.style.setProperty("transform", value);
    }
  }, []);

  const maxScale = 2.5;

  const zoomIn = () => {
    zoomRef.current?.scaleTo({
      ...zoom,
      scale: Math.min((zoom?.scale ?? 1) + 0.5, maxScale)
    });
  };

  const zoomOut = () => {
    zoomRef.current?.scaleTo({
      ...zoom,
      scale: Math.min((zoom?.scale ?? 1) - 0.5, maxScale)
    });
  };

  const handleClick: MouseEventHandler<SVGSVGElement> = (e) => {
    const parent = (e.target as Element).parentNode;

    const id = (parent as HTMLButtonElement)?.getAttribute("id");

    if (!id) {
      return;
    }

    onSelect?.(id);
  };

  return (
    <Box className='relative h-fit'>
      <QuickPinchZoom
        ref={zoomRef}
        onUpdate={onUpdate}
        wheelScaleFactor={500}
        tapZoomFactor={0.5}
        maxZoom={maxScale}
        inertia={true}
        inertiaFriction={0.96}
      >
        <div ref={imgRef}>
          <MapSVG onClick={handleClick} />
        </div>
      </QuickPinchZoom>

      <Box className='absolute bottom-0 right-0 flex flex-col p-4'>
        <IconButton onClick={zoomIn}>
          <Add />
        </IconButton>

        <IconButton onClick={zoomOut}>
          <RemoveIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
