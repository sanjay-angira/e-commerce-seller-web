"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/common/Button";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { Input } from "@/components/common/Input";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { selectSellerAuth } from "@/services/redux/selectors";
import { loginSeller } from "@/services/redux/slices/sellerSlices/sellerAuthSlice";

export function SellerLoginForm() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(selectSellerAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await dispatch(loginSeller({ email, password }));
    if (loginSeller.fulfilled.match(result)) {
      window.location.href = "/dashboard";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ErrorMessage message={error ?? ""} />

      <Input
        label="Email address"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="seller@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
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
        showPasswordToggle
        required
      />

      <Button type="submit" fullWidth isLoading={isLoading}>
        Sign in
      </Button>
    </form>
  );
}
