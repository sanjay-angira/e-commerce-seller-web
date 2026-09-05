import Image from "next/image";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/components/seller/home/sellerHome.data";

export function SellerHomeTestimonials() {
  return (
    <section id="success-stories" className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <h2 className="text-center text-3xl font-bold text-[#12325c]">
          What Our Sellers Say
        </h2>
        <p className="mt-3 text-center text-sm text-slate-500">
          Real stories from real businesses growing with Vrindavan Rasa
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-slate-100 bg-white p-6"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
                unoptimized
              />
              <p className="mt-4 text-sm italic leading-relaxed text-slate-600">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm font-bold text-[#12325c]">{item.name}</p>
              <p className="text-xs text-slate-500">{item.role}</p>
              <div className="mt-3 flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
