export default function TransactionTable({ transactions }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 bg-gray-900">
      {/* Desktop header */}
      <div className="hidden sm:grid grid-cols-4 gap-2 px-4 py-2 bg-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wide">
        <span>Дата</span>
        <span className="text-right">Сумма</span>
        <span>Категория</span>
        <span>Комментарий</span>
      </div>

      <div className="divide-y divide-gray-800">
        {transactions.map((tx) => {
          const isIncome = tx.amount > 0;
          const amountClass = isIncome ? "text-emerald-400" : "text-rose-400";
          const sign        = isIncome ? "+" : "";

          return (
            <div
              key={tx.id}
              className="px-4 py-3 hover:bg-gray-800/50 transition grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 items-center"
            >
              {/* Date */}
              <span className="text-xs text-gray-400 font-mono">{tx.date}</span>

              {/* Amount */}
              <span className={`text-sm font-bold text-right ${amountClass}`}>
                {sign}{Number(tx.amount).toLocaleString("ru-RU")} ₽
              </span>

              {/* Category */}
              <span className="col-span-2 sm:col-span-1 text-xs">
                <span className="inline-block bg-gray-700 text-gray-300 rounded-full px-2 py-0.5 mt-0.5 sm:mt-0">
                  {tx.category}
                </span>
              </span>

              {/* Comment */}
              <span className="col-span-2 sm:col-span-1 text-xs text-gray-500 truncate">
                {tx.comment || "—"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-2 bg-gray-800/30 text-xs text-gray-600 text-right">
        Записей: {transactions.length}
      </div>
    </div>
  );
}
