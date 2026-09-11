"use client";

import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEYS, getJson, tokenStorage } from "@/services/api/storage";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { selectSellerAuth } from "@/services/redux/selectors";
import {
  logoutSeller,
  setSellerCredentials,
} from "@/services/redux/slices/sellerSlices/sellerAuthSlice";
import { isSellerProfileComplete, type Seller } from "@/types/user";

export function useSellerAuth() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectSellerAuth);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      setIsHydrated(true);
      return;
    }

    const accessToken = tokenStorage.getSellerAccessToken();
    const storedSeller = getJson<Seller>(STORAGE_KEYS.sellerUser);

    if (accessToken && storedSeller) {
      tokenStorage.setSellerProfileComplete(isSellerProfileComplete(storedSeller));
      dispatch(
        setSellerCredentials({
          seller: storedSeller,
          accessToken,
        })
      );
    }

    setIsHydrated(true);
  }, [auth.isAuthenticated, dispatch]);

  const logout = useCallback(async () => {
    await dispatch(logoutSeller());
    window.location.href = "/login";
  }, [dispatch]);

  return { ...auth, isHydrated, logout };
}
