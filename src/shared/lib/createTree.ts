class Node<T> {
  data?: T;
  left: T | null;
  right: T | null;

  constructor(x?: T) {
    this.data = x;
    this.left = null;
    this.right = null;
  }
}

export const createTree = <T>(parent: number[], n: number) => {
  const ref = [];

  let root = new Node<T>();

  for (let i = 0; i < n; i++) {
    const temp = new Node(i);
    ref.push(temp);
  }

  for (let i = 0; i < n; i++) {
    if (parent[i] == -1) {
      root = ref[i] as Node<T>;
      continue;
    }

    if (ref[parent[i]].left == null) {
      ref[parent[i]].left = ref[i] as unknown as number;
    } else {
      ref[parent[i]].right = ref[i] as unknown as number;
    }
  }
  return root;
};
