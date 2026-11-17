import React, { useState } from 'react';
import { Search, Filter, Plane, CheckCircle2, XCircle, Clock, QrCode } from 'lucide-react';

export default function BookingsTable({ bookings = [], flights = [], passengers = [], onUpdateBookingStatus }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const flightMap = Object.fromEntries(flights.map(f => [f.id, f]));
  const passengerMap = Object.fromEntries(passengers.map(p => [p.id, p]));

  const filteredBookings = bookings.filter((b) => {
    const p = passengerMap[b.passenger_id];
    const f = flightMap[b.flight_id];

    const matchesSearch =
      b.reservation_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p && `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (f && `${f.flight_number} ${f.origin} ${f.destination}`.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#ecebe6] shadow-2xs">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-neutral-100">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
              Reservas Recientes & Gestión de Emisión (Control Dinámico)
            </h3>
            <span className="text-[10px] bg-neutral-100 text-neutral-600 font-bold px-2 py-0.5 rounded">
              {bookings.length} registros
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Cambia el estado a 'Cancelada' para ver cómo se aplica la devolución y se recalculan los Ingresos Netos
          </p>
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-[#f2f1ec] p-0.5 rounded-lg text-xs font-medium text-neutral-600">
            {[
              { id: 'all', label: `Todos (${bookings.length})` },
              { id: 'confirmed', label: `Confirmados (${bookings.filter(b => b.status === 'confirmed').length})` },
              { id: 'checked_in', label: `Checked-in (${bookings.filter(b => b.status === 'checked_in').length})` },
              { id: 'cancelled', label: `Cancelados (${bookings.filter(b => b.status === 'cancelled').length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
                  statusFilter === tab.id
                    ? 'bg-white text-neutral-900 font-bold shadow-2xs'
                    : 'hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar PNR, pasajero o ruta..."
              className="pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-[#ea580c] focus:bg-white w-48"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider border-b border-neutral-100">
              <th className="pb-3 font-bold">Código PNR</th>
              <th className="pb-3 font-bold">Pasajero</th>
              <th className="pb-3 font-bold">Vuelo & Ruta</th>
              <th className="pb-3 font-bold">Tarifa</th>
              <th className="pb-3 font-bold text-right">Monto Facturado</th>
              <th className="pb-3 font-bold text-center">Estado (Editable en Vivo)</th>
              <th className="pb-3 font-bold text-right">Fecha Emisión</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredBookings.slice(0, 10).map((b) => {
              const p = passengerMap[b.passenger_id];
              const f = flightMap[b.flight_id];

              return (
                <tr key={b.id} className="hover:bg-neutral-50/70 transition-colors group">
                  {/* PNR Code */}
                  <td className="py-3 pr-3">
                    <span className="font-mono font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded text-xs tracking-wider">
                      {b.reservation_code}
                    </span>
                  </td>

                  {/* Passenger */}
                  <td className="py-3 pr-3">
                    <p className="font-semibold text-neutral-900">
                      {p ? `${p.first_name} ${p.last_name}` : 'Pasajero Desconocido'}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono">
                      {p ? `${p.document_type}: ${p.document_number}` : ''}
                    </p>
                  </td>

                  {/* Flight & Route */}
                  <td className="py-3 pr-3">
                    <div className="flex items-center space-x-1.5 text-neutral-800 font-semibold">
                      <Plane className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{f ? `${f.flight_number} (${f.origin} ➔ ${f.destination})` : 'N/A'}</span>
                    </div>
                  </td>

                  {/* Fare */}
                  <td className="py-3 pr-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      b.fare_type === 'flex'
                        ? 'bg-purple-100 text-purple-700'
                        : b.fare_type === 'classic'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {b.fare_type}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="py-3 pr-3 text-right font-bold text-neutral-900">
                    ${Number(b.total_amount).toFixed(2)} USD
                  </td>

                  {/* Interactive Status Selector */}
                  <td className="py-3 px-2 text-center">
                    <select
                      value={b.status}
                      onChange={(e) => onUpdateBookingStatus(b.id, e.target.value)}
                      className={`text-xs font-semibold rounded-lg px-2.5 py-1 border transition-all cursor-pointer focus:outline-none shadow-2xs ${
                        b.status === 'checked_in'
                          ? 'bg-sky-50 text-sky-800 border-sky-300'
                          : b.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : b.status === 'cancelled'
                          ? 'bg-rose-50 text-rose-800 border-rose-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                      title="Haz clic para cambiar el estado y recalcular los KPIs en tiempo real"
                    >
                      <option value="confirmed">✓ Confirmada (Emitida)</option>
                      <option value="checked_in">✈ Checked-in (Con Pase)</option>
                      <option value="cancelled">✕ Cancelada (Devolución)</option>
                      <option value="pending_payment">⏳ Pendiente de Pago</option>
                    </select>
                  </td>

                  {/* Date */}
                  <td className="py-3 text-right text-[11px] text-neutral-500 font-medium">
                    {b.confirmed_at ? new Date(b.confirmed_at).toLocaleDateString() : 'Pendiente'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
