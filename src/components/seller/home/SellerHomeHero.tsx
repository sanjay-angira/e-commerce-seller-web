import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Star, Users } from "lucide-react";
import { HomeIcon } from "@/components/seller/home/HomeIcon";
import { HERO_PERKS } from "@/components/seller/home/sellerHome.data";

export function SellerHomeHero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#eef4ff]">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-200/40" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-sky-100/80" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:px-6 lg:py-16">
        <div>
          <p className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-[#2563eb] ring-1 ring-blue-100">
            Join 1,00,000+ sellers across India
          </p>
          <h1 className="mt-5 max-w-lg text-4xl font-extrabold leading-tight tracking-tight text-[#12325c] md:text-5xl">
            Turn Your Products Into a Bigger Business
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">
            Reach millions of customers, manage your orders, and grow your brand
            with Vrindavan Rasa&apos;s powerful seller platform.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
            >
              Start Selling
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Learn How It Works
            </a>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-xs font-medium text-slate-600 sm:grid-cols-4">
            {HERO_PERKS.map((perk) => (
              <li key={perk.label} className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2563eb] ring-1 ring-blue-100">
                  <HomeIcon name={perk.icon} className="h-4 w-4" />
                </span>
                {perk.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-2 shadow-sm ring-1 ring-blue-100">
            <Image
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=900&q=80"
              alt="Seller packing orders"
              width={900}
              height={1100}
              className="h-[420px] w-full rounded-[1.6rem] object-cover object-top md:h-[480px]"
              priority
              unoptimized
            />
          </div>

          <div className="absolute left-2 top-10 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100">
            <Users className="h-4 w-4 text-[#2563eb]" />
            1M+ Happy Customers
          </div>
          <div className="absolute right-2 top-28 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100">
            <div className="mb-1 flex items-end gap-0.5">
              <span className="h-3 w-1.5 rounded-sm bg-emerald-200" />
              <span className="h-4 w-1.5 rounded-sm bg-emerald-300" />
              <span className="h-5 w-1.5 rounded-sm bg-emerald-400" />
              <span className="h-6 w-1.5 rounded-sm bg-emerald-500" />
            </div>
            Grow Your Sales
          </div>
          <div className="absolute bottom-8 left-6 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100">
            <Heart className="h-4 w-4 text-rose-500" />
            Your Business, Our Support
          </div>
          <div className="absolute bottom-24 right-4 hidden rounded-full bg-white p-2 text-amber-400 ring-1 ring-slate-100 sm:block">
            <Star className="h-5 w-5 fill-current" />
          </div>
        </div>
      </div>
    </section>
  );
}
