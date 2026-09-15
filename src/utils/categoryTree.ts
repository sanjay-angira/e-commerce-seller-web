export type FlatCategory = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
};

export type CategoryTreeNode = FlatCategory & {
  children: CategoryTreeNode[];
};

export function buildCategoryTree(
  categories: FlatCategory[]
): CategoryTreeNode[] {
  const ids = new Set(categories.map((c) => c.id));
  const nodes = new Map<number, CategoryTreeNode>();

  for (const category of categories) {
    nodes.set(category.id, {
      id: category.id,
      name: category.name,
      slug: category.slug,
      parentId: category.parentId ?? null,
      children: [],
    });
  }

  const roots: CategoryTreeNode[] = [];

  for (const category of categories) {
    const node = nodes.get(category.id)!;
    const parentId = category.parentId ?? null;
    if (parentId != null && ids.has(parentId) && nodes.has(parentId)) {
      nodes.get(parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  const sortRecursive = (list: CategoryTreeNode[]) => {
    list.sort((a, b) => a.name.localeCompare(b.name));
    for (const item of list) sortRecursive(item.children);
  };
  sortRecursive(roots);

  return roots;
}

/** Path from root → … → selected node (inclusive). */
export function findCategoryPath(
  tree: CategoryTreeNode[],
  categoryId: number
): CategoryTreeNode[] {
  const walk = (
    nodes: CategoryTreeNode[],
    trail: CategoryTreeNode[]
  ): CategoryTreeNode[] | null => {
    for (const node of nodes) {
      const next = [...trail, node];
      if (node.id === categoryId) return next;
      const found = walk(node.children, next);
      if (found) return found;
    }
    return null;
  };
  return walk(tree, []) ?? [];
}

export function productsCategoryHref(categoryId: number) {
  return `/dashboard/products?category=${categoryId}`;
}

/**
 * Default selection: first parent → first child → first grandchild
 * (stops at deepest available level).
 */
export function getDefaultCategorySelection(
  tree: CategoryTreeNode[]
): CategoryTreeNode[] {
  if (tree.length === 0) return [];
  return getDeepestDefaultPath(tree[0]);
}

/** First child → first grandchild under a node (inclusive of the node). */
export function getDeepestDefaultPath(
  node: CategoryTreeNode
): CategoryTreeNode[] {
  const path: CategoryTreeNode[] = [node];
  const child = node.children[0];
  if (!child) return path;
  path.push(child);
  const grand = child.children[0];
  if (!grand) return path;
  path.push(grand);
  return path;
}


