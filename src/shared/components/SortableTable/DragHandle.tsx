import React from "react";
import { SortableHandle } from "react-sortable-hoc";

export const DragHandle = SortableHandle<{ disabled?: boolean }>(
  ({ style, disabled }: { style: React.CSSProperties; disabled: boolean }) => (
    <span style={{ ...style, ...{ cursor: disabled ? "default" : "move", userSelect: "none" } }}>
      {" "}
      {"::::"}{" "}
    </span>
  )
);
