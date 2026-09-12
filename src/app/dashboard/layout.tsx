"use client";

import { useEffect, type ReactNode } from "react";
import { SellerDashboardShell } from "@/components/seller/dashboard/SellerDashboardShell";
import { useSellerAuth } from "@/services/seller/useSellerAuth";
import { isSellerProfileComplete } from "@/types/user";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { seller, isHydrated, isAuthenticated } = useSellerAuth();

  useEffect(() => {
    if (!isHydrated || !seller) return;
    if (!isSellerProfileComplete(seller)) {
      window.location.replace("/onboarding");
    }
  }, [isHydrated, seller]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6fa] text-sm text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  if (!isAuthenticated || !seller) {
    return null;
  }

  if (!isSellerProfileComplete(seller)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6fa] text-sm text-slate-500">
        Redirecting to complete your profile...
      </div>
    );
  }

  return (
    <SellerDashboardShell seller={seller}>{children}</SellerDashboardShell>
  );
}
