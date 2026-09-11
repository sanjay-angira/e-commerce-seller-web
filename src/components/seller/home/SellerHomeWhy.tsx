import { HomeIcon } from "@/components/seller/home/HomeIcon";
import { WHY_CARDS } from "@/components/seller/home/sellerHome.data";

export function SellerHomeWhy() {
  return (
    <section id="benefits" className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <h2 className="text-center text-3xl font-bold text-seller-navy">
          Why Sell With Vrindavan Rasa?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-500">
          Everything you need to start, manage, and grow your online business
          from one trusted seller platform.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CARDS.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-seller-border bg-white p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-seller-muted text-seller-accent">
                <HomeIcon name={card.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-seller-navy">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
