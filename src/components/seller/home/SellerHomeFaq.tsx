"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/components/seller/home/sellerHome.data";

export function SellerHomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#f8fbff] py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold text-[#12325c]">
            Frequently Asked Questions
          </h2>
          <a href="#faq" className="hidden text-sm font-semibold text-[#2563eb] sm:inline">
            View All FAQs →
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {FAQS.map((item, index) => {
            const open = openIndex === index;
            return (
              <div
                key={item.q}
                className="rounded-xl border border-slate-100 bg-white"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-[#12325c]"
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  {item.q}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open && (
                  <p className="px-5 pb-4 text-sm leading-relaxed text-slate-500">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
