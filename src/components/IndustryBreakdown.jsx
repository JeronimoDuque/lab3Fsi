import React from 'react';
import { Info, ChevronRight, Zap } from 'lucide-react';

export default function IndustryBreakdown({ customers, deals }) {
  // Mapear la industria de cada cliente
  const customerMap = {};
  customers.forEach((c) => {
    customerMap[c.id] = c;
  });

  // Agrupar tratos por industria
  const industryTotals = {};
  let totalPipelineAmount = 0;

  deals.forEach((d) => {
    const cust = customerMap[d.customer_id];
    const ind = cust ? cust.industry : "Otros";
    const amt = Number(d.amount) || 0;
    industryTotals[ind] = (industryTotals[ind] || 0) + amt;
    totalPipelineAmount += amt;
  });

  const colorPalette = [
    "#818cf8", // Indigo pastel
    "#38bdf8", // Sky blue
    "#34d399", // Emerald pastel
    "#fbbf24", // Amber pastel
    "#f472b6", // Pink pastel
    "#a78bfa", // Purple pastel
    "#94a3b8"  // Slate
  ];

  const sortedIndustries = Object.entries(industryTotals)
    .map(([industry, amount], idx) => ({
      industry,
      amount,
      pct: totalPipelineAmount > 0 ? Math.round((amount / totalPipelineAmount) * 100) : 0,
      color: colorPalette[idx % colorPalette.length]
    }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#ecebe6] shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <div className="flex items-center space-x-1.5">
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
              Pipeline Composition by Industry
            </h3>
            <span title="Desglose porcentual del volumen de negocio por sector de clientes">
              <Info className="w-3.5 h-3.5 text-neutral-400 cursor-pointer hover:text-neutral-600 transition-colors" />
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Distribución de volumen de ventas según sector B2B
          </p>
        </div>

        <button className="flex items-center space-x-1 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors">
          <span>View all</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Progress Bars List */}
      <div className="space-y-3.5 my-3">
        {sortedIndustries.slice(0, 5).map((item) => (
          <div key={item.industry} className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2 w-40 truncate">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-xs font-medium text-neutral-700 truncate">
                {item.industry}
              </span>
            </div>

            {/* Pill Progress Bar */}
            <div className="flex-1 h-2.5 bg-neutral-100 rounded-full overflow-hidden flex items-center">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.max(item.pct, 4)}%`,
                  backgroundColor: item.color
                }}
              ></div>
            </div>

            <div className="w-12 text-right">
              <span className="text-xs font-bold text-neutral-800">{item.pct}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Alert / Latest closed Deal Note */}
      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between bg-neutral-50/80 -mx-2 px-3 py-2 rounded-xl">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-neutral-900">Último trato cerrado</p>
            <p className="text-[10px] text-neutral-500">TechSolutions SL · €32.000 Won</p>
          </div>
        </div>
        <span className="text-[10px] text-neutral-400 font-medium">hace 2h</span>
      </div>
    </div>
  );
}
