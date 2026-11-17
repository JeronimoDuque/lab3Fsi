import React from 'react';
import {
  Plane,
  LayoutDashboard,
  Filter,
  CreditCard,
  Luggage,
  QrCode,
  Activity,
  Bell,
  HelpCircle,
  Settings,
  ChevronDown,
  Search,
  SlidersHorizontal,
  RefreshCw,
  Ban
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navSections = [
    {
      group: "PROCESO 2: RESERVA & VENTA",
      items: [
        { id: "dashboard", label: "Dashboard Ejecutivo", icon: LayoutDashboard },
        { id: "funnel", label: "Embudo de Conversión", icon: Filter },
        { id: "payments", label: "Pasarela & Reintentos", icon: CreditCard },
        { id: "cancellations", label: "Cancelaciones & Reembolsos", icon: Ban },
      ]
    },
    {
      group: "PROCESO 3: CHECK-IN & ANCILLARY",
      items: [
        { id: "checkin", label: "Check-in & Pases", icon: QrCode },
        { id: "ancillaries", label: "Equipaje Adicional", icon: Luggage },
      ]
    },
    {
      group: "SISTEMA & OPERACIÓN",
      items: [
        { id: "latencies", label: "Latencia de Endpoints", icon: Activity },
        { id: "notifications", label: "Registro Alertas", icon: Bell },
      ]
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#fbfbfa] border-r border-[#ecebe6] flex flex-col justify-between select-none">
      {/* Top Section */}
      <div className="p-4 space-y-4">
        {/* Workspace Brand Dropdown */}
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-200/50 cursor-pointer transition-colors group">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center text-white shadow-sm font-black text-sm">
              <Plane className="w-4 h-4 text-[#ea580c]" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-xs text-neutral-900 tracking-tight">AeroOps Intelligence</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
              </div>
              <p className="text-[10px] text-neutral-400 font-medium">Flight Booking & Check-in</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar vuelo, PNR..."
            readOnly
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-[#f2f1ec] text-neutral-700 placeholder-neutral-400 rounded-lg border-0 focus:outline-none cursor-default"
          />
          <span className="absolute right-2.5 top-2 text-[10px] bg-white border border-neutral-200 text-neutral-400 px-1 py-0.2 rounded font-mono shadow-2xs">
            /
          </span>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-4 pt-1 overflow-y-auto max-h-[calc(100vh-250px)] pr-1 custom-scrollbar">
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <h4 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase px-2.5 mb-1.5">
                {sec.group}
              </h4>
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-[#ffedd5] text-[#c2410c] font-semibold shadow-xs"
                          : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/40"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#ea580c]" : "text-neutral-400"}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Profile / Airline Station */}
      <div className="p-3 border-t border-[#ecebe6] space-y-2 bg-[#f8f7f3]">
        <div className="flex items-center justify-between px-2 py-1 text-neutral-400">
          <HelpCircle className="w-4 h-4 hover:text-neutral-700 cursor-pointer transition-colors" />
          <Settings className="w-4 h-4 hover:text-neutral-700 cursor-pointer transition-colors" />
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-neutral-200/80 shadow-2xs cursor-pointer hover:border-neutral-300 transition-colors">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-[#0284c7] flex items-center justify-center text-white text-[10px] font-bold">
              AO
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-neutral-800">AeroOps Hub</p>
              <p className="text-[10px] text-neutral-400">ops@airline-cloud.io</p>
            </div>
          </div>
          <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
        </div>
      </div>
    </aside>
  );
}
