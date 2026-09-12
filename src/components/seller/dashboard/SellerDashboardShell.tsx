"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Store,
  X,
} from "lucide-react";
import {
  SELLER_HELP_ITEM,
  SELLER_NAV_ITEMS,
} from "@/components/seller/dashboard/dashboard.data";
import { useSellerAuth } from "@/services/seller/useSellerAuth";
import type { Seller } from "@/types/user";

type SellerDashboardShellProps = {
  children: ReactNode;
  seller: Seller;
};

export function SellerDashboardShell({
  children,
  seller,
}: SellerDashboardShellProps) {
  const pathname = usePathname();
  const { logout } = useSellerAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const shopLabel = seller.shopName?.trim() || "Your Store";
  const sellerName =
    seller.name?.trim() ||
    `${seller.firstName || ""} ${seller.lastName || ""}`.trim() ||
    seller.email;

  return (
    <div className="flex min-h-screen bg-[#f4f6fa] text-seller-navy">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-seller-navy text-white lg:flex">
        <SidebarBrand />
        <SidebarNav pathname={pathname} onNavigate={() => undefined} />
        <SidebarFooter onLogout={() => void logout()} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-72 flex-col bg-seller-navy text-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-4">
              <SidebarBrand compact />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-white/80 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarNav
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
            <SidebarFooter onLogout={() => void logout()} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3 px-4 py-3 lg:px-6">
            <button
              type="button"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <label className="relative hidden min-w-0 flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search orders, products, customers..."
                className="w-full max-w-xl rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-seller-primary focus:bg-white focus:ring-2 focus:ring-seller-primary/15"
              />
            </label>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  3
                </span>
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-slate-200 py-1.5 pl-1.5 pr-3 hover:bg-slate-50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-seller-tint text-seller-primary">
                  <Store className="h-4 w-4" />
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-sm font-semibold leading-tight">
                    {shopLabel}
                  </span>
                  <span className="block text-[11px] text-slate-500">
                    {sellerName.includes("@") ? "Seller" : sellerName}
                  </span>
                </span>
                <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 lg:px-6 lg:py-6">{children}</main>
      </div>
    </div>
  );
}

function SidebarBrand({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`border-b border-white/10 ${compact ? "px-0 pb-0" : "px-5 py-5"}`}
    >
      <Link
        href="/dashboard"
        aria-label="BazarBaazi seller dashboard"
        className={`relative block w-full overflow-hidden rounded-xl bg-white ${
          compact ? "h-10 max-w-[11rem]" : "h-12"
        }`}
      >
        <Image
          src="/logo.png"
          alt="BazarBaazi"
          fill
          priority
          sizes="200px"
          className="object-contain object-left p-2"
        />
      </Link>
    </div>
  );
}

function SidebarNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {SELLER_NAV_ITEMS.map((item) => {
        const active =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-seller-primary text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter({ onLogout }: { onLogout: () => void }) {
  const HelpIcon = SELLER_HELP_ITEM.icon;
  return (
    <div className="space-y-1 border-t border-white/10 px-3 py-4">
      <Link
        href={SELLER_HELP_ITEM.href}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
      >
        <HelpIcon className="h-4 w-4" />
        {SELLER_HELP_ITEM.label}
      </Link>
      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  );
}
