"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { Check, Lock } from "lucide-react";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { Input } from "@/components/common/Input";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { selectSellerSignup } from "@/services/redux/selectors";
import {
  checkSellerEmail,
  checkSellerPhone,
  goToSignupStep,
  markEmailVerified,
  registerSeller,
  resetSignup,
  setSignupError,
  updateSignupField,
} from "@/services/redux/slices/sellerSlices/sellerSignupSlice";

const STEPS = ["Verify Phone", "Verify Email", "Shop Profile", "Complete"] as const;

export function SellerRegisterForm() {
  const dispatch = useAppDispatch();
  const form = useAppSelector(selectSellerSignup);

  function setField(
    field: "phone" | "otp" | "email" | "emailOtp" | "password" | "confirmPassword",
    value: string
  ) {
    dispatch(updateSignupField({ field, value }));
  }

  async function handlePhone(event: FormEvent) {
    event.preventDefault();
    const phone = form.phone.replace(/\s/g, "");
    if (!/^[0-9]{10}$/.test(phone)) {
      dispatch(setSignupError("Enter a valid 10-digit mobile number"));
      return;
    }
    if (!form.otpSent) {
      await dispatch(checkSellerPhone());
      return;
    }
    if (!/^[0-9]{6}$/.test(form.otp)) {
      dispatch(setSignupError("Enter the 6-digit OTP"));
      return;
    }
    dispatch(goToSignupStep(2));
  }

  async function handleEmail(event: FormEvent) {
    event.preventDefault();
    if (!form.emailVerified) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        dispatch(setSignupError("Enter a valid email address"));
        return;
      }
      if (!form.emailOtpSent) {
        await dispatch(checkSellerEmail());
        return;
      }
      if (!/^[0-9]{6}$/.test(form.emailOtp)) {
        dispatch(setSignupError("Enter the 6-digit email OTP"));
        return;
      }
      dispatch(markEmailVerified());
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

    const email = form.email.trim();
    const result = await dispatch(registerSeller());
    if (registerSeller.fulfilled.match(result)) {
      dispatch(resetSignup());
      window.location.href = `/login?registered=1&email=${encodeURIComponent(email)}`;
      return;
    }
    const message = registerSeller.rejected.match(result)
      ? String(result.payload ?? "")
      : "";
    if (/already registered as a seller|already has a seller profile/i.test(message)) {
      dispatch(resetSignup());
      window.location.href = `/login?exists=1&email=${encodeURIComponent(email)}`;
    }
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
            {form.error?.toLowerCase().includes("already registered as a seller") && (
              <p className="text-sm text-slate-600">
                <Link href="/login" className="font-semibold text-[#2563eb]">
                  Login
                </Link>{" "}
                with this number instead.
              </p>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Phone Number
              </label>
              <div className="flex overflow-hidden rounded-lg border border-zinc-300 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/15">
                <span
                  className="flex items-center gap-2 border-r border-zinc-200 bg-slate-50 px-3"
                  aria-label="India country code +91"
                >
                  <IndiaFlag />
                  <span className="text-sm font-semibold text-slate-800">+91</span>
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
              disabled={form.isLoading}
              className="w-full rounded-lg bg-[#2563eb] py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60"
            >
              {form.isLoading
                ? "Checking..."
                : form.otpSent
                  ? "Verify OTP"
                  : "Send OTP"}
            </button>
          </form>
        )}

        {form.step === 2 && (
          <form onSubmit={handleEmail} className="space-y-4">
            <p className="text-xs font-semibold text-[#2563eb]">Step 2 of 4</p>
            <h3 className="text-base font-bold text-[#12325c]">
              {form.emailVerified ? "Set Password" : "Verify Your Email"}
            </h3>
            <p className="text-sm text-slate-500">
              {form.emailVerified
                ? "Create a password for your seller account, then login to continue."
                : form.emailOtpSent
                  ? "Enter the 6-digit OTP sent to your email."
                  : "Enter your email. We'll send a 6-digit OTP to verify it."}
            </p>
            <ErrorMessage message={form.error ?? ""} />
            {form.error?.toLowerCase().includes("already registered as a seller") && (
              <p className="text-sm text-slate-600">
                <Link href={`/login?email=${encodeURIComponent(form.email.trim())}&exists=1`} className="font-semibold text-[#2563eb]">
                  Login
                </Link>{" "}
                with this email instead.
              </p>
            )}
            {!form.emailVerified && (
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(event) => setField("email", event.target.value)}
                placeholder="seller@example.com"
                required
              />
            )}
            {form.emailOtpSent && !form.emailVerified && (
              <Input
                label="Email OTP"
                value={form.emailOtp}
                onChange={(event) => setField("emailOtp", event.target.value)}
                placeholder="Enter 6-digit OTP"
                inputMode="numeric"
                required
              />
            )}
            {form.emailVerified && (
              <>
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
                  onChange={(event) =>
                    setField("confirmPassword", event.target.value)
                  }
                  leftIcon={<Lock className="h-4 w-4" />}
                  showPasswordToggle
                  required
                />
              </>
            )}
            <button
              type="submit"
              disabled={form.isLoading}
              className="w-full rounded-lg bg-[#2563eb] py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60"
            >
              {!form.emailOtpSent
                ? form.isLoading
                  ? "Checking..."
                  : "Verify Email"
                : !form.emailVerified
                  ? "Verify OTP"
                  : form.isLoading
                    ? "Creating account..."
                    : "Set Password"}
            </button>
          </form>
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

function IndiaFlag() {
  return (
    <svg
      viewBox="0 0 30 20"
      className="h-4 w-6 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10"
      aria-hidden="true"
    >
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6.67" fill="#FF9933" />
      <rect y="13.33" width="30" height="6.67" fill="#138808" />
      <circle cx="15" cy="10" r="2.4" fill="none" stroke="#000080" strokeWidth="0.7" />
      <circle cx="15" cy="10" r="0.45" fill="#000080" />
      {Array.from({ length: 12 }, (_, index) => {
        const angle = (index * Math.PI) / 6;
        return (
          <line
            key={index}
            x1="15"
            y1="10"
            x2={15 + Math.cos(angle) * 2.2}
            y2={10 + Math.sin(angle) * 2.2}
            stroke="#000080"
            strokeWidth="0.35"
          />
        );
      })}
    </svg>
  );
}
