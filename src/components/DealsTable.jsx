import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, ChevronDown, CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function DealsTable({ deals, stages, customers, users, onUpdateDealStatus }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('amount');
  const [sortDirection, setSortDirection] = useState('desc');

  // Mapeos rápidos para evitar búsquedas repetitivas
  const customerMap = Object.fromEntries(customers.map((c) => [c.id, c]));
  const userMap = Object.fromEntries(users.map((u) => [u.id, u]));
  const stageMap = Object.fromEntries(stages.map((s) => [s.id, s]));

  // Filtrado
  const filteredDeals = deals.filter((deal) => {
    const cust = customerMap[deal.customer_id];
    const owner = userMap[deal.owner_id];
    const matchesSearch =
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cust && cust.company_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (owner && owner.full_name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' || deal.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Ordenamiento
  filteredDeals.sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === 'amount') {
      valA = Number(valA) || 0;
      valB = Number(valB) || 0;
    }

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusBadge = (deal) => {
    switch (deal.status) {
      case 'won':
        return (
          <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded-full text-[11px] font-semibold">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Won</span>
          </span>
        );
      case 'lost':
        return (
          <span className="inline-flex items-center space-x-1 bg-rose-50 text-rose-700 border border-rose-200/80 px-2 py-0.5 rounded-full text-[11px] font-semibold">
            <XCircle className="w-3 h-3 text-rose-600" />
            <span>Lost</span>
          </span>
        );
      case 'open':
      default:
        return (
          <span className="inline-flex items-center space-x-1 bg-amber-50 text-amber-700 border border-amber-200/80 px-2 py-0.5 rounded-full text-[11px] font-semibold">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Open</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#ecebe6] shadow-2xs">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-neutral-100">
        <div>
          <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
            Top Deals Recientes (Control Interactivo)
          </h3>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Puedes cambiar el estado de cualquier trato directamente para ver cómo los KPIs y gráficos se recalculan en vivo
          </p>
        </div>

        {/* Search & Status Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Status Filter Tabs */}
          <div className="flex items-center bg-[#f2f1ec] p-0.5 rounded-lg text-xs font-medium text-neutral-600">
            {[
              { id: 'all', label: `Todos (${deals.length})` },
              { id: 'won', label: `Ganados (${deals.filter((d) => d.status === 'won').length})` },
              { id: 'open', label: `Abiertos (${deals.filter((d) => d.status === 'open').length})` },
              { id: 'lost', label: `Perdidos (${deals.filter((d) => d.status === 'lost').length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all duration-150 ${
                  statusFilter === tab.id
                    ? 'bg-white text-neutral-900 font-bold shadow-2xs'
                    : 'hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar trato, cliente o dueño..."
              className="pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-[#ea580c] focus:bg-white w-48 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider border-b border-neutral-100">
              <th className="pb-3 font-bold">Oportunidad / Trato</th>
              <th className="pb-3 font-bold">Cliente B2B</th>
              <th className="pb-3 font-bold">Vendedor</th>
              <th className="pb-3 font-bold">Etapa</th>
              <th
                className="pb-3 font-bold text-right cursor-pointer hover:text-neutral-700 transition-colors"
                onClick={() => toggleSort('amount')}
              >
                <div className="inline-flex items-center space-x-1">
                  <span>Monto (€)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="pb-3 font-bold text-center">Estado (Editable)</th>
              <th className="pb-3 font-bold text-right">Fecha Cierre</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredDeals.slice(0, 10).map((deal) => {
              const cust = customerMap[deal.customer_id];
              const owner = userMap[deal.owner_id];
              const stage = stageMap[deal.stage_id];

              return (
                <tr key={deal.id} className="hover:bg-neutral-50/70 transition-colors group">
                  {/* Deal Title */}
                  <td className="py-3 pr-3">
                    <p className="font-semibold text-neutral-900 group-hover:text-[#ea580c] transition-colors">
                      {deal.title}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono">
                      ID: {deal.id}
                    </p>
                  </td>

                  {/* Customer */}
                  <td className="py-3 pr-3">
                    <span className="font-medium text-neutral-800 block">
                      {cust ? cust.company_name : 'N/A'}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {cust ? cust.industry : ''}
                    </span>
                  </td>

                  {/* Owner */}
                  <td className="py-3 pr-3">
                    <div className="flex items-center space-x-2">
                      <img
                        src={owner ? owner.avatar_url : ''}
                        alt={owner ? owner.full_name : ''}
                        className="w-6 h-6 rounded-full object-cover ring-1 ring-neutral-200"
                      />
                      <span className="text-neutral-700 font-medium truncate max-w-[100px]">
                        {owner ? owner.full_name : 'No asignado'}
                      </span>
                    </div>
                  </td>

                  {/* Stage badge */}
                  <td className="py-3 pr-3">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold text-white shadow-2xs"
                      style={{ backgroundColor: stage ? stage.color : '#94a3b8' }}
                    >
                      {stage ? stage.name : 'Unknown'}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="py-3 pr-3 text-right font-bold text-neutral-900">
                    €{Number(deal.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  {/* Status Dropdown (Live interactive calculation!) */}
                  <td className="py-3 px-2 text-center">
                    <div className="inline-block relative">
                      <select
                        value={deal.status}
                        onChange={(e) => onUpdateDealStatus(deal.id, e.target.value)}
                        className={`text-xs font-semibold rounded-lg px-2.5 py-1 border transition-all cursor-pointer shadow-2xs focus:outline-none ${
                          deal.status === 'won'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                            : deal.status === 'lost'
                            ? 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
                            : 'bg-orange-50 text-orange-800 border-orange-300 hover:bg-orange-100'
                        }`}
                        title="Haz clic para cambiar el estado y observar cómo cambian los KPIs"
                      >
                        <option value="won">✓ Ganado (Won)</option>
                        <option value="open">⏳ Abierto (Open)</option>
                        <option value="lost">✕ Perdido (Lost)</option>
                      </select>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3 text-right text-[11px] text-neutral-500 font-medium">
                    {deal.closed_at
                      ? new Date(deal.closed_at).toLocaleDateString()
                      : deal.expected_close_date
                      ? `${deal.expected_close_date} (est)`
                      : 'Pendiente'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredDeals.length === 0 && (
        <div className="py-8 text-center text-neutral-400 text-xs">
          No se encontraron oportunidades con los filtros seleccionados.
        </div>
      )}
    </div>
  );
}
