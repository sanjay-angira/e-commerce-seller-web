import { HomeIcon } from "@/components/seller/home/HomeIcon";
import { HOW_STEPS } from "@/components/seller/home/sellerHome.data";

export function SellerHomeHow() {
  return (
    <section id="how-it-works" className="bg-seller-tint py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <h2 className="text-center text-3xl font-bold text-seller-navy">
          How It Works
        </h2>
        <p className="mt-3 text-center text-sm text-slate-500">
          Start selling in just a few simple steps
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_STEPS.map((item, index) => (
            <article key={item.title} className="relative text-center">
              {index < HOW_STEPS.length - 1 && (
                <span className="pointer-events-none absolute top-5 left-[58%] hidden h-px w-[84%] border-t border-dashed border-seller-border lg:block" />
              )}
              <span className="relative z-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-seller-accent text-sm font-bold text-white">
                {item.step}
              </span>
              <span className="mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-seller-primary ring-1 ring-seller-border">
                <HomeIcon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-base font-bold text-seller-navy">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
