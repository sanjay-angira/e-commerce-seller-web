type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function DashboardPlaceholder({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="rounded-2xl bg-white p-8 ring-1 ring-slate-200">
      <h1 className="text-2xl font-bold text-seller-navy">{title}</h1>
      <p className="mt-2 max-w-xl text-sm text-slate-500">{description}</p>
      <p className="mt-6 rounded-xl bg-seller-tint px-4 py-3 text-sm text-seller-primary">
        This section is ready in the navigation. Connect the seller APIs next to
        load live data here.
      </p>
    </div>
  );
}
