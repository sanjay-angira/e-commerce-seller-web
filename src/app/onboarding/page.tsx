import { SellerAuthChrome } from "@/components/seller/auth/SellerAuthChrome";
import { SellerAuthPromo } from "@/components/seller/auth/SellerAuthPromo";
import { SellerOnboardingForm } from "@/components/seller/auth/SellerOnboardingForm";

export default function SellerOnboardingPage() {
  return (
    <SellerAuthChrome variant="onboarding">
      <div className="grid w-full items-center gap-12 lg:grid-cols-2">
        <SellerAuthPromo
          title="Tell buyers who you are"
          subtitle="Add your name and shop details so customers can trust and find your store."
          features={[
            {
              icon: "reach",
              title: "Shop identity",
              text: "Your shop name and username appear on your storefront.",
            },
            {
              icon: "grow",
              title: "Business details",
              text: "GST and PAN help us verify your seller account faster.",
            },
            {
              icon: "pay",
              title: "Get paid",
              text: "Complete your profile to continue onboarding and payouts.",
            },
            {
              icon: "support",
              title: "Need help?",
              text: "Our team is here if anything in this step is unclear.",
            },
          ]}
        />
        <div className="flex justify-center lg:justify-end">
          <SellerOnboardingForm />
        </div>
      </div>
    </SellerAuthChrome>
  );
}
