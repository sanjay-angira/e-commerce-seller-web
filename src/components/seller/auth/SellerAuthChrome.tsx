import Link from "next/link";
import type { ReactNode } from "react";
import { SellerBrandLogo } from "@/components/seller/auth/SellerBrandLogo";
import { SellerHomeFooter } from "@/components/seller/home/SellerHomeFooter";
import { NAV_LINKS } from "@/components/seller/home/sellerHome.data";

type SellerAuthChromeProps = {
  variant: "login" | "register" | "onboarding";
  children: ReactNode;
};

export function SellerAuthChrome({ variant, children }: SellerAuthChromeProps) {
  return (
    <div className="flex min-h-screen flex-col bg-seller-tint">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:gap-4 sm:py-3 lg:px-6">
          <div className="min-w-0">
            <SellerBrandLogo />
          </div>
          {variant === "login" ? (
            <>
              <nav className="hidden items-center gap-5 text-[13px] font-medium text-slate-600 lg:flex">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={`/${link.href}`} className="hover:text-seller-primary">
                    {link.label}
                  </Link>
                ))}
              </nav>
              <p className="flex shrink-0 items-center gap-2 text-sm text-slate-600">
                <span className="hidden sm:inline">New to Vrindavan Rasa?</span>
                <Link
                  href="/register"
                  className="whitespace-nowrap rounded-lg border border-seller-accent px-3 py-1.5 text-xs font-semibold text-seller-accent hover:bg-seller-muted sm:px-4 sm:py-2 sm:text-sm"
                >
                  Create Seller Account
                </Link>
              </p>
            </>
          ) : variant === "register" ? (
            <p className="flex shrink-0 items-center gap-2 text-sm text-slate-600">
              <span className="hidden sm:inline">Already a seller?</span>
              <Link
                href="/login"
                className="whitespace-nowrap rounded-lg border border-seller-primary px-3 py-1.5 text-xs font-semibold text-seller-primary hover:bg-seller-tint sm:px-4 sm:py-2 sm:text-sm"
              >
                Login
              </Link>
            </p>
          ) : (
            <p className="text-sm font-medium text-slate-600">Finish your shop profile</p>
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
