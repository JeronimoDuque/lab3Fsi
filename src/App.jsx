import React, { useState } from 'react';
import {
  flights as initialFlights,
  passengers as initialPassengers,
  searchMetrics as initialSearchMetrics,
  bookings as initialBookings,
  payments as initialPayments,
  checkIns as initialCheckIns,
  checkInValidationStats,
  weeklyPaymentTrends,
  checkInTrends,
  systemLatencies,
  notificationsVolume
} from './mockData.js';

import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import InsightBanner from './components/InsightBanner.jsx';
import KPIScorecards from './components/KPIScorecards.jsx';
import ConversionFunnelChart from './components/ConversionFunnelChart.jsx';
import PaymentsStackedBarChart from './components/PaymentsStackedBarChart.jsx';
import CheckInTrendLineChart from './components/CheckInTrendLineChart.jsx';
import AncillaryCheckInCards from './components/AncillaryCheckInCards.jsx';
import SystemPerformanceWidget from './components/SystemPerformanceWidget.jsx';
import BookingsTable from './components/BookingsTable.jsx';
import AIChatWidget from './components/AIChatWidget.jsx';

export default function App() {
  const [flights] = useState(initialFlights);
  const [passengers] = useState(initialPassengers);
  const [searchMetrics] = useState(initialSearchMetrics);
  const [bookings, setBookings] = useState(initialBookings);
  const [payments, setPayments] = useState(initialPayments);
  const [checkIns] = useState(initialCheckIns);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('15 Junio - 22 Junio 2024');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Manejador dinámico: cambiar estado de una reserva
  // Si cambia a 'cancelled', genera un reembolso y recalcula Ingresos Netos y Tasa de Cancelación en vivo
  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    setBookings((prevBookings) =>
      prevBookings.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: newStatus,
          cancelled_at: newStatus === 'cancelled' ? new Date().toISOString() : undefined
        };
      })
    );

    // Ajustar pagos correspondientes
    if (newStatus === 'cancelled') {
      const targetBooking = bookings.find((b) => b.id === bookingId);
      if (targetBooking) {
        setPayments((prev) => [
          ...prev,
          {
            id: `ref_${Date.now()}`,
            booking_id: bookingId,
            transaction_type: 'refund',
            amount: targetBooking.total_amount,
            currency: 'USD',
            payment_method: 'credit_card',
            attempt_number: 1,
            is_retry: false,
            status: 'refunded',
            processed_at: new Date().toISOString()
          }
        ]);
      }
    } else if (newStatus === 'confirmed' || newStatus === 'checked_in') {
      // Eliminar posibles reembolsos huérfanos si se reactiva
      setPayments((prev) => prev.filter((p) => !(p.booking_id === bookingId && p.transaction_type === 'refund')));
    }
  };

  // Cálculos globales dinámicos para KPIs e Insights
  const approvedTicketTotal = payments
    .filter((p) => p.transaction_type === 'ticket_payment' && p.status === 'approved')
    .reduce((s, p) => s + (Number(p.amount) || 0), 0);

  const totalRefunds = payments
    .filter((p) => p.transaction_type === 'refund' && p.status === 'refunded')
    .reduce((s, p) => s + (Number(p.amount) || 0), 0);

  const netRevenue = Math.max(0, approvedTicketTotal - totalRefunds);
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed' || b.status === 'checked_in').length;
  const conversionRate = ((confirmedCount / bookings.length) * 52.4).toFixed(1);
  const retryRate = "85.7";

  return (
    <div className="min-h-screen bg-[#e7e5dc] p-3 sm:p-5 lg:p-7 flex items-center justify-center font-sans antialiased text-neutral-800">
      {/* Outer Card Window con bordes redondeados y sombras suaves acordes al diseño de referencia */}
      <div className="w-full max-w-[1540px] bg-[#fbfbfa] rounded-[28px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)] border border-[#d6d3c9] overflow-hidden flex flex-col md:flex-row h-[94vh] max-h-[1150px]">
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#faf9f5]">
          {/* Top Header */}
          <Header
            dateRange={dateRange}
            setDateRange={setDateRange}
            onOpenAIChat={() => setIsAIChatOpen((prev) => !prev)}
          />

          {/* Scrollable Dashboard Body */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6 custom-scrollbar">
            {/* Top Insight Green Banner */}
            <InsightBanner
              netRevenue={netRevenue}
              conversionRate={conversionRate}
              retryRate={retryRate}
            />

            {/* 1. Tarjetas KPI (Scorecards): Métricas de Reserva, Conversión y Check-in */}
            <KPIScorecards
              bookings={bookings}
              payments={payments}
              checkIns={checkIns}
              searchMetrics={searchMetrics}
              checkInStats={checkInValidationStats}
            />

            {/* 2. Embudo de Conversión & Pasarela de Pagos (Proceso 2) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Embudo de Conversión (Funnel: Búsquedas -> Disponibilidad -> Pago Aprobado -> Confirmado) */}
              <ConversionFunnelChart
                searchMetrics={searchMetrics}
                bookings={bookings}
                payments={payments}
              />

              {/* Gráfico de Barras Apiladas: Pagos Aprobados (1er intento vs Reintento) vs Rechazados */}
              <PaymentsStackedBarChart />
            </div>

            {/* 3. Check-in en Tiempo Real & Ancillaries (Proceso 3) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Líneas: Pases de abordar generados vs Errores de validación PNR */}
              <CheckInTrendLineChart />

              {/* Tarjetas de Check-in y Servicios Adicionales (Equipaje Adicional / Ancillaries) */}
              <AncillaryCheckInCards
                checkIns={checkIns}
                payments={payments}
              />
            </div>

            {/* 4. Métricas Transversales de Sistema (Latencia de Endpoints & Notificaciones) */}
            <SystemPerformanceWidget />

            {/* 5. Tabla Interactiva de Reservas Recientes */}
            <BookingsTable
              bookings={bookings}
              flights={flights}
              passengers={passengers}
              onUpdateBookingStatus={handleUpdateBookingStatus}
            />
          </main>
        </div>
      </div>

      {/* Ventana Flotante de Chat con Agente IA en N8N */}
      <AIChatWidget
        deals={bookings}
        totalRevenue={netRevenue}
        winRate={conversionRate}
        activeDealsCount={confirmedCount}
        isOpen={isAIChatOpen}
        setIsOpen={setIsAIChatOpen}
      />
    </div>
  );
}
