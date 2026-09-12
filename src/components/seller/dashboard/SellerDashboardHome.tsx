"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Plus } from "lucide-react";
import {
  DASHBOARD_METRICS,
  METRIC_TONE,
  ORDER_STATUS_BREAKDOWN,
  RECENT_ORDERS,
  SALES_OVERVIEW_POINTS,
  STATUS_PILL,
} from "@/components/seller/dashboard/dashboard.data";

export function SellerDashboardHome() {
  const totalOrders = ORDER_STATUS_BREAKDOWN.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-seller-navy sm:text-3xl">
            Seller Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Welcome back! Here&apos;s what&apos;s happening with your store
            today.
          </p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-seller-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-seller-primary-hover"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_METRICS.map((metric) => {
          const Icon = metric.icon;
          const tone = METRIC_TONE[metric.tone];
          return (
            <div
              key={metric.id}
              className={`rounded-2xl ${tone.wrap} p-4 ring-1 ring-black/5`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-seller-navy">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-xs font-medium text-emerald-600">
                    {metric.delta}
                  </p>
                </div>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.icon}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-bold text-seller-navy">
              Sales Overview
            </h2>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              This Month
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-4">
            <SalesLineChart values={SALES_OVERVIEW_POINTS} />
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <h2 className="text-base font-bold text-seller-navy">Order Status</h2>
          <div className="mt-4 flex flex-col items-center">
            <OrderStatusDonut
              segments={[...ORDER_STATUS_BREAKDOWN]}
              total={totalOrders}
            />
            <ul className="mt-5 w-full space-y-2.5">
              {ORDER_STATUS_BREAKDOWN.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2 text-slate-600">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.label}
                  </span>
                  <span className="font-semibold text-seller-navy">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-bold text-seller-navy">Recent Orders</h2>
          <Link
            href="/dashboard/orders"
            className="text-sm font-semibold text-seller-primary hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">#</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/70">
                  <td className="whitespace-nowrap px-5 py-3 font-medium text-seller-navy">
                    {order.id}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-slate-700">
                    {order.customer}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <Image
                          src={order.productImage}
                          alt=""
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="36px"
                        />
                      </span>
                      <span className="font-medium text-seller-navy">
                        {order.product}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 font-semibold text-seller-navy">
                    {order.amount}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${STATUS_PILL[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-slate-500">
                    {order.date}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    <button
                      type="button"
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-seller-primary hover:bg-seller-tint"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function SalesLineChart({ values }: { values: number[] }) {
  const width = 640;
  const height = 220;
  const padX = 12;
  const padY = 16;
  const max = Math.max(...values, 1);
  const min = 0;
  const points = values.map((value, index) => {
    const x =
      padX + (index / Math.max(values.length - 1, 1)) * (width - padX * 2);
    const y =
      height -
      padY -
      ((value - min) / (max - min)) * (height - padY * 2);
    return `${x},${y}`;
  });
  const areaPoints = [
    `${padX},${height - padY}`,
    ...points,
    `${width - padX},${height - padY}`,
  ].join(" ");

  const labels = ["Sep 1", "Sep 8", "Sep 15", "Sep 22", "Sep 30"];

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-52 w-full"
        role="img"
        aria-label="Sales overview line chart for this month"
      >
        {[0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = height - padY - ratio * (height - padY * 2);
          return (
            <line
              key={ratio}
              x1={padX}
              y1={y}
              x2={width - padX}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          );
        })}
        <polygon points={areaPoints} fill="rgba(0, 48, 104, 0.08)" />
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke="#003068"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-1 flex justify-between px-1 text-[11px] text-slate-400">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function OrderStatusDonut({
  segments,
  total,
}: {
  segments: { label: string; value: number; color: string }[];
  total: number;
}) {
  const radius = 54;
  const stroke = 16;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={stroke}
        />
        {segments.map((segment) => {
          const length = (segment.value / total) * circumference;
          const circle = (
            <circle
              key={segment.label}
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={stroke}
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += length;
          return circle;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-2xl font-bold text-seller-navy">{total}</p>
        <p className="text-xs font-medium text-slate-500">Orders</p>
      </div>
    </div>
  );
}
