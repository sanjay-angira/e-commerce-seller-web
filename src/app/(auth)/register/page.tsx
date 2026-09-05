import { SellerAuthChrome } from "@/components/seller/auth/SellerAuthChrome";
import { SellerAuthPromo } from "@/components/seller/auth/SellerAuthPromo";
import { SellerRegisterForm } from "@/components/seller/auth/SellerRegisterForm";

export default function SellerRegisterPage() {
  return (
    <SellerAuthChrome variant="register">
      <div className="grid w-full items-center gap-12 lg:grid-cols-2">
        <SellerAuthPromo
          title="Start Selling with Vrindavan Rasa"
          subtitle="Join thousands of trusted sellers and grow your business with India's fastest growing marketplace."
          features={[
            {
              icon: "reach",
              title: "Reach Millions",
              text: "Get access to a large customer base across India.",
            },
            {
              icon: "grow",
              title: "Grow Your Business",
              text: "Powerful tools to manage and scale your online store.",
            },
            {
              icon: "pay",
              title: "Secure Payments",
              text: "Get paid safely and on time.",
            },
            {
              icon: "support",
              title: "Dedicated Support",
              text: "Our team is always here to help you.",
            },
          ]}
        />
        <div className="flex justify-center lg:justify-end">
          <SellerRegisterForm />
        </div>
      </div>
    </SellerAuthChrome>
  );
}
