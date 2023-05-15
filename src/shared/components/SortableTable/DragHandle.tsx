import React from "react";

type Props = {
  style?: React.CSSProperties;
  disabled?: boolean;
  hidden?: boolean;
};

export const DragHandle: React.FC<Props> = ({ style, disabled, hidden }) => (
  <span
    style={{ ...style, ...{ cursor: disabled ? "!default" : "move", userSelect: "none" } }}
    className={`${hidden ? "invisible" : ""}`}
  >
    {" "}
    {"::::"}{" "}
  </span>
);
