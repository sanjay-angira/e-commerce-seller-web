"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Circle,
  HelpCircle,
  MapPin,
  Package,
  ShieldCheck,
} from "lucide-react";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { Input } from "@/components/common/Input";
import { SellerBrandLogo } from "@/components/seller/auth/SellerBrandLogo";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { selectSellerAuth } from "@/services/redux/selectors";
import { completeSellerProfile, fetchSellerProfile } from "@/services/redux/slices/sellerSlices/sellerAuthSlice";
import { useSellerAuth } from "@/services/seller/useSellerAuth";
import {
  isPlaceholderSellerName,
  isPlaceholderShopName,
  isSellerProfileComplete,
  phoneFromShopName,
} from "@/types/user";

function formatPhone(phone?: string) {
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.length === 10) return `+91 ${digits}`;
  if (digits.length > 10) return `+${digits}`;
  return phone || "—";
}

function StatusDot({ done }: { done: boolean }) {
  if (done) {
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
    );
  }
  return <Circle className="h-5 w-5 text-amber-400" strokeWidth={2} />;
}

export function SellerOnboardingDashboard() {
  const dispatch = useAppDispatch();
  const { seller, isHydrated, logout } = useSellerAuth();
  const { isLoading, error } = useAppSelector(selectSellerAuth);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [shopName, setShopName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [categoryMode, setCategoryMode] = useState<"all" | "books">("all");
  const [formError, setFormError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const profileFetchedRef = useRef(false);

  useEffect(() => {
    if (!isHydrated || !seller) return;
    if (isSellerProfileComplete(seller)) {
      window.location.replace("/dashboard");
      return;
    }
    if (!seller.phone && !profileFetchedRef.current) {
      profileFetchedRef.current = true;
      void dispatch(fetchSellerProfile());
    }
  }, [isHydrated, seller, dispatch]);

  useEffect(() => {
    if (!seller) return;

    const placeholderName = isPlaceholderSellerName(
      seller.firstName,
      seller.lastName
    );
    const emailUser = seller.email.split("@")[0] || "";

    if (!placeholderName) {
      setFirstName((value) => value || seller.firstName || "");
      setLastName((value) => value || seller.lastName || "");
    }
    // Never treat the email username as a completed display name.
    setDisplayName((value) => {
      if (!value || value === emailUser) return "";
      return value;
    });
    setShopName((value) => {
      if (value) return value;
      if (isPlaceholderShopName(seller.shopName)) return "";
      return seller.shopName || "";
    });
  }, [seller]);

  const emailUser = seller?.email.split("@")[0] || "";
  const displayNameDone =
    displayName.trim().length >= 3 && displayName.trim() !== emailUser;
  const contactDone = Boolean(seller?.email);
  const idDone = gstNumber.trim().length >= 15 || panNumber.trim().length >= 10;
  const storeDone =
    firstName.trim().length >= 2 &&
    lastName.trim().length >= 1 &&
    displayNameDone &&
    shopName.trim().length >= 2;
  const listingDone = false;

  const progress = useMemo(() => {
    const parts = [contactDone, idDone, storeDone, listingDone];
    const doneCount = parts.filter(Boolean).length;
    return Math.round((doneCount / parts.length) * 100);
  }, [contactDone, idDone, storeDone, listingDone]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError("");
    setFirstNameError("");
    setLastNameError("");

    if (firstName.trim().length < 2) {
      setFirstNameError("Enter your first name");
      setFormError("Enter your first name");
      return;
    }
    if (lastName.trim().length < 1) {
      setLastNameError("Enter your last name");
      setFormError("Enter your last name");
      return;
    }
    if (displayName.trim().length < 3) {
      setFormError("Enter a display name of at least 3 characters");
      return;
    }
    if (shopName.trim().length < 2) {
      setFormError("Enter your shop / store name");
      return;
    }

    const result = await dispatch(
      completeSellerProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        displayName: displayName.trim(),
        shopName: shopName.trim(),
        gstNumber: gstNumber.trim() || undefined,
        panNumber: panNumber.trim() || undefined,
      })
    );

    if (completeSellerProfile.fulfilled.match(result)) {
      window.location.href = "/dashboard";
    }
  }

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb] text-sm text-slate-500">
        Loading your onboarding...
      </div>
    );
  }

  if (!seller) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-seller-navy">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
          <SellerBrandLogo compact />
          <div className="hidden items-center gap-3 text-xs font-semibold tracking-wide text-slate-500 sm:flex">
            <span className="flex items-center gap-1.5 text-emerald-600">
              <Check className="h-3.5 w-3.5" />
              EMAIL &amp; PASSWORD
            </span>
            <span className="h-px w-8 bg-slate-300" />
            <span className="text-seller-primary">BUSINESS DETAILS</span>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="text-xs font-bold tracking-wide text-seller-primary hover:underline"
          >
            LOGOUT
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[240px_minmax(0,1fr)_220px] lg:px-6">
        <aside className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-seller-navy">
              Your onboarding completion status
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-seller-accent transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-2xl font-bold text-seller-accent">{progress}%</p>
          </div>

          <nav className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
            <ChecklistGroup
              title="Mobile & Email Verification"
              items={[
                { label: "Mobile", done: contactDone },
                { label: "Email", done: contactDone },
              ]}
            />
            <ChecklistGroup
              title="ID & Business Verification"
              items={[
                { label: "GST / PAN", done: idDone },
                { label: "Business details", done: storeDone },
              ]}
            />
            <ChecklistGroup
              title="Store & Pickup Details"
              items={[
                { label: "Display Name", done: displayNameDone },
                { label: "Shop Name", done: shopName.trim().length >= 2 },
                {
                  label: "Pickup Address",
                  done: pickupAddress.trim().length >= 8,
                },
              ]}
            />
            <ChecklistGroup
              title="Listing & Stock Availability"
              items={[
                { label: "Listing Created", done: false },
                { label: "Stock Added", done: false },
              ]}
              last
            />
          </nav>
        </aside>

        <main className="space-y-4">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-base font-bold text-seller-navy">
              Mobile &amp; Email Verification
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <VerifiedField
                label="Mobile Number"
                value={formatPhone(
                  seller.phone || phoneFromShopName(seller.shopName)
                )}
              />
              <VerifiedField label="Email ID" value={seller.email} />
            </div>
          </section>

          <form onSubmit={handleSubmit} className="space-y-4">
            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-base font-bold text-seller-navy">
                ID &amp; Business Verification
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose what you sell and add tax IDs to speed up approval.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <CategoryChip
                  active={categoryMode === "all"}
                  onClick={() => setCategoryMode("all")}
                  label="All Categories"
                />
                <CategoryChip
                  active={categoryMode === "books"}
                  onClick={() => setCategoryMode("books")}
                  label="Only Books"
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Input
                  label="GSTIN"
                  value={gstNumber}
                  onChange={(event) =>
                    setGstNumber(event.target.value.toUpperCase())
                  }
                  placeholder="Enter GSTIN"
                  maxLength={15}
                  hint="Optional for now — verify later if needed"
                />
                <Input
                  label="PAN"
                  value={panNumber}
                  onChange={(event) =>
                    setPanNumber(event.target.value.toUpperCase())
                  }
                  placeholder="Enter PAN"
                  maxLength={10}
                />
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-base font-bold text-seller-navy">
                Store &amp; Pickup Details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                These details appear on your seller account and storefront.
              </p>

              <div className="mt-4 space-y-3">
                <ErrorMessage message={formError || error || ""} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    label="First Name"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                      setFirstNameError("");
                    }}
                    placeholder="First name"
                    required
                    error={firstNameError}
                  />
                  <Input
                    label="Last Name"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                      setLastNameError("");
                    }}
                    placeholder="Last name"
                    required
                    error={lastNameError}
                  />
                </div>
                <Input
                  label="Display Name"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder={
                    seller.email.split("@")[0] || "How buyers see you"
                  }
                  required
                />
                <Input
                  label="Shop / Store Name"
                  value={shopName}
                  onChange={(event) => setShopName(event.target.value)}
                  placeholder="Your shop name"
                  required
                />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                    Store Description
                  </label>
                  <textarea
                    value={storeDescription}
                    onChange={(event) => setStoreDescription(event.target.value)}
                    rows={3}
                    placeholder="Tell buyers what makes your store special"
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-seller-navy placeholder:text-zinc-400 focus:border-seller-primary focus:outline-none focus:ring-2 focus:ring-seller-primary/15"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                    Pickup Address
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      value={pickupAddress}
                      onChange={(event) => setPickupAddress(event.target.value)}
                      placeholder="Search your pickup area or locality"
                      className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-seller-navy placeholder:text-zinc-400 focus:border-seller-primary focus:outline-none focus:ring-2 focus:ring-seller-primary/15"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500">
                    Saved with your profile in a later release. You can fill it
                    now for your records.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-5 rounded-lg bg-seller-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-seller-primary-hover disabled:opacity-60"
              >
                {isLoading ? "Saving..." : "Save and Continue"}
              </button>
            </section>
          </form>

          <section className="rounded-xl border border-dashed border-slate-300 bg-white p-5 opacity-80">
            <div className="flex items-start gap-3">
              <Package className="mt-0.5 h-5 w-5 text-seller-accent" />
              <div>
                <h2 className="text-base font-bold text-seller-navy">
                  Listing &amp; Stock Availability
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  After you save your store profile, you can create listings and
                  add stock from the seller dashboard.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled
                    className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-400"
                  >
                    Search existing products
                  </button>
                  <button
                    type="button"
                    disabled
                    className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-400"
                  >
                    List your own products
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <aside className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <button
              type="button"
              disabled
              className="w-full rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-400"
            >
              Go to Listing
            </button>
            <button
              type="button"
              disabled={!storeDone}
              onClick={() => {
                const form = document.querySelector("form");
                form?.requestSubmit();
              }}
              className="mt-2 w-full rounded-lg bg-seller-accent py-2.5 text-sm font-bold text-white hover:bg-seller-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              GO LIVE NOW
            </button>
            <p className="mt-2 text-xs text-slate-500">
              Complete store details to unlock go-live.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-seller-primary" />
              <div>
                <p className="text-sm font-semibold text-seller-navy">
                  Need GST help?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Keep your GSTIN and PAN ready. Verified tax details help us
                  approve your seller account faster.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-seller-tint p-4">
            <div className="flex items-start gap-2">
              <HelpCircle className="mt-0.5 h-5 w-5 text-seller-primary" />
              <div>
                <p className="text-sm font-semibold text-seller-navy">Help</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Stuck on this step? Finish first name, last name, display name,
                  and shop name first — then save to reach your dashboard.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ChecklistGroup({
  title,
  items,
  last = false,
}: {
  title: string;
  items: { label: string; done: boolean }[];
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "mb-4 border-b border-slate-100 pb-4"}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-slate-700">
            <StatusDot done={item.done} />
            <span className={item.done ? "text-slate-800" : "text-slate-500"}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VerifiedField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 px-3 py-3">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <div className="mt-1 flex items-center justify-between gap-2">
        <p className="truncate text-sm font-semibold text-seller-navy">{value}</p>
        <span className="shrink-0 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          Verified
        </span>
      </div>
    </div>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
        active
          ? "bg-seller-primary text-white"
          : "border border-slate-200 bg-white text-slate-600 hover:border-seller-primary hover:text-seller-primary"
      }`}
    >
      {label}
    </button>
  );
}
