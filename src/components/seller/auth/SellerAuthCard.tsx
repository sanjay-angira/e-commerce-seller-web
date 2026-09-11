type SellerAuthCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function SellerAuthCard({
  title,
  subtitle,
  children,
}: SellerAuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-seller-muted px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-seller-accent">
            Seller Panel
          </p>
          <p className="mt-1 text-xl font-bold text-seller-navy">Vrindavan Rasa</p>
        </div>

        <div className="rounded-2xl border border-seller-border bg-white p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
