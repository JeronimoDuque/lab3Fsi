import React, { useState } from 'react';
import { users as initialUsers, stages as initialStages, customers as initialCustomers, deals as initialDeals } from './mockData.js';

import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import InsightBanner from './components/InsightBanner.jsx';
import KPICards from './components/KPICards.jsx';
import PipelineStageChart from './components/PipelineStageChart.jsx';
import RevenueOverTimeChart from './components/RevenueOverTimeChart.jsx';
import RepsLeaderboard from './components/RepsLeaderboard.jsx';
import IndustryBreakdown from './components/IndustryBreakdown.jsx';
import DealsTable from './components/DealsTable.jsx';
import NewDealModal from './components/NewDealModal.jsx';

export default function App() {
  const [users] = useState(initialUsers);
  const [stages] = useState(initialStages);
  const [customers] = useState(initialCustomers);
  const [deals, setDeals] = useState(initialDeals);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('1 June - 30 June 2026');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Actualización dinámica de estado de un Deal (Won, Open, Lost)
  // Al cambiarlo, todos los KPIs y gráficos se recalculan en tiempo real
  const handleUpdateDealStatus = (dealId, newStatus) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) => {
        if (deal.id !== dealId) return deal;

        let newStageId = deal.stage_id;
        let closedAt = deal.closed_at;

        if (newStatus === 'won') {
          const wonStage = stages.find((s) => s.id === 's4' || s.name.toLowerCase().includes('won'));
          newStageId = wonStage ? wonStage.id : 's4';
          closedAt = new Date().toISOString();
        } else if (newStatus === 'lost') {
          const lostStage = stages.find((s) => s.id === 's5' || s.name.toLowerCase().includes('lost'));
          newStageId = lostStage ? lostStage.id : 's5';
          closedAt = new Date().toISOString();
        } else if (newStatus === 'open') {
          const negStage = stages.find((s) => s.id === 's3' || s.name.toLowerCase().includes('negot'));
          newStageId = negStage ? negStage.id : 's3';
          closedAt = undefined;
        }

        return {
          ...deal,
          status: newStatus,
          stage_id: newStageId,
          closed_at: closedAt
        };
      })
    );
  };

  // Agregar nueva oportunidad en vivo
  const handleAddDeal = (newDeal) => {
    setDeals((prev) => [newDeal, ...prev]);
  };

  // KPIs dinámicos calculados a nivel global para el banner y resúmenes
  const wonDeals = deals.filter((d) => d.status === 'won');
  const lostDeals = deals.filter((d) => d.status === 'lost');
  const openDeals = deals.filter((d) => d.status === 'open');
  const totalRevenue = wonDeals.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const closedCount = wonDeals.length + lostDeals.length;
  const winRate = closedCount > 0 ? ((wonDeals.length / closedCount) * 100).toFixed(1) : '0.0';

  return (
    <div className="min-h-screen bg-[#e7e5dc] p-3 sm:p-6 lg:p-8 flex items-center justify-center font-sans antialiased text-neutral-800">
      {/* Outer Card Window with Soft Rounded Corners matching reference UI */}
      <div className="w-full max-w-[1480px] bg-[#fbfbfa] rounded-[28px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)] border border-[#d6d3c9] overflow-hidden flex flex-col md:flex-row h-[94vh]">
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#faf9f5]">
          {/* Top Header */}
          <Header
            dateRange={dateRange}
            setDateRange={setDateRange}
            onOpenNewDeal={() => setIsModalOpen(true)}
          />

          {/* Scrollable Dashboard Body */}
          <main className="flex-1 overflow-y-auto p-5 lg:p-7 space-y-6 custom-scrollbar">
            {/* Top Insight Green Banner */}
            <InsightBanner
              wonRevenue={totalRevenue}
              activeDealsCount={openDeals.length}
              winRate={winRate}
            />

            {/* Top KPI Cards (Total Revenue, Active Deals, Win Rate, Avg Deal Size) */}
            <KPICards deals={deals} />

            {/* Primary Charts Section (2 Columns: Pipeline Stages Bar Chart & Evolution Line Chart) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico Principal (Barras): Ingresos por Etapa del Pipeline */}
              <PipelineStageChart stages={stages} deals={deals} />

              {/* Gráfico Secundario (Línea): Evolución de ventas en el tiempo */}
              <RevenueOverTimeChart deals={deals} users={users} />
            </div>

            {/* Performance Leaderboard & Industry Breakdown (Matching Reference UI) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Rep Performance Leaderboard */}
              <RepsLeaderboard users={users} deals={deals} />

              {/* Composition by Industry */}
              <IndustryBreakdown customers={customers} deals={deals} />
            </div>

            {/* Top Deals Interactive Table */}
            <DealsTable
              deals={deals}
              stages={stages}
              customers={customers}
              users={users}
              onUpdateDealStatus={handleUpdateDealStatus}
            />
          </main>
        </div>
      </div>

      {/* Modal para crear oportunidad nueva */}
      <NewDealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stages={stages}
        customers={customers}
        users={users}
        onAddDeal={handleAddDeal}
      />
    </div>
  );
}
