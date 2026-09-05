import { SellerAuthCard } from "@/components/seller/auth/SellerAuthCard";
import { SellerLoginForm } from "@/components/seller/auth/SellerLoginForm";

export default function SellerLoginPage() {
  return (
    <SellerAuthCard
      title="Seller sign in"
      subtitle="Enter your credentials to access the seller panel"
    >
      <SellerLoginForm />
    </SellerAuthCard>
  );
}
