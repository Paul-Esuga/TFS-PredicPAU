interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

const StatCard = ({ title, value, subtitle }: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-7 text-center shadow-sm">
      <p className="text-sm font-medium text-blue-900/70">{title}</p>
      <h3 className="mt-4 text-3xl font-semibold leading-none text-slate-950">
        {value}
      </h3>
      {subtitle ? (
        <p className="mt-3 text-sm text-blue-900/45">{subtitle}</p>
      ) : null}
    </div>
  );
};

export default StatCard;
