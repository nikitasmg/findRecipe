import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

type Props<T = HTMLElement> = {
  id: string | number;
  render: (props: {
    style: {
      transform: string | undefined;
      transition: string | undefined;
    };
    attributes: DraggableAttributes;
    listeners?: SyntheticListenerMap;
    ref?: React.Ref<T>;
  }) => JSX.Element;
};

export const ItemSortable = <T extends HTMLElement>({
  render,
  id
}: Props<T>): React.ReactElement => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return render({ style, attributes, listeners, ref: setNodeRef });
};
