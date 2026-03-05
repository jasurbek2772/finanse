const TABS = [
  { value: "today", label: "Сегодня" },
  { value: "week",  label: "Неделя"  },
  { value: "month", label: "Месяц"   },
  { value: "all",   label: "Всё"     },
];

export default function FilterTabs({ value, onChange }) {
  return (
    <div className="flex gap-2 bg-gray-900 border border-gray-800 rounded-xl p-1">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex-1 text-sm py-1.5 rounded-lg font-medium transition ${
            value === tab.value
              ? "bg-blue-600 text-white shadow"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
