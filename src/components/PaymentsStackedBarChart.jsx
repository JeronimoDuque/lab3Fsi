import React, { useState } from 'react';
import { CreditCard, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { weeklyPaymentTrends } from '../mockData.js';

export default function PaymentsStackedBarChart() {
  const [hoveredDay, setHoveredDay] = useState(null);

  const maxTotal = Math.max(...weeklyPaymentTrends.map(d => d.approvedFirst + d.approvedRetry + d.rejected), 300);

  // Totales acumulados de la semana
  const totalApprovedFirst = weeklyPaymentTrends.reduce((s, d) => s + d.approvedFirst, 0);
  const totalApprovedRetry = weeklyPaymentTrends.reduce((s, d) => s + d.approvedRetry, 0);
  const totalRejected = weeklyPaymentTrends.reduce((s, d) => s + d.rejected, 0);
  const grandTotal = totalApprovedFirst + totalApprovedRetry + totalRejected;

  const rejectionRate = ((totalRejected / grandTotal) * 100).toFixed(1);
  const recoveryShare = (((totalApprovedRetry) / (totalApprovedRetry + totalRejected)) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#ecebe6] shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <div className="flex items-center space-x-1.5">
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
              Desempeño de Pasarela de Pagos (Barras Apiladas)
            </h3>
            <span className="text-[10px] font-bold bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded">
              Semanal
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Aprobados 1er intento vs. Recuperados por Reintento vs. Rechazados
          </p>
        </div>

        <div className="flex items-center space-x-3 text-right">
          <div>
            <span className="text-[10px] text-neutral-400 block font-medium">Tasa de Rechazo</span>
            <span className="text-xs font-bold text-rose-600">{rejectionRate}%</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 block font-medium">Recuperados</span>
            <span className="text-xs font-bold text-indigo-600">+{totalApprovedRetry} tx</span>
          </div>
        </div>
      </div>

      {/* Main Stacked Bar Chart */}
      <div className="pt-6 pb-2">
        <div className="relative h-[210px] flex items-end justify-between px-3 sm:px-6">
          {/* Horizontal grid guide lines */}
          <div className="absolute inset-x-0 top-0 border-b border-dashed border-neutral-100">
            <span className="text-[10px] text-neutral-400 absolute -top-2.5 right-0">{maxTotal} tx</span>
          </div>
          <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-neutral-100">
            <span className="text-[10px] text-neutral-400 absolute -top-2.5 right-0">{Math.round(maxTotal / 2)} tx</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 border-b border-neutral-200">
            <span className="text-[10px] text-neutral-400 absolute -bottom-4 right-0">0</span>
          </div>

          {/* Render Stacked Bars per Day */}
          {weeklyPaymentTrends.map((day, idx) => {
            const dayTotal = day.approvedFirst + day.approvedRetry + day.rejected;
            const hFirst = (day.approvedFirst / maxTotal) * 100;
            const hRetry = (day.approvedRetry / maxTotal) * 100;
            const hRejected = (day.rejected / maxTotal) * 100;
            const isHovered = hoveredDay === idx;

            return (
              <div
                key={day.period}
                onMouseEnter={() => setHoveredDay(idx)}
                onMouseLeave={() => setHoveredDay(null)}
                className="relative flex-1 flex flex-col items-center justify-end h-full mx-1.5 sm:mx-3 group cursor-pointer z-10"
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <div className="absolute -top-20 bg-neutral-900 text-white p-2 rounded-lg shadow-xl text-center z-30 pointer-events-none transform -translate-y-1 text-[10px] whitespace-nowrap">
                    <p className="font-bold text-white mb-0.5">{day.period}: {dayTotal} transacciones</p>
                    <p className="text-emerald-400 font-semibold">✓ 1er Intento: {day.approvedFirst}</p>
                    <p className="text-indigo-400 font-semibold">↺ Reintento: {day.approvedRetry}</p>
                    <p className="text-rose-400 font-semibold">✕ Rechazado: {day.rejected}</p>
                  </div>
                )}

                {/* Total label */}
                <span className="text-[10px] font-semibold text-neutral-500 mb-1 group-hover:text-neutral-900">
                  {dayTotal}
                </span>

                {/* Stacked Bar Container */}
                <div className="w-full max-w-[44px] rounded-t-xl overflow-hidden flex flex-col justify-end shadow-xs group-hover:brightness-105 transition-all">
                  {/* Top segment: Rejected (Rose/Red) */}
                  <div
                    style={{ height: `${hRejected}%`, backgroundColor: '#f43f5e' }}
                    title="Rechazados"
                  />
                  {/* Middle segment: Approved on Retry (Indigo) */}
                  <div
                    style={{ height: `${hRetry}%`, backgroundColor: '#6366f1' }}
                    title="Aprobados en Reintento"
                  />
                  {/* Bottom segment: Approved on First attempt (Emerald) */}
                  <div
                    style={{ height: `${hFirst}%`, backgroundColor: '#10b981' }}
                    title="Aprobados 1er Intento"
                  />
                </div>

                {/* Day label */}
                <div className="mt-2 text-center">
                  <p className="text-xs font-bold text-neutral-700">{day.period}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend & Summary */}
      <div className="pt-4 mt-2 border-t border-neutral-100 flex flex-wrap items-center justify-between text-xs gap-3">
        <div className="flex items-center space-x-3 text-[11px] font-medium text-neutral-600">
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
            <span>Aprobado (1er Intento)</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1]"></span>
            <span>Aprobado (Reintento)</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]"></span>
            <span>Rechazado</span>
          </span>
        </div>

        <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
          {recoveryShare}% de recuperación efectiva
        </span>
      </div>
    </div>
  );
}
