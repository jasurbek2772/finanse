import { useState } from "react";

const CATEGORIES = [
  "зарплата", "фриланс", "подарок", "дивиденды",
  "еда", "бензин", "транспорт", "покупки",
  "развлечения", "коммуналка", "здоровье", "другое",
];

const today = () => new Date().toISOString().slice(0, 10);

export default function AddModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    date:     today(),
    amount:   "",
    category: "другое",
    comment:  "",
    type:     "expense",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    const amount = parseFloat(form.amount);
    if (!amount || isNaN(amount)) return alert("Введите корректную сумму");
    const signed = form.type === "expense" ? -Math.abs(amount) : Math.abs(amount);
    onSave({ date: form.date, amount: signed, category: form.category, comment: form.comment });
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-2">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Новая запись</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl leading-none">×</button>
        </div>

        {/* Type toggle */}
        <div className="flex gap-2">
          {["expense", "income"].map((t) => (
            <button
              key={t}
              onClick={() => set("type", t)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                form.type === t
                  ? t === "expense" ? "bg-rose-700 text-white" : "bg-emerald-700 text-white"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              {t === "expense" ? "❤️ Расход" : "💚 Доход"}
            </button>
          ))}
        </div>

        {/* Date */}
        <div>
          <label className="text-xs text-gray-400 block mb-1">Дата</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="text-xs text-gray-400 block mb-1">Сумма (₽)</label>
          <input
            type="number"
            placeholder="500"
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-xs text-gray-400 block mb-1">Категория</label>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="text-xs text-gray-400 block mb-1">Комментарий (необязательно)</label>
          <input
            type="text"
            placeholder="Заправка на трассе"
            value={form.comment}
            onChange={(e) => set("comment", e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl transition"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
