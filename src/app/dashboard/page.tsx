"use client";

import { Button } from "@/components/common/Button";
import { useSellerAuth } from "@/services/seller/useSellerAuth";

export default function SellerDashboardPage() {
  const { seller, isHydrated, isAuthenticated, logout } = useSellerAuth();

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated || !seller) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-seller-muted px-4">
      <div className="w-full max-w-md rounded-2xl border border-seller-border bg-white p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-seller-primary">
          Seller Panel
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">
          You are signed in
        </h1>
        <p className="mt-2 text-sm text-slate-600">{seller.email}</p>
        {seller.shopName && (
          <p className="mt-1 text-sm text-slate-500">{seller.shopName}</p>
        )}
        <div className="mt-6">
          <Button type="button" onClick={() => void logout()}>
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
