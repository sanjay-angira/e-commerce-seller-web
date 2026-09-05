"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ShoppingBag } from "@/components/seller/home/HomeIcon";
import { NAV_LINKS } from "@/components/seller/home/sellerHome.data";
import { useSellerAuth } from "@/services/seller/useSellerAuth";

export function SellerHomeNav() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isHydrated } = useSellerAuth();
  const signedIn = isHydrated && isAuthenticated;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link href="#home" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563eb] text-white">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-bold text-[#1e3a8a]">
              Vrindavan Rasa
            </span>
            <span className="block text-[11px] text-slate-500">
              Sell. Grow. Together.
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-[13px] font-medium text-slate-600 lg:flex">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={
                index === 0
                  ? "text-[#2563eb]"
                  : "hover:text-[#2563eb]"
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
              className="rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-[#2563eb] px-4 py-2 text-sm font-semibold text-[#2563eb] hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
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
              <Link href="/dashboard" className="font-semibold text-[#2563eb]">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-[#2563eb] px-4 py-2 text-center font-semibold text-white"
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
