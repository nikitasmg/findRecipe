type Item = {
  id: number;
  parent_id?: number | null;
  [key: string]: unknown;
};

export const getTreeFromFlatData = <T extends Item[] = Item[]>({
  flatData,
  getKey = (node) => node.id,
  getParentKey = (node) => node.parent_id,
  rootKey = "0"
}: {
  flatData: T;
  getKey: (node: T[0]) => string | number;
  getParentKey: (node: T[0]) => string | number | undefined | null;
  rootKey?: string | null;
}) => {
  if (!flatData) {
    return [];
  }

  const childrenToParents: Record<string, T> = {};

  for (const child of flatData) {
    const parentKey = getParentKey(child);

    if ((parentKey as string) in childrenToParents) {
      childrenToParents[parentKey as string].push(child);
    } else {
      childrenToParents[parentKey as string] = [child] as T;
    }
  }

  if (!((rootKey as string) in childrenToParents)) {
    return [];
  }

  const trav = (parent: T[0]): T[0] => {
    const parentKey = getKey(parent);
    if (parentKey in childrenToParents) {
      return {
        ...parent,
        children: childrenToParents[parentKey].map((child) => trav(child))
      };
    }

    return { ...parent };
  };

  return childrenToParents[rootKey as string].map((child) => trav(child));
};
