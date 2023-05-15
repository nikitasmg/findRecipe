import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import {
  Tree,
  NodeModel,
  MultiBackend,
  getBackendOptions,
  DropOptions
} from "@minoru/react-dnd-treeview";
import { compose, prop } from "rambda";
import { usePagesTreeQuery, useUpdatePageParentMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { getEventValueHandler } from "~/shared/lib/events";
import { usePagesStore } from "~/shared/stores/pages";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { Panel } from "~shared/components/Panel";
import { TableActions } from "~/shared/components/TableActions";
import { CustomNode } from "./components/CustomNode";
import { CustomData } from "./types";

const handleDrop =
  (
    treeData: NodeModel<CustomData>[],
    setTreeData: React.Dispatch<React.SetStateAction<NodeModel<CustomData>[]>>,
    update: (values: { id: number; parent_id: number }) => void
  ) =>
  (newTree: NodeModel<CustomData>[], options: DropOptions<CustomData>) => {
    if (!options.dropTarget) {
      return;
    }

    const prevParent = treeData.find((item) => item.id === options.dragSource?.parent);

    if (prevParent?.data) {
      prevParent.data.children = prevParent.data.children?.filter(
        (item) => item.id === options.dragSource?.id
      );
    }

    if (!options.dropTarget?.data) {
      options.dropTarget.data = {};
    }

    if (!options.dragSource) {
      return;
    }

    options.dropTarget.data.children = [
      ...(options.dropTarget?.data?.children ?? []),
      { id: options.dragSource.id as number }
    ];

    update({ id: Number(options.dragSourceId), parent_id: Number(options.dropTargetId) });

    setTreeData(newTree);
  };

export const PagesTable: React.FC = () => {
  const [treeData, setTreeData] = useState<NodeModel<CustomData>[]>([]);

  const client = useGraphqlClient();

  const { mutateAsync: updateParent } = useUpdatePageParentMutation(client);

  const { variables, title, handleTitleChange, resetTitle } = useRequestState("name");

  const { setCount, setLoading } = usePagesStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const { data, isLoading } = usePagesTreeQuery(client, variables, { refetchOnMount: "always" });

  const pages = data?.pages;

  const total = pages?.length ?? 0;

  const onDrop = handleDrop(treeData, setTreeData, updateParent);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(total);
  }, [total, setCount]);

  useEffect(() => {
    setTreeData(
      pages?.map((page) => ({
        id: page.id,
        text: page.name,
        parent: Number(page.parent_id),
        droppable: true,
        data: {
          children: page.children?.map((item) => ({ id: Number(item?.id) })) ?? [],
          slug: page.slug,
          sort: page.sort
        }
      })) ?? []
    );
  }, [pages]);

  return (
    <Panel>
      <Box className='flex flex-col gap-6'>
        <TableActions
          searchProps={{
            searchValue: title,
            searchChange: getEventValueHandler(handleTitleChange),
            resetTitle
          }}
        />

        <Box className='flex flex-col gap-6 lg:flex-row'>
          {!isLoading && (
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
              <div className={"h-full"}>
                <Tree
                  tree={treeData}
                  rootId={0}
                  render={(node: NodeModel<CustomData>, { depth, isOpen, onToggle }) => (
                    <CustomNode node={node} depth={depth} isOpen={isOpen} onToggle={onToggle} />
                  )}
                  onDrop={onDrop}
                  classes={{
                    root: "h-full",
                    draggingSource: "opacity-30",
                    dropTarget: "bg-[#e8f0fe]"
                  }}
                  sort={(node) => node.data?.sort ?? 0}
                  insertDroppableFirst={false}
                  initialOpen={pages?.map(compose(Number, prop("id")))}
                />
              </div>
            </DndProvider>
          )}

          {isLoading && <Skeleton className='w-full' variant='rectangular' height={600} />}
        </Box>
      </Box>
    </Panel>
  );
};
