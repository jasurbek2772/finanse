import { useState, useEffect, useCallback } from "react";
import TransactionTable from "./components/TransactionTable";
import StatsBar from "./components/StatsBar";
import FilterTabs from "./components/FilterTabs";
import AddModal from "./components/AddModal";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

function getUserId() {
  // Try Telegram WebApp
  if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
    return window.Telegram.WebApp.initDataUnsafe.user.id;
  }
  // Fallback: URL param ?user_id=...
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("user_id") || "0", 10);
}

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats]               = useState(null);
  const [period, setPeriod]             = useState("month");
  const [loading, setLoading]           = useState(false);
  const [showAdd, setShowAdd]           = useState(false);
  const userId = getUserId();

  const fetchTransactions = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE}/transactions?user_id=${userId}&period=${period}`);
      const data = await res.json();
      setTransactions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [userId, period]);

  const fetchStats = useCallback(async () => {
    if (!userId) return;
    try {
      const res  = await fetch(`${API_BASE}/stats?user_id=${userId}`);
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error(e);
    }
  }, [userId]);

  useEffect(() => {
    // Expand Telegram WebApp
    window.Telegram?.WebApp?.expand?.();
    fetchTransactions();
    fetchStats();
  }, [fetchTransactions, fetchStats]);

  const handleAdd = async (tx) => {
    await fetch(`${API_BASE}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...tx, user_id: userId }),
    });
    setShowAdd(false);
    fetchTransactions();
    fetchStats();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-lg font-bold text-white">💰 Финансы</h1>
          {userId > 0 && <p className="text-xs text-gray-500">ID: {userId}</p>}
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition"
        >
          + Добавить
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-3 py-4 space-y-4">
        {/* Stats */}
        {stats && <StatsBar stats={stats} />}

        {/* Filter */}
        <FilterTabs value={period} onChange={setPeriod} />

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-gray-500 text-sm">Загрузка...</div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12 text-gray-600 text-sm">
            Нет записей за выбранный период
          </div>
        ) : (
          <TransactionTable transactions={transactions} />
        )}
      </main>

      {/* Add modal */}
      {showAdd && (
        <AddModal onClose={() => setShowAdd(false)} onSave={handleAdd} />
      )}
    </div>
  );
}
