"use client";

import { Eye, EyeOff } from "lucide-react";
import {
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useId,
  useState,
} from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  showPasswordToggle?: boolean;
  leftIcon?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required,
      error,
      hint,
      className = "",
      id,
      type,
      showPasswordToggle = false,
      leftIcon,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPasswordField = type === "password";
    const canTogglePassword = isPasswordField && showPasswordToggle;
    const inputType = canTogglePassword && isPasswordVisible ? "text" : type;

    const borderClass = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
      : "border-zinc-300";

    const inputClassName = [
      "w-full rounded-lg border bg-white py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/15",
      leftIcon ? "pl-10" : "px-3.5",
      canTogglePassword ? "pr-11" : leftIcon ? "pr-3.5" : "",
      borderClass,
      canTogglePassword ? "pr-11" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={inputClassName}
            {...props}
          />

          {canTogglePassword && (
            <button
              type="button"
              onClick={() => setIsPasswordVisible((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-700"
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
              {isPasswordVisible ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          )}
        </div>

        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-zinc-500">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
