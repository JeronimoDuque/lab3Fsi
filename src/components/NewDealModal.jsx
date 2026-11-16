import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';

export default function NewDealModal({ isOpen, onClose, stages, customers, users, onAddDeal }) {
  const [title, setTitle] = useState('');
  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [ownerId, setOwnerId] = useState(users[0]?.id || '');
  const [stageId, setStageId] = useState(stages[2]?.id || ''); // Negotiation by default
  const [amount, setAmount] = useState('25000');
  const [status, setStatus] = useState('open');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    // Ajustar etapa si el status es won o lost
    let finalStageId = stageId;
    if (status === 'won') {
      const wonStage = stages.find((s) => s.name.toLowerCase().includes('won'));
      if (wonStage) finalStageId = wonStage.id;
    } else if (status === 'lost') {
      const lostStage = stages.find((s) => s.name.toLowerCase().includes('lost'));
      if (lostStage) finalStageId = lostStage.id;
    }

    const newDeal = {
      id: `d${Date.now()}`,
      title: title.trim(),
      customer_id: customerId,
      owner_id: ownerId,
      stage_id: finalStageId,
      amount: parseFloat(amount),
      currency: 'EUR',
      status: status,
      created_at: new Date().toISOString(),
      expected_close_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      closed_at: status === 'won' ? new Date().toISOString() : undefined
    };

    onAddDeal(newDeal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[#ea580c] flex items-center justify-center text-white">
              <PlusCircle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">Crear Nueva Oportunidad</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Título del Trato / Deal
            </label>
            <input
              type="text"
              required
              placeholder="ej: Contrato Enterprise 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Cliente B2B
              </label>
              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-[#ea580c]"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.company_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Vendedor Asignado
              </label>
              <select
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-[#ea580c]"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.full_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Monto Valor (€)
              </label>
              <input
                type="number"
                required
                min="1000"
                step="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Estado Inicial
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-[#ea580c]"
              >
                <option value="open">Abierto (Open)</option>
                <option value="won">Ganado (Won)</option>
                <option value="lost">Perdido (Lost)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Etapa del Pipeline
            </label>
            <select
              value={stageId}
              onChange={(e) => setStageId(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-[#ea580c]"
            >
              {stages.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (Probabilidad: {s.win_probability}%)
                </option>
              ))}
            </select>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-neutral-600 hover:bg-neutral-100 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold shadow-xs transition-colors"
            >
              Guardar Oportunidad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
