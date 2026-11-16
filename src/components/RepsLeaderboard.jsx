import React from 'react';
import { Info, ChevronRight, Award, Trophy } from 'lucide-react';

export default function RepsLeaderboard({ users, deals }) {
  // Calcular rendimiento dinámico por vendedor
  const repStats = users.map((user) => {
    const userDeals = deals.filter((d) => d.owner_id === user.id);
    const wonDeals = userDeals.filter((d) => d.status === 'won');
    const lostDeals = userDeals.filter((d) => d.status === 'lost');
    const closedCount = wonDeals.length + lostDeals.length;

    const wonRevenue = wonDeals.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
    const quota = Number(user.quota_amount) || 80000;
    const attainmentPct = Math.round((wonRevenue / quota) * 100);
    const winRate = closedCount > 0 ? Math.round((wonDeals.length / closedCount) * 100) : 0;

    return {
      ...user,
      wonRevenue,
      attainmentPct,
      winRate,
      wonCount: wonDeals.length
    };
  });

  // Ordenar por Revenue ganado de mayor a menor
  repStats.sort((a, b) => b.wonRevenue - a.wonRevenue);

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#ecebe6] shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <div className="flex items-center space-x-1.5">
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
              Sales Rep Performance Leaderboard
            </h3>
            <span title="Ranking dinámico de vendedores según ingresos cerrados y cumplimiento de cuota">
              <Info className="w-3.5 h-3.5 text-neutral-400 cursor-pointer hover:text-neutral-600 transition-colors" />
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Top vendedores clasificados por cuota e ingresos
          </p>
        </div>

        <button className="flex items-center space-x-1 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors">
          <span>View full team</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table Content */}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider border-b border-neutral-100">
              <th className="pb-2.5 font-bold w-6">#</th>
              <th className="pb-2.5 font-bold">Vendedor</th>
              <th className="pb-2.5 font-bold text-right">Revenue Cerrado</th>
              <th className="pb-2.5 font-bold text-center">Cumplimiento</th>
              <th className="pb-2.5 font-bold text-right">Win Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {repStats.map((rep, idx) => (
              <tr key={rep.id} className="hover:bg-neutral-50/70 transition-colors group">
                <td className="py-2.5 text-neutral-400 font-bold text-xs">
                  {idx === 0 ? (
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px]">
                      1
                    </span>
                  ) : (
                    `#${idx + 1}`
                  )}
                </td>

                <td className="py-2.5">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={rep.avatar_url}
                      alt={rep.full_name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-neutral-200"
                    />
                    <div>
                      <span className="font-semibold text-neutral-900 block group-hover:text-[#ea580c] transition-colors">
                        {rep.full_name}
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {rep.role === 'manager' ? 'Sales Manager' : 'Account Exec'}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-2.5 text-right font-bold text-neutral-800">
                  €{rep.wonRevenue.toLocaleString()}
                </td>

                <td className="py-2.5 text-center">
                  <div className="inline-flex items-center space-x-1.5 bg-neutral-100 px-2 py-0.5 rounded-full">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        rep.attainmentPct >= 100
                          ? 'bg-emerald-500'
                          : rep.attainmentPct >= 80
                          ? 'bg-blue-500'
                          : 'bg-amber-500'
                      }`}
                    ></span>
                    <span className="text-[11px] font-semibold text-neutral-700">
                      {rep.attainmentPct}%
                    </span>
                  </div>
                </td>

                <td className="py-2.5 text-right font-semibold text-neutral-600">
                  {rep.winRate}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
