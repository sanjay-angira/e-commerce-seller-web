import {
  BadgeCheck,
  Headset,
  IndianRupee,
  LineChart,
  Package,
  Shield,
  ShoppingBag,
  Store,
  Truck,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "badge-check": BadgeCheck,
  shield: Shield,
  headset: Headset,
  "trending-up": TrendingUp,
  users: Users,
  "indian-rupee": IndianRupee,
  truck: Truck,
  "user-plus": UserPlus,
  package: Package,
  store: Store,
  "line-chart": LineChart,
};

export function HomeIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? ShoppingBag;
  return <Icon className={className} strokeWidth={1.75} />;
}

export { ShoppingBag };
