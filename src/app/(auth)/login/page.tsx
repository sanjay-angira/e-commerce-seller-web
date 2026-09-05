import { SellerAuthChrome } from "@/components/seller/auth/SellerAuthChrome";
import { SellerAuthPromo } from "@/components/seller/auth/SellerAuthPromo";
import { SellerLoginForm } from "@/components/seller/auth/SellerLoginForm";

export default function SellerLoginPage() {
  return (
    <SellerAuthChrome variant="login">
      <div className="grid w-full items-center gap-12 lg:grid-cols-2">
        <SellerAuthPromo
          title="Welcome Back, Seller!"
          subtitle="Login to your seller account and manage your business, products, orders and more."
          features={[
            {
              icon: "sales",
              title: "Track Your Sales",
              text: "Get real-time insights on your business.",
            },
            {
              icon: "products",
              title: "Manage Products",
              text: "Add, update and manage your inventory.",
            },
            {
              icon: "orders",
              title: "Handle Orders",
              text: "Process and ship orders with ease.",
            },
            {
              icon: "support",
              title: "Get Dedicated Support",
              text: "Our team is always here to help you.",
            },
          ]}
        />
        <div className="flex justify-center lg:justify-end">
          <SellerLoginForm />
        </div>
      </div>
    </SellerAuthChrome>
  );
}
