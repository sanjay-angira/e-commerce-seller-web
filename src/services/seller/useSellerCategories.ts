"use client";

import { useEffect, useState } from "react";
import { API_ENDPOINTS, getData } from "@/services/api";
import {
  buildCategoryTree,
  type CategoryTreeNode,
  type FlatCategory,
} from "@/utils/categoryTree";

type CategoriesPayload = {
  rows?: Array<{
    id: number;
    name: string;
    slug: string;
    parentId?: number | null;
  }>;
};

export function useSellerCategories() {
  const [tree, setTree] = useState<CategoryTreeNode[]>([]);
  const [flat, setFlat] = useState<FlatCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getData(
          API_ENDPOINTS.CATEGORIES.LIST,
          undefined,
          { auth: false }
        );
        if (cancelled) return;

        const rows = (response?.data as CategoriesPayload | undefined)?.rows ?? [];
        const mapped: FlatCategory[] = rows.map((row) => ({
          id: row.id,
          name: row.name,
          slug: row.slug,
          parentId: row.parentId ?? null,
        }));
        setFlat(mapped);
        setTree(buildCategoryTree(mapped));
      } catch (err) {
        if (cancelled) return;
        const message =
          err && typeof err === "object" && "message" in err
            ? String((err as { message?: string }).message)
            : "Failed to load categories";
        setError(message);
        setFlat([]);
        setTree([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { tree, flat, isLoading, error };
}
