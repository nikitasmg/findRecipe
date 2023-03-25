import React from "react";
import { ConnectDropTarget, useDrop } from "react-dnd";

type Target = Record<string, unknown>;

type Props<T = Target> = {
  render: (options: { drop: ConnectDropTarget; isActive: boolean }) => JSX.Element;
  onDrop: (value: T) => void;
  accept?: string;
};

export const DragTargetWrapper = <T extends Target>({
  render,
  onDrop,
  accept = "box"
}: Props<T>): React.ReactElement => {
  const [{ isActive }, drop] = useDrop(
    () => ({
      accept,
      collect: (monitor) => ({
        isActive: monitor.canDrop() && monitor.isOver()
      }),
      drop: onDrop
    }),
    [accept]
  );

  return render({ drop, isActive });
};
