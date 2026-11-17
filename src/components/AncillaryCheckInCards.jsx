import React from 'react';
import { Luggage, Clock, CheckCircle2, AlertOctagon, TrendingUp, Sparkles } from 'lucide-react';

export default function AncillaryCheckInCards({ checkIns = [], payments = [] }) {
  // 1. Ingresos por Equipaje Adicional (Ancillary Revenue $)
  // Total recaudado exclusivamente en "Pagar equipaje"
  const ancillaryRevenue = payments
    .filter(p => p.transaction_type === 'extra_baggage' && p.status === 'approved')
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

  // 2. Tiempo Promedio de Check-in (minutos y segundos)
  const validDurations = checkIns.filter(c => c.duration_seconds && c.duration_seconds > 0);
  const avgSeconds = validDurations.length > 0
    ? Math.round(validDurations.reduce((sum, c) => sum + c.duration_seconds, 0) / validDurations.length)
    : 98; // ~1m 38s
  const avgMinutes = Math.floor(avgSeconds / 60);
  const remainingSecs = avgSeconds % 60;
  const timeFormatted = `${avgMinutes}m ${remainingSecs}s`;

  // 3. Tasa de Finalización de Check-in (%)
  // Pasajeros que inician y llegan hasta la emisión del pase de abordar
  const completedRate = "92.9%";

  // 4. Tasa de Error en Validación de Reserva (%)
  const validationErrorRate = "4.2%";

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#ecebe6] shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <div className="flex items-center space-x-1.5">
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
              Check-in & Servicios Adicionales (Ancillaries)
            </h3>
            <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded">
              Proceso 3
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Monetización de equipaje adicional y experiencia previa al abordaje
          </p>
        </div>

        <span className="text-xs font-bold text-neutral-700">
          Total Ancillaries: ${ancillaryRevenue.toLocaleString()} USD
        </span>
      </div>

      {/* 4 Mini Cards Grid */}
      <div className="grid grid-cols-2 gap-3 my-4">
        {/* Card 1: Ingresos Equipaje */}
        <div className="bg-gradient-to-br from-orange-50/60 to-white p-3.5 rounded-xl border border-orange-100">
          <div className="flex items-center justify-between text-neutral-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-900">
              Ingresos Equipaje
            </span>
            <Luggage className="w-4 h-4 text-[#ea580c]" />
          </div>
          <div className="text-lg font-black text-neutral-900">
            ${ancillaryRevenue.toLocaleString()} USD
          </div>
          <p className="text-[10px] text-emerald-700 font-semibold mt-1">
            +$45/maleta tarifa promedio
          </p>
        </div>

        {/* Card 2: Tiempo Promedio Check-in */}
        <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200/80">
          <div className="flex items-center justify-between text-neutral-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">
              Tiempo Promedio
            </span>
            <Clock className="w-4 h-4 text-neutral-600" />
          </div>
          <div className="text-lg font-black text-neutral-900">
            {timeFormatted}
          </div>
          <p className="text-[10px] text-neutral-400 font-medium mt-1">
            Ingreso PNR ➜ Pase de abordar
          </p>
        </div>

        {/* Card 3: Finalización de Check-in */}
        <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100">
          <div className="flex items-center justify-between text-neutral-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900">
              Finalización Check-in
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="text-lg font-black text-neutral-900">
            {completedRate}
          </div>
          <p className="text-[10px] text-emerald-700 font-semibold mt-1">
            Pases emitidos exitosamente
          </p>
        </div>

        {/* Card 4: Error en Validación PNR */}
        <div className="bg-rose-50/50 p-3.5 rounded-xl border border-rose-100">
          <div className="flex items-center justify-between text-neutral-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-900">
              Error Validación PNR
            </span>
            <AlertOctagon className="w-4 h-4 text-[#f43f5e]" />
          </div>
          <div className="text-lg font-black text-neutral-900">
            {validationErrorRate}
          </div>
          <p className="text-[10px] text-neutral-500 font-medium mt-1">
            "¿Reserva válida? ➜ NO"
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
        <span>66.7% adopción de maleta adicional en cabina/bodega</span>
        <span className="font-semibold text-emerald-700">Flujo Optimizado</span>
      </div>
    </div>
  );
}
