import Image from "next/image";
import {
  ClipboardList,
  Headset,
  IndianRupee,
  LineChart,
  Package,
  ShieldCheck,
  Users,
} from "lucide-react";

export type PromoFeature = {
  title: string;
  text: string;
  icon: "sales" | "products" | "orders" | "support" | "reach" | "grow" | "pay";
};

const ICON_WRAP: Record<PromoFeature["icon"], string> = {
  sales: "bg-blue-50 text-[#2563eb]",
  reach: "bg-blue-50 text-[#2563eb]",
  products: "bg-emerald-50 text-emerald-600",
  grow: "bg-emerald-50 text-emerald-600",
  orders: "bg-orange-50 text-orange-500",
  pay: "bg-orange-50 text-orange-500",
  support: "bg-rose-50 text-rose-500",
};

function FeatureIcon({ icon }: { icon: PromoFeature["icon"] }) {
  const className = "h-5 w-5";
  if (icon === "sales" || icon === "grow") return <LineChart className={className} />;
  if (icon === "products") return <Package className={className} />;
  if (icon === "orders") return <ClipboardList className={className} />;
  if (icon === "pay") return <IndianRupee className={className} />;
  if (icon === "reach") return <Users className={className} />;
  return <Headset className={className} />;
}

type SellerAuthPromoProps = {
  title: string;
  subtitle: string;
  features: PromoFeature[];
};

export function SellerAuthPromo({ title, subtitle, features }: SellerAuthPromoProps) {
  return (
    <div className="max-w-lg">
      <h1 className="text-4xl font-extrabold leading-tight text-[#12325c] md:text-[42px]">
        {title}
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{subtitle}</p>
      <ul className="mt-8 space-y-5">
        {features.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span
              className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${ICON_WRAP[item.icon]}`}
            >
              <FeatureIcon icon={item.icon} />
            </span>
            <span>
              <span className="block text-sm font-bold text-[#12325c]">
                {item.title}
              </span>
              <span className="block text-sm text-slate-500">{item.text}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="relative mt-10 max-w-sm">
        <div className="overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
            alt="Seller managing orders"
            width={640}
            height={420}
            className="h-52 w-full object-cover"
            unoptimized
          />
        </div>
        <div className="absolute -left-2 top-6 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-100">
          <div className="mb-1 flex items-end gap-0.5">
            <span className="h-2 w-1.5 rounded-sm bg-emerald-200" />
            <span className="h-3 w-1.5 rounded-sm bg-emerald-300" />
            <span className="h-4 w-1.5 rounded-sm bg-emerald-400" />
            <span className="h-5 w-1.5 rounded-sm bg-emerald-500" />
          </div>
          Grow Your Business
        </div>
        <div className="absolute bottom-4 left-8 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-100">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          Trusted by 1,00,000+ Sellers
        </div>
      </div>
    </div>
  );
}
