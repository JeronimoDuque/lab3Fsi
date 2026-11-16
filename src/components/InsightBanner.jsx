import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, X } from 'lucide-react';

export default function InsightBanner({ wonRevenue, activeDealsCount, winRate }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-3.5 px-4.5 flex items-center justify-between shadow-2xs transition-all duration-300">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-xl bg-[#059669] flex items-center justify-center text-white shadow-xs flex-shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs text-neutral-800 leading-snug">
            <span className="font-semibold text-emerald-900">
              Weekly Insight: Your sales velocity increased 14.8% compared to the previous period.
            </span>{" "}
            <span className="text-emerald-700 hidden sm:inline">
              Actualmente tienes {activeDealsCount} oportunidades activas y un Win Rate del {winRate}%.
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
        <button
          onClick={() => alert(`Resumen Ejecutivo:\n- Revenue Cerrado: €${wonRevenue.toLocaleString()}\n- Deals Abiertos: ${activeDealsCount}\n- Tasa de Éxito: ${winRate}%\nRecomendación: Acelerar tratos en etapa de Negociación.`)}
          className="flex items-center space-x-1 bg-white border border-[#86efac] hover:bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
        >
          <span>View Insight</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setVisible(false)}
          className="p-1 text-emerald-600 hover:text-emerald-900 hover:bg-emerald-100/60 rounded-md transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
