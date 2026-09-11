export interface Seller {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  shopName?: string;
  avatar?: string;
}

export function isSellerProfileComplete(
  seller: Pick<Seller, "firstName" | "lastName" | "shopName"> | null | undefined
) {
  if (!seller) return false;
  const firstName = seller.firstName?.trim();
  const lastName = seller.lastName?.trim();
  const shopName = seller.shopName?.trim();
  if (!firstName || !lastName || !shopName) return false;
  return !shopName.toLowerCase().startsWith("pending shop");
}

export function sellerHomePath(seller: Seller) {
  return isSellerProfileComplete(seller) ? "/dashboard" : "/onboarding";
}
