"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Check, Lock } from "lucide-react";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { Input } from "@/components/common/Input";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { selectSellerAuth } from "@/services/redux/selectors";
import { completeSellerProfile } from "@/services/redux/slices/sellerSlices/sellerAuthSlice";
import { useSellerAuth } from "@/services/seller/useSellerAuth";

const STEPS = ["Verify Phone", "Verify Email", "Shop Profile", "Complete"] as const;

export function SellerOnboardingForm() {
  const dispatch = useAppDispatch();
  const { seller, isHydrated, logout } = useSellerAuth();
  const { isLoading, error } = useAppSelector(selectSellerAuth);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [shopName, setShopName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!seller) return;
    setFirstName((value) => value || seller.firstName || "");
    setLastName((value) => value || seller.lastName || "");
    setUsername((value) => value || seller.email.split("@")[0] || "");
    setShopName((value) => {
      if (value) return value;
      if (!seller.shopName || seller.shopName.toLowerCase().startsWith("pending shop")) {
        return "";
      }
      return seller.shopName;
    });
  }, [seller]);

  const displayNamePlaceholder = useMemo(() => {
    const fullName = `${firstName} ${lastName}`.trim();
    return fullName || "your-shop-name";
  }, [firstName, lastName]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError("");

    if (firstName.trim().length < 2 || lastName.trim().length < 1) {
      setFormError("Enter your first and last name");
      return;
    }
    if (username.trim().length < 3) {
      setFormError("Enter a username of at least 3 characters");
      return;
    }
    if (shopName.trim().length < 2) {
      setFormError("Enter your shop name");
      return;
    }

    const result = await dispatch(
      completeSellerProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        displayName: username.trim(),
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
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-sm text-slate-500 ring-1 ring-slate-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 ring-1 ring-slate-100">
      <h2 className="text-2xl font-bold text-seller-navy">Complete Your Shop Profile</h2>
      <p className="mt-1 text-sm text-slate-500">
        Add your name and business details to start selling.
      </p>

      <ol className="mt-6 grid grid-cols-4 gap-2 text-center text-[11px] font-medium text-slate-400">
        {STEPS.map((label, index) => {
          const step = index + 1;
          const active = step === 3;
          const done = step < 3;
          return (
            <li key={label} className="flex flex-col items-center gap-1">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                  active || done
                    ? "bg-seller-accent text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : step}
              </span>
              <span className={active ? "text-seller-accent" : ""}>{label}</span>
            </li>
          );
        })}
      </ol>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4 rounded-xl border border-slate-100 p-4">
        <p className="text-xs font-semibold text-seller-accent">Step 3 of 4</p>
        <h3 className="text-base font-bold text-seller-navy">Shop Profile</h3>
        <p className="text-sm text-slate-500">
          These details are shown on your seller account and shop.
        </p>
        <ErrorMessage message={formError || error || ""} />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="First name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
          <Input
            label="Last name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </div>
        <Input
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder={displayNamePlaceholder}
          required
        />
        <Input
          label="Shop name"
          value={shopName}
          onChange={(event) => setShopName(event.target.value)}
          required
        />
        <Input
          label="GST number"
          value={gstNumber}
          onChange={(event) => setGstNumber(event.target.value.toUpperCase())}
          placeholder="Optional"
        />
        <Input
          label="PAN number"
          value={panNumber}
          onChange={(event) => setPanNumber(event.target.value.toUpperCase())}
          placeholder="Optional"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-seller-accent py-2.5 text-sm font-semibold text-white hover:bg-seller-accent-hover disabled:opacity-60"
        >
          {isLoading ? "Saving..." : "Save and Continue"}
        </button>
      </form>

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-seller-tint px-3 py-3 text-xs text-slate-600">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-seller-primary" />
        Your information is safe with us. We use industry-standard encryption to
        protect your data.
      </div>

      <p className="mt-5 text-center text-sm text-slate-600">
        <button
          type="button"
          onClick={() => void logout()}
          className="font-semibold text-seller-primary"
        >
          Sign out
        </button>
      </p>
    </div>
  );
}
