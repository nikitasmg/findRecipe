import React from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { clsx } from "clsx";
import { Box } from "@mui/material";
import { ItemName } from "../ItemName";
import { CustomData } from "../../types";
import styles from "./CustomNode.module.scss";

type Props = {
  node: NodeModel<CustomData>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
};

export const CustomNode: React.FC<Props> = ({ node, depth, onToggle, isOpen }) => {
  const indent = depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(node.id);
  };

  return (
    <div className={clsx("tree-node", styles.root)} style={{ paddingInlineStart: indent }}>
      <div
        className={clsx(styles.expandIconWrapper, {
          [styles.isOpen]: isOpen
        })}
      >
        {!!node.data?.children?.length && (
          <button onClick={handleToggle}>
            <ArrowRightIcon />
          </button>
        )}
      </div>

      <Box className='flex items-center gap-6'>
        <div className='text-lg cursor-move'>:::</div>
        <ItemName id={node.data?.sort as number} name={node.text} slug={node.data?.slug ?? ""} />
      </Box>
    </div>
  );
};
