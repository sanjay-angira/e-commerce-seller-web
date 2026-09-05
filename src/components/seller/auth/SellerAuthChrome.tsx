import Link from "next/link";
import type { ReactNode } from "react";
import { SellerBrandLogo } from "@/components/seller/auth/SellerBrandLogo";
import { SellerHomeFooter } from "@/components/seller/home/SellerHomeFooter";
import { NAV_LINKS } from "@/components/seller/home/sellerHome.data";

type SellerAuthChromeProps = {
  variant: "login" | "register";
  children: ReactNode;
};

export function SellerAuthChrome({ variant, children }: SellerAuthChromeProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f7fb]">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
          <SellerBrandLogo />
          {variant === "login" ? (
            <>
              <nav className="hidden items-center gap-5 text-[13px] font-medium text-slate-600 lg:flex">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={`/${link.href}`} className="hover:text-[#2563eb]">
                    {link.label}
                  </Link>
                ))}
              </nav>
              <p className="flex items-center gap-2 text-sm text-slate-600">
                <span className="hidden sm:inline">New to Vrindavan Rasa?</span>
                <Link
                  href="/register"
                  className="rounded-lg border border-[#2563eb] px-4 py-2 text-sm font-semibold text-[#2563eb] hover:bg-blue-50"
                >
                  Create Seller Account
                </Link>
              </p>
            </>
          ) : (
            <p className="flex items-center gap-2 text-sm text-slate-600">
              Already a seller?
              <Link
                href="/login"
                className="rounded-lg border border-[#2563eb] px-4 py-2 text-sm font-semibold text-[#2563eb] hover:bg-blue-50"
              >
                Login
              </Link>
            </p>
          )}
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-10 lg:px-6">
        {children}
      </main>
      <SellerHomeFooter />
    </div>
  );
}
