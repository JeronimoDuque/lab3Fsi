import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  Settings,
  Bot,
  User,
  RotateCcw,
  ExternalLink,
  Check,
  AlertCircle
} from 'lucide-react';

export default function AIChatWidget({
  deals = [],
  totalRevenue = 0,
  winRate = "0",
  activeDealsCount = 0,
  isOpen: externalIsOpen,
  setIsOpen: externalSetIsOpen
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen !== undefined ? externalSetIsOpen : setInternalIsOpen;

  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // URL del webhook de n8n en producción (especificada por el usuario)
  const defaultWebhookUrl = 'https://lab3fsicrm.app.n8n.cloud/webhook/6a9c61c2-7a26-4751-bded-a18c08486ab6';

  const [webhookUrl, setWebhookUrl] = useState(() => {
    const saved = localStorage.getItem('n8n_crm_webhook_url');
    if (!saved || saved.includes('<nombre-dominio>') || saved.includes('webhook-test')) {
      localStorage.setItem('n8n_crm_webhook_url', defaultWebhookUrl);
      return defaultWebhookUrl;
    }
    return saved;
  });
  const [tempUrl, setTempUrl] = useState(webhookUrl);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  // Historial de mensajes
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'agent',
      text: '¡Hola! Soy tu Copiloto de Ventas con IA conectado a n8n. Puedo responder preguntas sobre el rendimiento de tu equipo, analizar tratos en negociación o sugerirte estrategias de cierre. ¿En qué te puedo ayudar hoy?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  // Guardar nueva URL de webhook
  const handleSaveWebhook = (e) => {
    e.preventDefault();
    const cleanUrl = tempUrl.trim();
    setWebhookUrl(cleanUrl);
    localStorage.setItem('n8n_crm_webhook_url', cleanUrl);
    setShowSettings(false);
    setErrorStatus(null);
  };

  // Preguntas sugeridas (prompts rápidos de aerolínea)
  const quickPrompts = [
    "¿Cuál es la tasa de conversión de búsqueda a reserva?",
    "¿Cuánto es el ingreso neto vs reembolsos?",
    "¿Cuál es la efectividad de los reintentos de pago?",
    "¿Cómo va la adopción de equipaje adicional en check-in?"
  ];

  // Enviar mensaje al webhook de N8N
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    setErrorStatus(null);
    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Si la URL es la plantilla por defecto, avisamos al usuario
      if (webhookUrl.includes('<nombre-dominio>')) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `agent-notice-${Date.now()}`,
              sender: 'agent',
              text: '⚠️ **Aviso de configuración**: La URL actual tiene los valores comodín `https://<nombre-dominio>.app.n8n.cloud/webhook/<id-path>`. Haz clic en el icono de engranaje ⚙️ arriba para ingresar tu URL real de webhook de n8n.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          setIsLoading(false);
        }, 600);
        return;
      }

      // Preparar payload con contexto en tiempo real del sistema de reservas y check-in
      const payload = {
        message: text,
        chatInput: text,
        timestamp: new Date().toISOString(),
        context: {
          netRevenue: `$${totalRevenue.toLocaleString()} USD`,
          searchConversionRate: `${winRate}%`,
          confirmedBookingsCount: activeDealsCount,
          currency: "USD",
          sampleBookings: (deals || []).slice(0, 8).map((b) => ({
            pnr: b.reservation_code,
            amount: b.total_amount,
            status: b.status,
            fare_type: b.fare_type
          }))
        }
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor de n8n: HTTP ${response.status} ${response.statusText}`);
      }

      // Procesar respuesta flexible (n8n puede responder texto plano o JSON con varias claves)
      let replyText = '';
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        const data = await response.json();
        replyText =
          data.output ||
          data.response ||
          data.message ||
          data.text ||
          data.reply ||
          (typeof data === 'string' ? data : JSON.stringify(data, null, 2));
      } else {
        replyText = await response.text();
      }

      if (!replyText || replyText.trim() === '') {
        replyText = "Traspaso de mensaje completado en n8n sin texto de retorno.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'agent',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error('Error al conectar con el webhook de n8n:', err);
      setErrorStatus(err.message || 'No se pudo comunicar con n8n');
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'agent',
          isError: true,
          text: `❌ **No se pudo conectar con n8n**: ${err.message}. Verifica que el flujo en n8n esté activo ('Active') o que el nodo Webhook admita solicitudes POST y tenga configurado el CORS correspondiente.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Botón Flotante para Abrir Chat */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="group flex items-center space-x-2.5 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-orange-500/20 border border-neutral-700/60 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ea580c] to-amber-500 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-neutral-900 animate-pulse"></span>
          </div>
          <div className="text-left pr-1">
            <span className="text-xs font-bold block leading-tight tracking-tight">AI Copilot</span>
            <span className="text-[10px] text-neutral-400 block leading-tight font-medium">n8n Agent</span>
          </div>
        </button>
      )}

      {/* Ventana de Chat */}
      {isOpen && (
        <div
          className={`w-[410px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-2xl border border-neutral-200/90 flex flex-col overflow-hidden transition-all duration-200 ${
            isMinimized ? 'h-14' : 'h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header de la Ventana */}
          <div className="bg-[#fbfbfa] px-4 py-3 border-b border-neutral-200 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ea580c] to-amber-500 flex items-center justify-center text-white shadow-xs flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-xs font-bold text-neutral-900">AI Sales Copilot</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Conectado"></span>
                </div>
                <p className="text-[10px] text-neutral-400 font-medium truncate max-w-[190px]">
                  {webhookUrl.includes('<nombre-dominio>') ? '⚠️ Webhook pendiente' : 'Agente n8n activo'}
                </p>
              </div>
            </div>

            {/* Acciones de Cabecera */}
            <div className="flex items-center space-x-1 text-neutral-500">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-lg hover:bg-neutral-200/60 transition-colors ${
                  showSettings ? 'text-[#ea580c] bg-orange-50' : 'hover:text-neutral-800'
                }`}
                title="Configurar URL del Webhook n8n"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg hover:bg-neutral-200/60 hover:text-neutral-800 transition-colors"
                title={isMinimized ? 'Expandir' : 'Minimizar'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-neutral-200/60 hover:text-neutral-800 transition-colors"
                title="Cerrar chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Panel de Configuración de Webhook (Desplegable) */}
          {showSettings && !isMinimized && (
            <div className="bg-[#fff8f3] border-b border-orange-200/70 p-3.5 text-xs animate-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-neutral-800 text-[11px] flex items-center space-x-1">
                  <span>Configuración Webhook de N8N</span>
                </span>
                <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-1.5 py-0.5 rounded">
                  POST
                </span>
              </div>
              <form onSubmit={handleSaveWebhook} className="space-y-2">
                <input
                  type="url"
                  required
                  placeholder="https://tu-dominio.app.n8n.cloud/webhook/tu-id"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded-lg text-neutral-800 text-xs focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
                />
                <div className="flex items-center justify-between pt-1">
                  <p className="text-[10px] text-neutral-500">
                    Se guarda localmente en tu navegador.
                  </p>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold rounded-md text-[11px] shadow-2xs transition-colors"
                  >
                    Guardar URL
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Cuerpo del Chat (Visible solo si no está minimizado) */}
          {!isMinimized && (
            <>
              {/* Mensajes Scrollables */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#faf9f5] custom-scrollbar text-xs">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start space-x-2 ${
                        isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0 mt-0.5 shadow-2xs ${
                          isUser
                            ? 'bg-neutral-800'
                            : msg.isError
                            ? 'bg-rose-500'
                            : 'bg-[#ea580c]'
                        }`}
                      >
                        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                      </div>

                      {/* Burbuja del mensaje */}
                      <div className={`max-w-[78%] space-y-1`}>
                        <div
                          className={`p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                            isUser
                              ? 'bg-neutral-900 text-white rounded-tr-xs'
                              : msg.isError
                              ? 'bg-rose-50 border border-rose-200 text-rose-900 rounded-tl-xs'
                              : 'bg-white border border-neutral-200/90 text-neutral-800 rounded-tl-xs'
                          }`}
                        >
                          <div className="whitespace-pre-wrap break-words">{msg.text}</div>
                        </div>
                        <span
                          className={`text-[9px] text-neutral-400 block px-1 ${
                            isUser ? 'text-right' : 'text-left'
                          }`}
                        >
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Indicador de escribiendo / cargando */}
                {isLoading && (
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[#ea580c] flex items-center justify-center text-white text-[10px] shadow-2xs">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-white border border-neutral-200 p-2.5 rounded-2xl rounded-tl-xs shadow-2xs flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 bg-[#ea580c] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-[#ea580c] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-[#ea580c] rounded-full animate-bounce"></span>
                      <span className="text-[10px] text-neutral-400 font-medium pl-1">
                        Consultando agente n8n...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Sugerencias Rápidas (Chips de Prompts) */}
              {messages.length <= 3 && !isLoading && (
                <div className="px-3 pt-2 pb-1 bg-white border-t border-neutral-100 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt)}
                      className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 rounded-lg text-[10px] font-medium whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Barra de Entrada / Footer */}
              <div className="p-3 bg-white border-t border-neutral-200">
                <div className="flex items-center space-x-2 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-1.5 focus-within:border-[#ea580c] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#ea580c] transition-all">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="Pregúntale a tu agente de IA..."
                    className="flex-1 text-xs bg-transparent border-0 focus:outline-none text-neutral-800 placeholder-neutral-400 disabled:opacity-50"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-1.5 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] disabled:opacity-30 disabled:hover:bg-[#ea580c] text-white transition-all cursor-pointer shadow-2xs active:scale-95"
                    title="Enviar mensaje (Enter)"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between px-1 pt-1.5 text-[9px] text-neutral-400">
                  <span>Presiona Enter para enviar</span>
                  <span className="truncate max-w-[180px] font-mono">
                    POST: {webhookUrl.replace('https://', '').split('/')[0]}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
