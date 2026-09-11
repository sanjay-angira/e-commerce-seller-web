"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { Input } from "@/components/common/Input";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { selectSellerAuth } from "@/services/redux/selectors";
import { loginSeller } from "@/services/redux/slices/sellerSlices/sellerAuthSlice";
import { sellerHomePath } from "@/types/user";

function SellerLoginFormFields() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { isLoading, error } = useAppSelector(selectSellerAuth);
  const registered = searchParams.get("registered") === "1";
  const alreadyExists = searchParams.get("exists") === "1";
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [googleHint, setGoogleHint] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGoogleHint("");
    const result = await dispatch(loginSeller({ email: email.trim(), password }));
    if (loginSeller.fulfilled.match(result)) {
      window.location.href = sellerHomePath(result.payload.seller);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 ring-1 ring-slate-100">
      <h2 className="text-2xl font-bold text-[#12325c]">Seller Login</h2>
      <p className="mt-1 text-sm text-slate-500">
        Welcome back! Please login to continue.
      </p>

      {registered && (
        <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Account created. Login to fill your shop profile.
        </p>
      )}
      {alreadyExists && (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          This phone number is already a seller. Login with the email and
          password from that account.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <ErrorMessage message={error || googleHint} />

        <Input
          label="Email or Phone Number"
          name="email"
          autoComplete="username"
          placeholder="Enter your email or phone number"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          leftIcon={<Mail className="h-4 w-4" />}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          leftIcon={<Lock className="h-4 w-4" />}
          showPasswordToggle
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-[#2563eb]"
            />
            Remember me
          </label>
          <span className="font-medium text-[#2563eb]">Forgot Password?</span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-lg bg-[#2563eb] py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60"
        >
          {isLoading ? "Logging in..." : "Login to Seller Account"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs font-medium text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        OR
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        onClick={() => setGoogleHint("Google login is not available yet.")}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        <GoogleMark />
        Continue with Google
      </button>

      <p className="mt-5 text-center text-sm text-slate-600">
        New to Vrindavan Rasa?{" "}
        <Link href="/register" className="font-semibold text-[#2563eb]">
          Create a Seller Account
        </Link>
      </p>
    </div>
  );
}

export function SellerLoginForm() {
  return (
    <Suspense fallback={<div className="w-full max-w-md rounded-2xl bg-white p-8" />}>
      <SellerLoginFormFields />
    </Suspense>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.6-2.5-5.6-5.6S8.9 6.2 12 6.2c1.8 0 3 .7 3.7 1.4l2.5-2.4C16.7 3.8 14.6 3 12 3 7 3 3 7 3 12s4 9 9 9c5.2 0 8.6-3.6 8.6-8.7 0-.6 0-1-.1-1.5H12z"
      />
    </svg>
  );
}
