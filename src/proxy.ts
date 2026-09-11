import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STORAGE_KEYS } from "@/services/api/storage";

const PUBLIC_PATHS = new Set(["/", "/login", "/register"]);

function hasSellerSession(request: NextRequest): boolean {
  return request.cookies.get(STORAGE_KEYS.sellerSession)?.value === "1";
}

function needsOnboarding(request: NextRequest): boolean {
  return request.cookies.get(STORAGE_KEYS.sellerProfileComplete)?.value === "0";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = hasSellerSession(request);
  const incomplete = needsOnboarding(request);

  if (pathname === "/login" || pathname === "/register") {
    if (loggedIn) {
      return NextResponse.redirect(
        new URL(incomplete ? "/onboarding" : "/dashboard", request.url)
      );
    }
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (!loggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/onboarding" && !incomplete) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/dashboard" && incomplete) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
