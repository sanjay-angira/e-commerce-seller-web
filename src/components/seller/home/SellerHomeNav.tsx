"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SellerBrandLogo } from "@/components/seller/auth/SellerBrandLogo";
import { NAV_LINKS } from "@/components/seller/home/sellerHome.data";
import { useSellerAuth } from "@/services/seller/useSellerAuth";

export function SellerHomeNav() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isHydrated } = useSellerAuth();
  const signedIn = isHydrated && isAuthenticated;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:gap-4 sm:py-3 lg:px-6">
        <div className="min-w-0">
          <SellerBrandLogo />
        </div>

        <nav className="hidden items-center gap-5 text-[13px] font-medium text-slate-600 lg:flex">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={
                index === 0
                  ? "text-seller-accent"
                  : "hover:text-seller-primary"
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {signedIn ? (
            <Link
              href="/dashboard"
              className="rounded-lg bg-seller-primary px-4 py-2 text-sm font-semibold text-white hover:bg-seller-primary-hover"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-seller-primary px-4 py-2 text-sm font-semibold text-seller-primary hover:bg-seller-tint"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-seller-accent px-4 py-2 text-sm font-semibold text-white hover:bg-seller-accent-hover"
              >
                Start Selling
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="lg:hidden text-slate-700"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-600">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {signedIn ? (
              <Link href="/dashboard" className="font-semibold text-seller-primary">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-seller-accent px-4 py-2 text-center font-semibold text-white"
                >
                  Start Selling
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
