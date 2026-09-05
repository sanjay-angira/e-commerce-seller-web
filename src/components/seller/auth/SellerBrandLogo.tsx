import Link from "next/link";
import { ShoppingBag } from "@/components/seller/home/HomeIcon";

export function SellerBrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563eb] text-white">
        <ShoppingBag className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <span
          className={`block font-bold text-[#1e3a8a] ${compact ? "text-sm" : "text-[15px]"}`}
        >
          Vrindavan Rasa
        </span>
        <span className="block text-[11px] text-slate-500">
          Sell. Grow. Together.
        </span>
      </span>
    </Link>
  );
}
