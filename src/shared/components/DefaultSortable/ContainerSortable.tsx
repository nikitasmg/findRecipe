import React, { ReactNode } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy
} from "@dnd-kit/sortable";
import { compose, equals, prop } from "rambda";

type Item = {
  id: string | number;
  [key: string]: unknown;
};

type Props<T = Item> = {
  items: T[];
  children: ReactNode;
  onSortEnd: (indexes: { oldIndex: number; newIndex: number }) => void;
};

export const ContainerSortable = <T extends Item>({
  items,
  children,
  onSortEnd
}: Props<T>): React.ReactElement => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(compose(equals(active.id), prop("id")));
      const newIndex = items.findIndex(compose(equals(over?.id), prop("id")));

      onSortEnd({ oldIndex, newIndex });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSwappingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};
