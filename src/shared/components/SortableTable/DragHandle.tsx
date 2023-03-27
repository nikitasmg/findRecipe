import React from "react";

type Props = {
  style?: React.CSSProperties;
  disabled?: boolean;
};

export const DragHandle: React.FC<Props> = ({ style, disabled }) => (
  <span style={{ ...style, ...{ cursor: disabled ? "!default" : "move", userSelect: "none" } }}>
    {" "}
    {"::::"}{" "}
  </span>
);
