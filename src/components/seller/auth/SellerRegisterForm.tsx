"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { Check, Lock } from "lucide-react";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { Input } from "@/components/common/Input";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { selectSellerSignup } from "@/services/redux/selectors";
import {
  goToSignupStep,
  markOtpSent,
  registerSeller,
  setSignupError,
  updateSignupField,
} from "@/services/redux/slices/sellerSlices/sellerSignupSlice";

const STEPS = ["Verify Phone", "Verify Email", "Set Password", "Complete"] as const;

export function SellerRegisterForm() {
  const dispatch = useAppDispatch();
  const form = useAppSelector(selectSellerSignup);

  function setField(
    field:
      | "phone"
      | "otp"
      | "email"
      | "password"
      | "confirmPassword"
      | "firstName"
      | "lastName"
      | "shopName",
    value: string
  ) {
    dispatch(updateSignupField({ field, value }));
  }

  function handlePhone(event: FormEvent) {
    event.preventDefault();
    const phone = form.phone.replace(/\s/g, "");
    if (!/^[0-9]{10}$/.test(phone)) {
      dispatch(setSignupError("Enter a valid 10-digit mobile number"));
      return;
    }
    if (!form.otpSent) {
      dispatch(markOtpSent());
      return;
    }
    if (!/^[0-9]{6}$/.test(form.otp)) {
      dispatch(setSignupError("Enter the 6-digit OTP"));
      return;
    }
    dispatch(goToSignupStep(2));
  }

  function handleEmail(event: FormEvent) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      dispatch(setSignupError("Enter a valid email address"));
      return;
    }
    dispatch(goToSignupStep(3));
  }

  async function handlePassword(event: FormEvent) {
    event.preventDefault();
    if (form.firstName.trim().length < 2 || form.lastName.trim().length < 1) {
      dispatch(setSignupError("Enter your first and last name"));
      return;
    }
    if (form.shopName.trim().length < 2) {
      dispatch(setSignupError("Enter your shop name"));
      return;
    }
    if (form.password.length < 6) {
      dispatch(setSignupError("Password must be at least 6 characters"));
      return;
    }
    if (form.password !== form.confirmPassword) {
      dispatch(setSignupError("Passwords do not match"));
      return;
    }
    await dispatch(registerSeller());
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 ring-1 ring-slate-100">
      <h2 className="text-2xl font-bold text-[#12325c]">Create Your Seller Account</h2>
      <p className="mt-1 text-sm text-slate-500">
        It&apos;s quick and easy. Follow the steps to get started.
      </p>

      <ol className="mt-6 grid grid-cols-4 gap-2 text-center text-[11px] font-medium text-slate-400">
        {STEPS.map((label, index) => {
          const step = (index + 1) as 1 | 2 | 3 | 4;
          const active = form.step === step;
          const done = form.step > step;
          return (
            <li key={label} className="flex flex-col items-center gap-1">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                  active || done
                    ? "bg-[#2563eb] text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : step}
              </span>
              <span className={active ? "text-[#2563eb]" : ""}>{label}</span>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 rounded-xl border border-slate-100 p-4">
        {form.step === 1 && (
          <form onSubmit={handlePhone} className="space-y-4">
            <p className="text-xs font-semibold text-[#2563eb]">Step 1 of 4</p>
            <h3 className="text-base font-bold text-[#12325c]">
              Verify Your Phone Number
            </h3>
            <p className="text-sm text-slate-500">
              Enter your mobile number. We&apos;ll send you a 6-digit OTP to verify.
            </p>
            <ErrorMessage message={form.error ?? ""} />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Phone Number
              </label>
              <div className="flex overflow-hidden rounded-lg border border-zinc-300 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/15">
                <span className="flex items-center gap-1 border-r border-zinc-200 bg-slate-50 px-3 text-sm text-slate-600">
                  🇮🇳 +91
                </span>
                <input
                  value={form.phone}
                  onChange={(event) => setField("phone", event.target.value)}
                  placeholder="98765 43210"
                  inputMode="numeric"
                  className="w-full bg-white px-3 py-2.5 text-sm outline-none"
                  required
                />
              </div>
            </div>
            {form.otpSent && (
              <Input
                label="OTP"
                value={form.otp}
                onChange={(event) => setField("otp", event.target.value)}
                placeholder="Enter 6-digit OTP"
                inputMode="numeric"
                required
              />
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#2563eb] py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
            >
              {form.otpSent ? "Verify OTP" : "Send OTP"}
            </button>
          </form>
        )}

        {form.step === 2 && (
          <form onSubmit={handleEmail} className="space-y-4">
            <p className="text-xs font-semibold text-[#2563eb]">Step 2 of 4</p>
            <h3 className="text-base font-bold text-[#12325c]">Verify Your Email</h3>
            <p className="text-sm text-slate-500">
              Enter the email you will use to manage your seller account.
            </p>
            <ErrorMessage message={form.error ?? ""} />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(event) => setField("email", event.target.value)}
              placeholder="seller@example.com"
              required
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-[#2563eb] py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
            >
              Continue
            </button>
          </form>
        )}

        {form.step === 3 && (
          <form onSubmit={handlePassword} className="space-y-4">
            <p className="text-xs font-semibold text-[#2563eb]">Step 3 of 4</p>
            <h3 className="text-base font-bold text-[#12325c]">Set Password</h3>
            <p className="text-sm text-slate-500">
              Create your shop profile and a password for your seller account.
            </p>
            <ErrorMessage message={form.error ?? ""} />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First name"
                value={form.firstName}
                onChange={(event) => setField("firstName", event.target.value)}
                required
              />
              <Input
                label="Last name"
                value={form.lastName}
                onChange={(event) => setField("lastName", event.target.value)}
                required
              />
            </div>
            <Input
              label="Shop name"
              value={form.shopName}
              onChange={(event) => setField("shopName", event.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(event) => setField("password", event.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              showPasswordToggle
              required
            />
            <Input
              label="Confirm password"
              type="password"
              value={form.confirmPassword}
              onChange={(event) => setField("confirmPassword", event.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              showPasswordToggle
              required
            />
            <button
              type="submit"
              disabled={form.isLoading}
              className="w-full rounded-lg bg-[#2563eb] py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60"
            >
              {form.isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}

        {form.step === 4 && (
          <div className="space-y-4 text-center">
            <p className="text-xs font-semibold text-[#2563eb]">Step 4 of 4</p>
            <h3 className="text-base font-bold text-[#12325c]">Account created</h3>
            <p className="text-sm text-slate-500">
              {form.successMessage ||
                "Seller registered. Waiting for admin approval."}
            </p>
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#2563eb] py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 px-3 py-3 text-xs text-slate-600">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" />
        Your information is safe with us. We use industry-standard encryption to
        protect your data.
      </div>

      <p className="mt-5 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#2563eb]">
          Login
        </Link>
      </p>
    </div>
  );
}
