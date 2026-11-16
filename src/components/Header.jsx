import React from 'react';
import { Calendar, ChevronDown, Bell, Shield, Plus, MessageSquare } from 'lucide-react';

export default function Header({ dateRange, setDateRange, onOpenNewDeal }) {
  return (
    <header className="px-8 pt-6 pb-4 bg-white/70 backdrop-blur-md border-b border-[#ecebe6] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Dashboard</h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Track and improve your pipeline performance, team revenue, and deal conversions.
        </p>
      </div>

      {/* Right Action Tools */}
      <div className="flex items-center space-x-2.5">
        <button
          onClick={() => alert("Feedback modal: ¿Tienes sugerencias para este CRM MVP? Todo el cálculo es 100% dinámico.")}
          className="text-xs font-medium text-neutral-600 hover:text-neutral-900 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors hidden sm:inline-block"
        >
          Give feedback
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

        {/* Shield / Security icon */}
        <button className="p-2 text-neutral-500 hover:text-neutral-800 rounded-lg hover:bg-neutral-100 transition-colors">
          <Shield className="w-4 h-4" />
        </button>

        {/* Action: Add New Deal */}
        <button
          onClick={onOpenNewDeal}
          className="flex items-center space-x-1.5 bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-sm transition-all duration-150 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Deal</span>
        </button>
      </div>
    </header>
  );
}
