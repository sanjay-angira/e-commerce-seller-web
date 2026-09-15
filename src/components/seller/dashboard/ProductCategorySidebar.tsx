"use client";

import Link from "next/link";
import {
  findCategoryPath,
  getDeepestDefaultPath,
  productsCategoryHref,
  type CategoryTreeNode,
} from "@/utils/categoryTree";

type ProductCategorySidebarProps = {
  tree: CategoryTreeNode[];
  selectedCategoryId: number | null;
  isLoading?: boolean;
  error?: string | null;
};

export function ProductCategorySidebar({
  tree,
  selectedCategoryId,
  isLoading,
  error,
}: ProductCategorySidebarProps) {
  const selectedPath =
    selectedCategoryId != null
      ? findCategoryPath(tree, selectedCategoryId)
      : [];
  const selectedRoot = selectedPath[0] ?? null;
  const selectedChild = selectedPath[1] ?? null;
  const selectedGrand = selectedPath[2] ?? null;

  const childOptions = selectedRoot?.children ?? [];
  const grandOptions = selectedChild?.children ?? [];

  return (
    <aside className="flex h-full w-[36rem] shrink-0 flex-col overflow-hidden border-r border-slate-200 bg-white">
      <div className="shrink-0 border-b border-slate-200 px-4 py-3">
        <p className="text-sm font-semibold text-seller-navy">Categories</p>
      </div>

      {isLoading && <CategorySidebarSkeleton />}
      {error && <p className="px-4 py-4 text-xs text-rose-600">{error}</p>}
      {!isLoading && !error && tree.length === 0 && (
        <p className="px-4 py-4 text-xs text-slate-400">No categories found</p>
      )}

      {!isLoading && !error && tree.length > 0 && (
        <div className="grid min-h-0 flex-1 grid-cols-3 divide-x divide-slate-200">
          <CategoryColumn
            items={tree}
            activeId={selectedRoot?.id ?? null}
            hrefFor={(node) => {
              const deepest = getDeepestDefaultPath(node);
              return productsCategoryHref(deepest[deepest.length - 1].id);
            }}
          />
          <CategoryColumn
            items={childOptions}
            activeId={selectedChild?.id ?? null}
            emptyText={selectedRoot ? "No categories" : "Select a category"}
            hrefFor={(node) => {
              const deepest = getDeepestDefaultPath(node);
              return productsCategoryHref(deepest[deepest.length - 1].id);
            }}
          />
          <CategoryColumn
            items={grandOptions}
            activeId={selectedGrand?.id ?? null}
            emptyText={selectedChild ? "No categories" : "Select a category"}
            hrefFor={(node) => productsCategoryHref(node.id)}
          />
        </div>
      )}
    </aside>
  );
}

export function CategorySidebarSkeleton() {
  const rows = [
    "w-[85%]",
    "w-[60%]",
    "w-[70%]",
    "w-[80%]",
    "w-[50%]",
    "w-[75%]",
    "w-[40%]",
    "w-[65%]",
  ];

  return (
    <div className="grid min-h-0 flex-1 grid-cols-3 divide-x divide-slate-200">
      {[0, 1, 2].map((column) => (
        <div key={column} className="flex min-h-0 min-w-0 flex-col">
          <div className="flex-1 space-y-2 overflow-hidden px-2 py-3">
            {rows.map((widthClass, index) => (
              <div
                key={`${column}-${index}`}
                className={`h-8 animate-pulse rounded-lg bg-slate-100 ${widthClass}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CategoryColumn({
  items,
  activeId,
  hrefFor,
  emptyText,
}: {
  items: CategoryTreeNode[];
  activeId: number | null;
  hrefFor: (node: CategoryTreeNode) => string;
  emptyText?: string;
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col">
      <div className="flex-1 space-y-0.5 overflow-y-auto px-2 py-2">
        {items.length === 0 && emptyText && (
          <p className="px-2 py-2 text-[11px] text-slate-400">{emptyText}</p>
        )}
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <Link
              key={item.id}
              href={hrefFor(item)}
              title={item.name}
              className={`block truncate rounded-lg px-2.5 py-2 text-left text-xs transition ${
                active
                  ? "bg-seller-primary font-medium text-white"
                  : "text-slate-600 hover:bg-seller-tint hover:text-seller-navy"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
