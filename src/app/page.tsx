import type { Metadata } from "next";
import { SellerHomePage } from "@/components/seller/home/SellerHomePage";

export const metadata: Metadata = {
  title: "Sell on Vrindavan Rasa",
  description:
    "Reach millions of customers, manage orders, and grow your brand with the Vrindavan Rasa seller platform.",
};

export default function Page() {
  return <SellerHomePage />;
}
