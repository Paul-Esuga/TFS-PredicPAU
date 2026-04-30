const Topbar = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <input
        type="text"
        placeholder="Search markets..."
        className="w-80 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-blue-500"
      />

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">
          ₦103,450.00
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          P
        </div>
      </div>
    </header>
  );
};

export default Topbar;
