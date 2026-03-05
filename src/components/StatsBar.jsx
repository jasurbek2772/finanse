export default function StatsBar({ stats }) {
  const income   = stats.income   || 0;
  const expenses = Math.abs(stats.expenses || 0);
  const balance  = stats.balance  || 0;
  const isPositive = balance >= 0;

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
        <p className="text-xs text-gray-500 mb-1">Доходы</p>
        <p className="text-base font-bold text-emerald-400">
          +{income.toLocaleString("ru-RU")} ₽
        </p>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
        <p className="text-xs text-gray-500 mb-1">Расходы</p>
        <p className="text-base font-bold text-rose-400">
          -{expenses.toLocaleString("ru-RU")} ₽
        </p>
      </div>
      <div className={`border rounded-xl p-3 text-center ${isPositive ? "bg-emerald-950 border-emerald-800" : "bg-rose-950 border-rose-900"}`}>
        <p className="text-xs text-gray-400 mb-1">Баланс</p>
        <p className={`text-base font-bold ${isPositive ? "text-emerald-300" : "text-rose-300"}`}>
          {isPositive ? "+" : ""}{balance.toLocaleString("ru-RU")} ₽
        </p>
      </div>
    </div>
  );
}
