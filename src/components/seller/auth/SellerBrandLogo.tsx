import Image from "next/image";
import Link from "next/link";

export function SellerBrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="BazarBaazi home"
      className={
        compact
          ? "relative block h-7 w-32 shrink-0 sm:h-8 sm:w-36"
          : "relative block h-7 w-[min(8rem,calc(100vw-11rem))] shrink-0 sm:h-8 sm:w-36 md:h-9 md:w-44 lg:h-10 lg:w-52"
      }
    >
      <Image
        src="/logo.png"
        alt="BazarBaazi"
        fill
        sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
        className="object-contain object-left"
        priority
      />
    </Link>
  );
}
