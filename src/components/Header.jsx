import React from 'react';
import { Calendar, ChevronDown, Bell, Shield, Sparkles, Plane } from 'lucide-react';

export default function Header({ dateRange, setDateRange, onOpenAIChat }) {
  return (
    <header className="px-8 pt-6 pb-4 bg-white/70 backdrop-blur-md border-b border-[#ecebe6] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            Dashboard de Reserva & Check-in
          </h1>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
            En Vivo
          </span>
        </div>
        <p className="text-xs text-neutral-500 mt-0.5">
          Métricas de conversión de vuelos (Proceso 2), check-in y servicios adicionales (Proceso 3)
        </p>
      </div>

      {/* Right Action Tools */}
      <div className="flex items-center space-x-2.5">
        <button
          onClick={() => alert("Métricas operativas sincronizadas con los diagramas BPMN de Reserva y Check-in.")}
          className="text-xs font-medium text-neutral-600 hover:text-neutral-900 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors hidden sm:inline-block"
        >
          Ver Procesos BPMN
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 text-neutral-500 hover:text-neutral-800 rounded-lg hover:bg-neutral-100 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ea580c] rounded-full ring-2 ring-white"></span>
        </button>

        {/* Date Selector Pill */}
        <div className="flex items-center space-x-2 bg-white border border-neutral-200 shadow-2xs px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-700 hover:border-neutral-300 cursor-pointer">
          <Calendar className="w-3.5 h-3.5 text-neutral-400" />
          <span>{dateRange}</span>
          <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
        </div>

        {/* AI Copilot Trigger Button (N8N) */}
        <button
          onClick={onOpenAIChat}
          className="flex items-center space-x-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all duration-150 active:scale-95 cursor-pointer"
          title="Abrir Copiloto de IA conectado a N8N"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>AI Copilot</span>
        </button>
      </div>
    </header>
  );
}
