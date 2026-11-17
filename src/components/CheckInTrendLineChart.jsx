import React, { useState } from 'react';
import { QrCode, AlertOctagon, TrendingUp, Info } from 'lucide-react';
import { checkInTrends } from '../mockData.js';

export default function CheckInTrendLineChart() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const maxPasses = Math.max(...checkInTrends.map(d => d.boardingPasses), 400);

  const width = 500;
  const height = 180;
  const paddingX = 40;
  const paddingY = 20;

  const getX = (index) => paddingX + (index * (width - 2 * paddingX)) / (checkInTrends.length - 1);
  const getY = (val) => height - paddingY - ((val / maxPasses) * (height - 2 * paddingY));

  // Generar puntos SVG
  const passesPoints = checkInTrends.map((d, i) => `${getX(i)},${getY(d.boardingPasses)}`).join(' ');
  // Escalar los errores para que se aprecien claramente en la curva
  const errorPoints = checkInTrends.map((d, i) => `${getX(i)},${getY(d.validationErrors * 8)}`).join(' ');

  const areaPasses = `M ${getX(0)},${getY(checkInTrends[0].boardingPasses)} ` +
    checkInTrends.map((d, i) => `L ${getX(i)},${getY(d.boardingPasses)}`).join(' ') +
    ` L ${getX(checkInTrends.length - 1)},${height - paddingY} L ${getX(0)},${height - paddingY} Z`;

  const totalPasses = checkInTrends.reduce((s, d) => s + d.boardingPasses, 0);
  const totalErrors = checkInTrends.reduce((s, d) => s + d.validationErrors, 0);
  const errorRate = ((totalErrors / (totalPasses + totalErrors)) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#ecebe6] shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <div className="flex items-center space-x-1.5">
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
              Flujo de Check-in en Tiempo Real (Proceso 3)
            </h3>
            <span className="text-[10px] font-bold bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded">
              Hoy por horas
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Pases de abordar emitidos vs. Errores de validación PNR en el sistema
          </p>
        </div>

        <div className="flex items-center space-x-3 text-right">
          <div>
            <span className="text-[10px] text-neutral-400 block font-medium">Pases Generados</span>
            <span className="text-xs font-bold text-emerald-700">{totalPasses.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 block font-medium">Tasa Error PNR</span>
            <span className="text-xs font-bold text-rose-600">{errorRate}%</span>
          </div>
        </div>
      </div>

      {/* SVG Line Canvas */}
      <div className="pt-4 relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
          <defs>
            <linearGradient id="boardingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Gridlines */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#f1f0ea" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="#f1f0ea" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#e5e4de" />

          {/* Area fill */}
          <path d={areaPasses} fill="url(#boardingGradient)" />

          {/* Errors line (Rose red dashed) */}
          <polyline
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2"
            strokeDasharray="4 3"
            points={errorPoints}
          />

          {/* Boarding passes line (Emerald green solid) */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={passesPoints}
          />

          {/* Interactive Dots */}
          {checkInTrends.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.boardingPasses);
            const isHovered = hoveredIdx === i;

            return (
              <g key={i} className="cursor-pointer">
                <circle
                  cx={cx}
                  cy={cy}
                  r="12"
                  fill="transparent"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? "5" : "3.5"}
                  fill="#ffffff"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredIdx !== null && (
          <div
            className="absolute top-2 bg-neutral-900 text-white text-[10px] px-2.5 py-1 rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 z-20 whitespace-nowrap"
            style={{ left: `${(getX(hoveredIdx) / width) * 100}%` }}
          >
            <p className="font-bold text-white">{checkInTrends[hoveredIdx].time}</p>
            <p className="text-emerald-400 font-semibold">Pases: {checkInTrends[hoveredIdx].boardingPasses}</p>
            <p className="text-rose-400 font-semibold">Errores PNR: {checkInTrends[hoveredIdx].validationErrors}</p>
          </div>
        )}

        {/* X-axis labels */}
        <div className="flex justify-between px-7 mt-1 text-[11px] text-neutral-400 font-medium">
          {checkInTrends.map((d) => (
            <span key={d.time}>{d.time}</span>
          ))}
        </div>
      </div>

      {/* Legend & Note */}
      <div className="pt-4 mt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4 text-[11px] font-medium text-neutral-600">
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
            <span>Pases de abordar emitidos</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]"></span>
            <span>Errores "¿Reserva válida? ➔ NO"</span>
          </span>
        </div>

        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
          Estabilidad 98.4%
        </span>
      </div>
    </div>
  );
}
