import React from "react";
import { Panel } from "../Panel";
import { Path } from "../Path/Path";

type Props = {
  paths: Path[];
  initialExpanded?: boolean;
};

export const PathsPanel: React.FC<Props> = ({ paths, initialExpanded }) => (
  <Panel className='!p-4'>
    {paths.map((path, i) => (
      <Path initialExpanded={initialExpanded} key={i} {...path} />
    ))}
  </Panel>
);
