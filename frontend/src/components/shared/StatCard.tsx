interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

const StatCard = ({ title, value, subtitle }: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="mt-2 text-2xl font-semibold text-slate-900">{value}</h3>
      {subtitle ? (
        <p className="mt-2 text-xs text-slate-400">{subtitle}</p>
      ) : null}
    </div>
  );
};

export default StatCard;
