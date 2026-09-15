"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardPlaceholder } from "@/components/seller/dashboard/DashboardPlaceholder";
import { useSellerCategories } from "@/services/seller/useSellerCategories";
import { findCategoryPath } from "@/utils/categoryTree";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const { tree, isLoading, error } = useSellerCategories();
  const categoryId = Number(searchParams.get("category") || 0) || null;
  const path = categoryId ? findCategoryPath(tree, categoryId) : [];
  const selected = path[path.length - 1] ?? null;
  const breadcrumb = path.map((node) => node.name).join(" › ");

  if (isLoading) {
    return (
      <DashboardPlaceholder
        title="Products"
        description="Loading categories…"
      />
    );
  }

  if (error) {
    return <DashboardPlaceholder title="Products" description={error} />;
  }

  if (!selected) {
    return (
      <DashboardPlaceholder
        title="Products"
        description="Select a category from the category sidebar."
      />
    );
  }

  return (
    <DashboardPlaceholder
      title={selected.name}
      description={`Category path: ${breadcrumb}. Products for this category will load here once the seller products API is connected.`}
    />
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <DashboardPlaceholder
          title="Products"
          description="Loading categories…"
        />
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
