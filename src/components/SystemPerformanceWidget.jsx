import React from 'react';
import { Activity, Bell, Server, Zap, ShieldCheck } from 'lucide-react';
import { systemLatencies, notificationsVolume } from '../mockData.js';

export default function SystemPerformanceWidget() {
  const totalNotifications = notificationsVolume.reduce((s, n) => s + n.count, 0);

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#ecebe6] shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <div className="flex items-center space-x-1.5">
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
              Métricas Transversales de Sistema & Notificaciones
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Latencia de endpoints críticos asíncronos y volumen de alertas enviadas
          </p>
        </div>

        <span className="text-[11px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
          {totalNotifications.toLocaleString()} alertas emitidas
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3.5">
        {/* Columna 1: Latencias de Endpoints Críticos */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
            Latencia de Respuesta (ms)
          </span>
          {systemLatencies.map((item) => (
            <div key={item.service} className="p-2.5 rounded-xl bg-neutral-50/80 border border-neutral-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-neutral-800">{item.service}</p>
                <p className="text-[9px] text-neutral-400">Target SLA: &lt;{item.targetMs} ms</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700 font-mono">
                  {item.latencyMs} ms
                </span>
                <span className="block text-[9px] font-semibold text-emerald-600">
                  ✓ Óptimo
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Columna 2: Volumen de Notificaciones Emitidas */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
            Volumen por Tipo de Notificación
          </span>
          {notificationsVolume.map((notif) => {
            const pct = Math.round((notif.count / totalNotifications) * 100);
            return (
              <div key={notif.type} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5 truncate">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: notif.color }}></span>
                    <span className="text-[11px] font-medium text-neutral-700 truncate">{notif.type}</span>
                  </div>
                  <span className="text-[11px] font-bold text-neutral-800 font-mono">{notif.count}</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: notif.color }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Todos los servicios críticos dentro del SLA de latencia</span>
        </div>
        <span className="font-semibold text-neutral-700">Canales: Email, SMS & Push</span>
      </div>
    </div>
  );
}
