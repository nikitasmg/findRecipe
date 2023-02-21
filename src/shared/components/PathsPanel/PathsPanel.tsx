import React from "react";
import { Panel } from "../Panel";
import { Path } from "../Path/Path";

type Props = {
  paths: Path[];
};

export const PathsPanel: React.FC<Props> = ({ paths }) => (
  <Panel>
    {paths.map((path, i) => (
      <Path key={i} {...path} />
    ))}
  </Panel>
);
