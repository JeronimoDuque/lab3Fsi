import React, { useState } from 'react';
import { Info, BarChart3 } from 'lucide-react';

export default function PipelineStageChart({ stages, deals }) {
  const [hoveredStage, setHoveredStage] = useState(null);

  // Ordenar etapas según display_order
  const sortedStages = [...stages].sort((a, b) => a.display_order - b.display_order);

  // Calcular suma dinámica de dinero y conteo de deals por etapa
  const stageData = sortedStages.map((stage) => {
    const dealsInStage = deals.filter((d) => d.stage_id === stage.id);
    const totalAmount = dealsInStage.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
    const count = dealsInStage.length;
    const avgAmount = count > 0 ? Math.round(totalAmount / count) : 0;

    return {
      ...stage,
      totalAmount,
      count,
      avgAmount
    };
  });

  const maxAmount = Math.max(...stageData.map((s) => s.totalAmount), 50000);
  const chartHeight = 220; // px

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#ecebe6] shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div>
          <div className="flex items-center space-x-1.5">
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
              Revenue by Pipeline Stage
            </h3>
            <span title="Ingresos acumulados agrupados por etapa del pipeline (calculado dinámicamente)">
              <Info className="w-3.5 h-3.5 text-neutral-400 cursor-pointer hover:text-neutral-600 transition-colors" />
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Distribución del valor monetario de las oportunidades en curso
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-semibold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-md">
            Total en Pipeline: €
            {stageData.reduce((sum, s) => sum + s.totalAmount, 0).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Main Bar Chart Container */}
      <div className="pt-6 pb-2">
        {/* Y-Axis Gridlines & Bars */}
        <div className="relative h-[220px] flex items-end justify-between px-2 sm:px-6">
          {/* Horizontal grid guide lines */}
          <div className="absolute inset-x-0 top-0 border-b border-dashed border-neutral-100">
            <span className="text-[10px] text-neutral-400 absolute -top-2.5 right-0">
              €{Math.round(maxAmount / 1000)}k
            </span>
          </div>
          <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-neutral-100">
            <span className="text-[10px] text-neutral-400 absolute -top-2.5 right-0">
              €{Math.round((maxAmount / 2) / 1000)}k
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 border-b border-neutral-200">
            <span className="text-[10px] text-neutral-400 absolute -bottom-4 right-0">€0</span>
          </div>

          {/* Render individual Stage Bars */}
          {stageData.map((stage) => {
            const heightPercent = maxAmount > 0 ? (stage.totalAmount / maxAmount) * 100 : 0;
            const isHovered = hoveredStage === stage.id;

            return (
              <div
                key={stage.id}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                className="relative flex-1 flex flex-col items-center justify-end h-full group mx-1.5 sm:mx-3 cursor-pointer z-10"
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <div className="absolute -top-16 bg-neutral-900 text-white px-2.5 py-1.5 rounded-lg shadow-xl text-center z-30 pointer-events-none transition-all duration-150 transform -translate-y-1">
                    <p className="text-[11px] font-bold text-white whitespace-nowrap">
                      {stage.name}: €{stage.totalAmount.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-neutral-300">
                      {stage.count} {stage.count === 1 ? 'deal' : 'deals'} · Prob: {stage.win_probability}%
                    </p>
                  </div>
                )}

                {/* Amount on top of bar */}
                <span className="text-[10px] font-semibold text-neutral-600 mb-1.5 group-hover:text-neutral-900 transition-colors">
                  €{Math.round(stage.totalAmount / 1000)}k
                </span>

                {/* The Bar */}
                <div
                  className="w-full max-w-[54px] rounded-t-xl transition-all duration-300 relative overflow-hidden group-hover:brightness-110 shadow-xs"
                  style={{
                    height: `${Math.max(heightPercent, 3)}%`,
                    backgroundColor: stage.color || '#ea580c'
                  }}
                >
                  {/* Subtle glass gloss effect */}
                  <div className="absolute inset-x-0 top-0 h-1/3 bg-white/20"></div>
                </div>

                {/* Stage Name on X-Axis */}
                <div className="mt-3 text-center">
                  <p className="text-xs font-semibold text-neutral-700 group-hover:text-neutral-900 transition-colors">
                    {stage.name}
                  </p>
                  <p className="text-[10px] text-neutral-400 font-medium">
                    {stage.count} deals
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer / Legend info */}
      <div className="pt-5 mt-2 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-3">
          <span className="text-[11px] text-neutral-400 font-medium">Etapas Clave:</span>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]"></span>
            <span className="text-[11px] text-neutral-600 font-medium">Negotiation (Coral)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
            <span className="text-[11px] text-neutral-600 font-medium">Closed Won (Verde)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]"></span>
            <span className="text-[11px] text-neutral-600 font-medium">Closed Lost (Rojo)</span>
          </div>
        </div>

        <span className="text-[11px] text-neutral-400 italic">
          Cálculo dinámico en tiempo real
        </span>
      </div>
    </div>
  );
}
