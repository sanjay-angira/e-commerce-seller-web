import { Star } from "lucide-react";
import { STATS } from "@/components/seller/home/sellerHome.data";

export function SellerHomeStats() {
  return (
    <section className="bg-[#e8f1ff] py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4 lg:px-6">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="flex items-center justify-center gap-1 text-2xl font-extrabold text-[#2563eb] md:text-3xl">
              {"starred" in stat && stat.starred ? (
                <Star className="h-5 w-5 fill-emerald-500 text-emerald-500" />
              ) : null}
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
