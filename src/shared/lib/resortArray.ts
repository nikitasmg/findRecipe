import { arrayMove } from "react-sortable-hoc";

const updateRowSortByIndex = <Row = { sort: number }>(rows: Row, index: number): Row => ({
  ...rows,
  sort: index + 1
});

export const resortArray = <Row = { sort: number }>(
  oldIndex: number,
  newIndex: number,
  rows: Row[]
): Row[] => {
  return arrayMove(rows, oldIndex, newIndex).map(updateRowSortByIndex);
};
