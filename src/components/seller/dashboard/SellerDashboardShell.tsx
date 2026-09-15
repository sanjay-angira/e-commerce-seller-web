"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
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
import { ProductCategorySidebar, CategorySidebarSkeleton } from "@/components/seller/dashboard/ProductCategorySidebar";
import { useSellerAuth } from "@/services/seller/useSellerAuth";
import { useSellerCategories } from "@/services/seller/useSellerCategories";
import type { Seller } from "@/types/user";
import {
  findCategoryPath,
  getDefaultCategorySelection,
  productsCategoryHref,
} from "@/utils/categoryTree";

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
  const showCategorySidebar = pathname === "/dashboard/products";

  const shopLabel = seller.shopName?.trim() || "Your Store";
  const sellerName =
    seller.name?.trim() ||
    `${seller.firstName || ""} ${seller.lastName || ""}`.trim() ||
    seller.email;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#f4f6fa] text-seller-navy">
      <header className="z-30 w-full shrink-0 border-b border-slate-200 bg-white">
        <div className="flex w-full items-center gap-3 px-4 py-2.5 lg:gap-4 lg:px-6">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link
            href="/dashboard"
            aria-label="BazarBaazi seller panel"
            className="relative block h-11 w-[min(16rem,48vw)] shrink-0 no-underline sm:h-12 sm:w-64 lg:w-72"
          >
            <Image
              src="/logo.png"
              alt="BazarBaazi Seller Panel"
              fill
              priority
              unoptimized
              sizes="288px"
              className="object-contain object-left"
            />
          </Link>

          <label className="relative hidden min-w-0 flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search orders, products, customers..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-seller-primary focus:bg-white focus:ring-2 focus:ring-seller-primary/15"
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

      <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <aside className="hidden h-full w-64 shrink-0 flex-col overflow-hidden bg-seller-navy text-white lg:flex">
          <SidebarNav pathname={pathname} onNavigate={() => undefined} />
          <SidebarFooter onLogout={() => void logout()} />
        </aside>

        {showCategorySidebar && (
          <div className="hidden h-full shrink-0 lg:flex">
            <Suspense fallback={<CategorySidebarFallback />}>
              <ProductsCategoryRail />
            </Suspense>
          </div>
        )}

        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="relative flex h-full w-72 flex-col overflow-hidden bg-seller-navy text-white shadow-xl">
              <div className="flex shrink-0 items-center justify-end border-b border-white/10 px-4 py-3">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-2 text-white/80 hover:bg-white/10"
                  aria-label="Close menu"
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

        <main className="min-w-0 flex-1 overflow-y-auto px-4 py-5 lg:px-6 lg:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function CategorySidebarFallback() {
  return (
    <aside className="flex h-full w-[36rem] shrink-0 flex-col overflow-hidden border-r border-slate-200 bg-white">
      <div className="shrink-0 border-b border-slate-200 px-4 py-3">
        <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-3 w-36 animate-pulse rounded bg-slate-100" />
      </div>
      <CategorySidebarSkeleton />
    </aside>
  );
}

function ProductsCategoryRail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tree, isLoading, error } = useSellerCategories();
  const categoryId = Number(searchParams.get("category") || 0) || null;
  const path = categoryId ? findCategoryPath(tree, categoryId) : [];
  const defaultPath = getDefaultCategorySelection(tree);
  const defaultId = defaultPath[defaultPath.length - 1]?.id ?? null;

  useEffect(() => {
    if (isLoading || !defaultId) return;
    if (!categoryId || path.length === 0) {
      router.replace(productsCategoryHref(defaultId));
    }
  }, [categoryId, defaultId, isLoading, path.length, router]);

  return (
    <ProductCategorySidebar
      tree={tree}
      selectedCategoryId={categoryId}
      isLoading={isLoading}
      error={error}
    />
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
    <div className="shrink-0 space-y-1 border-t border-white/10 px-3 py-4">
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
