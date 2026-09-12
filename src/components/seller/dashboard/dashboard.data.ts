import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Boxes,
  HelpCircle,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";

export type SellerNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const SELLER_NAV_ITEMS: SellerNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/dashboard/products", icon: Package },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Payouts", href: "/dashboard/payouts", icon: Wallet },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const SELLER_HELP_ITEM: SellerNavItem = {
  label: "Help & Support",
  href: "/dashboard/help",
  icon: HelpCircle,
};

export type DashboardMetric = {
  id: string;
  label: string;
  value: string;
  delta: string;
  tone: "blue" | "green" | "amber" | "violet";
  icon: LucideIcon;
};

export const DASHBOARD_METRICS: DashboardMetric[] = [
  {
    id: "products",
    label: "Total Products",
    value: "24",
    delta: "↑ 12% from last month",
    tone: "blue",
    icon: Boxes,
  },
  {
    id: "orders",
    label: "Total Orders",
    value: "56",
    delta: "↑ 18% from last month",
    tone: "green",
    icon: ShoppingCart,
  },
  {
    id: "sales",
    label: "Total Sales",
    value: "₹42,380",
    delta: "↑ 25% from last month",
    tone: "amber",
    icon: Wallet,
  },
  {
    id: "customers",
    label: "Total Customers",
    value: "38",
    delta: "↑ 16% from last month",
    tone: "violet",
    icon: Users,
  },
];

/** Sample sales points for the overview line chart (demo until analytics API). */
export const SALES_OVERVIEW_POINTS = [
  4200, 6100, 5400, 7800, 7200, 9100, 8800, 10400, 9600, 11200, 10800, 12500,
  11800, 13200, 12800, 14100, 13600, 15200, 14800, 16100, 15600, 17000, 16400,
  17800, 17200, 18500, 18000, 19200, 18800, 20100,
];

export const ORDER_STATUS_BREAKDOWN = [
  { label: "Delivered", value: 32, color: "#22c55e" },
  { label: "Processing", value: 12, color: "#3b82f6" },
  { label: "Shipped", value: 8, color: "#eab308" },
  { label: "Cancelled", value: 4, color: "#ef4444" },
] as const;

export type RecentOrderStatus =
  | "Delivered"
  | "Processing"
  | "Shipped"
  | "Cancelled";

export type RecentOrder = {
  id: string;
  customer: string;
  product: string;
  productImage: string;
  amount: string;
  status: RecentOrderStatus;
  date: string;
};

export const RECENT_ORDERS: RecentOrder[] = [
  {
    id: "#ORD-1042",
    customer: "Rahul Mehta",
    product: "Wireless Earbuds Pro",
    productImage:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=80&q=80",
    amount: "₹2,499",
    status: "Delivered",
    date: "12 Sep 2026",
  },
  {
    id: "#ORD-1041",
    customer: "Priya Sharma",
    product: "Cotton Kurta Set",
    productImage:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=80&q=80",
    amount: "₹1,899",
    status: "Processing",
    date: "12 Sep 2026",
  },
  {
    id: "#ORD-1040",
    customer: "Amit Kumar",
    product: "Smart Watch Band",
    productImage:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=80&q=80",
    amount: "₹999",
    status: "Shipped",
    date: "11 Sep 2026",
  },
  {
    id: "#ORD-1039",
    customer: "Neha Gupta",
    product: "Leather Wallet",
    productImage:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=80&q=80",
    amount: "₹1,299",
    status: "Delivered",
    date: "11 Sep 2026",
  },
  {
    id: "#ORD-1038",
    customer: "Vikram Singh",
    product: "Running Shoes",
    productImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=80&q=80",
    amount: "₹3,499",
    status: "Cancelled",
    date: "10 Sep 2026",
  },
];

export const STATUS_PILL: Record<RecentOrderStatus, string> = {
  Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Processing: "bg-sky-50 text-sky-700 ring-sky-200",
  Shipped: "bg-amber-50 text-amber-700 ring-amber-200",
  Cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
};

export const METRIC_TONE: Record<
  DashboardMetric["tone"],
  { wrap: string; icon: string }
> = {
  blue: { wrap: "bg-sky-50", icon: "bg-sky-100 text-sky-700" },
  green: { wrap: "bg-emerald-50", icon: "bg-emerald-100 text-emerald-700" },
  amber: { wrap: "bg-amber-50", icon: "bg-amber-100 text-amber-700" },
  violet: { wrap: "bg-indigo-50", icon: "bg-indigo-100 text-indigo-700" },
};
