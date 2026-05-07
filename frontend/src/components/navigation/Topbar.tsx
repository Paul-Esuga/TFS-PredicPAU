const Topbar = () => {
  return (
    <header className="flex h-[74px] items-center justify-between border-b border-slate-200 bg-white px-7">
      <input
        type="text"
        placeholder="Search markets..."
        className="h-11 w-[360px] rounded-full border border-slate-200 bg-slate-50 px-5 text-sm text-slate-700 outline-none transition focus:border-blue-500"
      />

      <div className="flex items-center gap-5">
        <div className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-950">
          ₦103,450.00
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          P
        </div>
      </div>
    </header>
  );
};

export default Topbar;
