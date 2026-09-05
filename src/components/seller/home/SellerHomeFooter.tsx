import { ShoppingBag } from "@/components/seller/home/HomeIcon";
import { FOOTER_LINKS } from "@/components/seller/home/sellerHome.data";

const SOCIALS = [
  {
    label: "Facebook",
    path: "M15 8h-3V6c0-.6.3-1 1-1h2V2h-3a4 4 0 0 0-4 4v2H6v3h2v7h3v-7h2.5L15 8z",
  },
  {
    label: "Instagram",
    path: "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm8 2H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zm-4 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zM17.2 7a1 1 0 1 1-1-1 1 1 0 0 1 1 1z",
  },
  {
    label: "LinkedIn",
    path: "M6.5 9H4V20h2.5zM5.3 4A1.6 1.6 0 1 0 5.3 7.2 1.6 1.6 0 0 0 5.3 4zM20 20h-2.5v-5.6c0-1.5-.5-2.5-1.8-2.5s-2 1-2 2.5V20H11V9h2.4v1.5A3.2 3.2 0 0 1 16.4 9C18.6 9 20 10.4 20 13.4z",
  },
] as const;

export function SellerHomeFooter() {
  return (
    <footer id="contact" className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563eb] text-white">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-bold text-[#1e3a8a]">
              Vrindavan Rasa
            </span>
            <span className="block text-[11px] text-slate-500">
              Sell. Grow. Together.
            </span>
          </span>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-[#2563eb]">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-slate-500">
          {SOCIALS.map((item) => (
            <span key={item.label} aria-label={item.label}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d={item.path} />
              </svg>
            </span>
          ))}
          <span className="text-xs font-bold">X</span>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <p>© 2026 Vrindavan Rasa. All rights reserved.</p>
          <p>Made with care for Indian sellers</p>
        </div>
      </div>
    </footer>
  );
}
