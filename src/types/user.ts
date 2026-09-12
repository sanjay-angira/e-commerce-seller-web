export interface Seller {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  shopName?: string;
  phone?: string;
  avatar?: string;
}

/** Auto-generated shop names from signup before onboarding. */
export function isPlaceholderShopName(shopName?: string | null) {
  const value = shopName?.trim().toLowerCase() || "";
  if (!value) return true;
  if (value.startsWith("pending shop")) return true;
  // "Shop 8786868676" style placeholders from register defaults
  if (/^shop\s+\d{8,}$/i.test(value)) return true;
  return false;
}

/** Default identity written at register time. */
export function isPlaceholderSellerName(
  firstName?: string | null,
  lastName?: string | null
) {
  return (
    (firstName || "").trim().toLowerCase() === "seller" &&
    (lastName || "").trim().toLowerCase() === "account"
  );
}

/** Recover phone from placeholder shop names like "Shop 8786868676". */
export function phoneFromShopName(shopName?: string | null) {
  const match = (shopName || "")
    .trim()
    .match(/^(?:pending\s+)?shop\s+(\d{10,12})$/i);
  return match?.[1] || undefined;
}

export function isSellerProfileComplete(
  seller: Pick<Seller, "firstName" | "lastName" | "shopName"> | null | undefined
) {
  if (!seller) return false;
  const firstName = seller.firstName?.trim();
  const lastName = seller.lastName?.trim();
  const shopName = seller.shopName?.trim();
  if (!firstName || !lastName || !shopName) return false;
  if (isPlaceholderShopName(shopName)) return false;
  if (isPlaceholderSellerName(firstName, lastName)) return false;
  return true;
}

export function sellerHomePath(seller: Seller) {
  return isSellerProfileComplete(seller) ? "/dashboard" : "/onboarding";
}
