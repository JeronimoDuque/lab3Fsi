import React from 'react';
import {
  LayoutDashboard,
  FileText,
  GitFork,
  BarChart3,
  TrendingUp,
  Target,
  PieChart,
  Award,
  Zap,
  CheckCircle2,
  Building2,
  Activity,
  FileSpreadsheet,
  Files,
  HelpCircle,
  Settings,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Flame
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navSections = [
    {
      group: "OVERVIEW",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "executive_summary", label: "Executive Summary", icon: FileText },
        { id: "pipeline_stages", label: "Pipeline Stages", icon: GitFork },
        { id: "performance", label: "Performance Overview", icon: BarChart3 },
      ]
    },
    {
      group: "ANALYTICS",
      items: [
        { id: "revenue_forecast", label: "Revenue Forecast", icon: TrendingUp },
        { id: "deal_velocity", label: "Deal Velocity", icon: Zap },
        { id: "win_loss", label: "Win / Loss Analysis", icon: PieChart },
        { id: "rep_rankings", label: "Rep Rankings", icon: Award },
        { id: "pipeline_health", label: "Pipeline Health", icon: Activity },
      ]
    },
    {
      group: "ACTION",
      items: [
        { id: "quota_tracker", label: "Quota Tracker", icon: Target },
        { id: "target_accounts", label: "Target Accounts", icon: Building2 },
        { id: "deal_insights", label: "Deal Impact Quality", icon: Flame },
      ]
    },
    {
      group: "REPORTING",
      items: [
        { id: "scheduled_exports", label: "Scheduled Exports", icon: FileSpreadsheet },
        { id: "reports", label: "Reports Archive", icon: Files },
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
              ▲
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-xs text-neutral-900 tracking-tight">AI CRM Intelligence</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
              </div>
              <p className="text-[10px] text-neutral-400 font-medium">B2B Sales Velocity</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search..."
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

      {/* Bottom Profile / Agency Pill */}
      <div className="p-3 border-t border-[#ecebe6] space-y-2 bg-[#f8f7f3]">
        <div className="flex items-center justify-between px-2 py-1 text-neutral-400">
          <HelpCircle className="w-4 h-4 hover:text-neutral-700 cursor-pointer transition-colors" />
          <Settings className="w-4 h-4 hover:text-neutral-700 cursor-pointer transition-colors" />
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-neutral-200/80 shadow-2xs cursor-pointer hover:border-neutral-300 transition-colors">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-[#059669] flex items-center justify-center text-white text-[10px] font-bold">
              CA
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-neutral-800">Cansaas Agency</p>
              <p className="text-[10px] text-neutral-400">cansaas.io@sales.com</p>
            </div>
          </div>
          <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
        </div>
      </div>
    </aside>
  );
}
