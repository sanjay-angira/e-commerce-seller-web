import Link from "next/link";
import { PRICING } from "@/components/seller/home/sellerHome.data";

export function SellerHomePricing() {
  return (
    <section id="pricing" className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <h2 className="text-center text-3xl font-bold text-[#12325c]">Pricing</h2>
        <p className="mt-3 text-center text-sm text-slate-500">
          Free to start. No hidden charges. You only pay when you sell.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PRICING.map((plan) => (
            <article
              key={plan.name}
              className="rounded-2xl border border-slate-100 bg-[#f8fbff] p-6 text-center"
            >
              <p className="text-sm font-semibold text-[#2563eb]">{plan.name}</p>
              <p className="mt-2 text-2xl font-extrabold text-[#12325c]">
                {plan.price}
              </p>
              <p className="mt-2 text-sm text-slate-500">{plan.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/register"
            className="inline-flex rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
          >
            Start Selling
          </Link>
        </div>
      </div>
    </section>
  );
}
