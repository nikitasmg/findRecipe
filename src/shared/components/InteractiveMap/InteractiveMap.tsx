import { Box, IconButton } from "@mui/material";
import React, { MouseEventHandler } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MapSVG } from "../MapSVG";
import { Add } from "@mui/icons-material";

type Props = {
  onSelect?: (id: string) => void;
};

export const InteractiveMap: React.FC<Props> = ({ onSelect }) => {
  const handleClick: MouseEventHandler<SVGSVGElement> = (e) => {
    const parent = (e.target as Element).parentNode;

    const id = (parent as HTMLButtonElement)?.getAttribute("id");

    if (!id) {
      return;
    }

    onSelect?.(id);
  };

  return (
    <Box className='relative w-full'>
      <div>
        <TransformWrapper
          maxScale={2.5}
          centerZoomedOut
          centerOnInit
          disablePadding
          doubleClick={{ step: 0.7 }}
          pinch={{ step: 5 }}
          wheel={{ disabled: true }}
        >
          {({ zoomIn, zoomOut }) => (
            <div className='w-full'>
              <TransformComponent contentStyle={{ width: "100%" }} wrapperStyle={{ width: "100%" }}>
                <MapSVG onClick={handleClick} />
              </TransformComponent>
              <Box className='absolute bottom-0 right-0 flex flex-col p-4'>
                <IconButton onClick={() => zoomIn()}>
                  <Add />
                </IconButton>

                <IconButton onClick={() => zoomOut()}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            </div>
          )}
        </TransformWrapper>
      </div>
    </Box>
  );
};
