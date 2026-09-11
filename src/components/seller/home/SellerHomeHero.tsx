import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Star, Users } from "lucide-react";
import { HomeIcon } from "@/components/seller/home/HomeIcon";
import { HERO_PERKS } from "@/components/seller/home/sellerHome.data";

export function SellerHomeHero() {
  return (
    <section id="home" className="relative overflow-hidden bg-seller-tint">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-seller-accent/15" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-seller-primary/10" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:px-6 lg:py-16">
        <div>
          <p className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-seller-primary ring-1 ring-seller-border">
            Join 1,00,000+ sellers across India
          </p>
          <h1 className="mt-5 max-w-lg text-4xl font-extrabold leading-tight tracking-tight text-seller-navy md:text-5xl">
            Turn Your Products Into a Bigger Business
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">
            Reach millions of customers, manage your orders, and grow your brand
            with Vrindavan Rasa&apos;s powerful seller platform.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-seller-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-seller-accent-hover"
            >
              Start Selling
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-lg border border-seller-primary bg-white px-5 py-2.5 text-sm font-semibold text-seller-primary hover:bg-seller-tint"
            >
              Learn How It Works
            </a>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-xs font-medium text-slate-600 sm:grid-cols-4">
            {HERO_PERKS.map((perk) => (
              <li key={perk.label} className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-seller-accent ring-1 ring-seller-border">
                  <HomeIcon name={perk.icon} className="h-4 w-4" />
                </span>
                {perk.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-2 shadow-sm ring-1 ring-seller-border">
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
            <Users className="h-4 w-4 text-seller-primary" />
            1M+ Happy Customers
          </div>
          <div className="absolute right-2 top-28 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100">
            <div className="mb-1 flex items-end gap-0.5">
              <span className="h-3 w-1.5 rounded-sm bg-seller-accent/30" />
              <span className="h-4 w-1.5 rounded-sm bg-seller-accent/50" />
              <span className="h-5 w-1.5 rounded-sm bg-seller-accent/75" />
              <span className="h-6 w-1.5 rounded-sm bg-seller-accent" />
            </div>
            Grow Your Sales
          </div>
          <div className="absolute bottom-8 left-6 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100">
            <Heart className="h-4 w-4 text-seller-accent" />
            Your Business, Our Support
          </div>
          <div className="absolute bottom-24 right-4 hidden rounded-full bg-white p-2 text-seller-accent-soft ring-1 ring-slate-100 sm:block">
            <Star className="h-5 w-5 fill-current" />
          </div>
        </div>
      </div>
    </section>
  );
}
