import { SellerHomeFaq } from "@/components/seller/home/SellerHomeFaq";
import { SellerHomeFooter } from "@/components/seller/home/SellerHomeFooter";
import { SellerHomeHero } from "@/components/seller/home/SellerHomeHero";
import { SellerHomeHow } from "@/components/seller/home/SellerHomeHow";
import { SellerHomeNav } from "@/components/seller/home/SellerHomeNav";
import { SellerHomePricing } from "@/components/seller/home/SellerHomePricing";
import { SellerHomeStats } from "@/components/seller/home/SellerHomeStats";
import { SellerHomeTestimonials } from "@/components/seller/home/SellerHomeTestimonials";
import { SellerHomeWhy } from "@/components/seller/home/SellerHomeWhy";

export function SellerHomePage() {
  return (
    <div className="min-h-screen bg-white text-seller-navy">
      <SellerHomeNav />
      <main>
        <SellerHomeHero />
        <SellerHomeWhy />
        <SellerHomeHow />
        <SellerHomeStats />
        <SellerHomeTestimonials />
        <SellerHomePricing />
        <SellerHomeFaq />
      </main>
      <SellerHomeFooter />
    </div>
  );
}
