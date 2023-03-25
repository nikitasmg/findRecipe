import React, { CSSProperties } from "react";
import { ConnectDragSource, useDrag } from "react-dnd";

type Props = {
  item: unknown;
  render: (options: {
    drag: ConnectDragSource;
    style: CSSProperties;
    isDragging: boolean;
  }) => JSX.Element;
  type?: string;
};

export const DragSourceWrapper: React.FC<Props> = ({ render, item, type = "box" }) => {
  const [{ opacity, isDragging }, drag] = useDrag(
    () => ({
      type,
      item,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
        isDragging: monitor.isDragging()
      })
    }),
    [type, item]
  );

  return render({ drag, isDragging, style: { opacity } });
};
