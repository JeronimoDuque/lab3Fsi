# ✈️ Dashboard de Reserva, Conversión & Check-in (Airline Operations SaaS)

Dashboard empresarial para la **toma de decisiones operativas y de ingresos en tiempo real** en una aerolínea comercial, diseñado con base en los diagramas de procesos BPMN:
* **Proceso 2: Reserva y Emisión de Tiquetes (Embudo de Ventas y Pasarela de Pagos)**
* **Proceso 3: Check-in, Asignación de Asientos y Servicios Adicionales (Ancillaries)**
* **Métricas Transversales: Latencia de Endpoints Asíncronos y Notificaciones**

Diseñado con el **estilo visual de referencia**: diseño minimalista y limpio, esquinas redondeadas (`rounded-[28px]` y `rounded-2xl`), sombras difusas suaves, fondo crema/hueso (`#fbfbfa`), tarjetas blancas y acentos en **naranja/coral** (`#ea580c`), **verde esmeralda** (`#10b981`), **índigo** (`#6366f1`) y **azul cielo** (`#0284c7`).

---

## 🚀 Cómo Ejecutar el Proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```
Abre en tu navegador la URL: `http://localhost:3000`.

---

## 📁 Estructura del Proyecto

```text
lab3Fsi/
├── estructura de datos.md              # 📋 Esquema de datos normalizado (Vuelos, Reservas, Pagos, Check-in)
├── mockData.js                         # 📦 Store central de datos simulados (ESM)
├── index.html                          # 🌐 Entrada principal Vite
├── package.json                        # ⚙️ Dependencias (React 18, Tailwind, Lucide)
├── postcss.config.js                   # 🎨 Configuración PostCSS / Tailwind
├── vite.config.js                      # ⚡ Configuración de bundling Vite
├── tailwind.config.js                  # 🎨 Tokens de diseño y colores
└── src/
    ├── main.jsx                        # Punto de entrada React
    ├── App.jsx                         # Orquestador principal y lógica reactiva
    ├── index.css                       # Estilos base y scrollbar suave
    ├── mockData.js                     # Espejo de datos para imports en src
    └── components/
        ├── Sidebar.jsx                 # Barra de navegación lateral de AeroOps
        ├── Header.jsx                  # Encabezado con selector de fechas y botón AI Copilot
        ├── InsightBanner.jsx           # Banner verde con insights automáticos de operaciones
        ├── KPIScorecards.jsx           # 6 Tarjetas KPI (Ingresos Netos, Conversión, Reintentos, etc.)
        ├── ConversionFunnelChart.jsx   # Embudo de Conversión (Búsquedas ➔ Disponibilidad ➔ Pago ➔ Confirmación)
        ├── PaymentsStackedBarChart.jsx # Barras Apiladas: Pagos Aprobados (1er intento vs Reintento) vs Rechazos
        ├── CheckInTrendLineChart.jsx   # Gráfico de Líneas: Pases de abordar emitidos vs Errores PNR en el tiempo
        ├── AncillaryCheckInCards.jsx   # Métricas de Check-in y Servicios Adicionales (Equipaje Adicional)
        ├── SystemPerformanceWidget.jsx # Latencias de Endpoints Críticos (ms) y Alertas emitidas
        ├── BookingsTable.jsx           # Tabla interactiva con selector de estado y recálculo de devoluciones
        └── AIChatWidget.jsx            # 🤖 Copiloto de IA conectado a Webhook N8N (POST)
```

---

## 🧮 Métricas Implementadas y Fórmulas de Negocio (100% Dinámicas)

### 1. Métricas de Reserva y Conversión (Proceso 2)
* **Ingresos Netos por Ventas ($):**  
  `∑ Pagos Tiquetes Aprobados - ∑ Reembolsos por Cancelación`
* **Monto en Devoluciones ($):** Total reembolsado al ejecutar la compuerta *"¿Cancela la reserva? -> Sí"*.
* **Tasa de Disponibilidad de Vuelos (%):**  
  `(Búsquedas con opciones disponibles / Total de búsquedas) * 100` (87.0%).
* **Tasa de Conversión Búsqueda a Reserva (%):**  
  `(Clientes con tiquete emitido / Total de búsquedas) * 100` (52.4%).
* **Tasa de Rechazo de Pagos (%):**  
  `(Transacciones rechazadas / Total transacciones de pago) * 100` (10.2%).
* **Tasa de Recuperación por Reintento (%):**  
  `(Pagos aprobados en intento ≥ 2 / Pagos inicialmente rechazados) * 100` (85.7% recuperados con éxito).
* **Tasa de Cancelación Post-Emisión (%):**  
  `(Reservas canceladas / Total reservas emitidas) * 100`.

### 2. Métricas de Check-in y Servicios Adicionales (Proceso 3)
* **Tasa de Error en Validación de Reserva (%):**  
  Porcentaje de intentos en check-in que fallan en *"¿Reserva válida? -> NO"* (4.2%).
* **Tasa de Adopción de Equipaje Adicional (%):**  
  Porcentaje de pasajeros que seleccionan *"¿Equipaje adicional? -> Sí"* y completan el pago (66.7%).
* **Ingresos por Equipaje Adicional (Ancillary Revenue $):**  
  Total recaudado exclusivamente en la actividad *"Pagar equipaje"*.
* **Tasa de Finalización de Check-in (%):**  
  Porcentaje de pasajeros que inician con su PNR y logran generar su pase de abordar (92.9%).
* **Tiempo Promedio de Check-in:**  
  Promedio transcurrido desde *"Ingresar código de reserva"* hasta *"Generar pase de abordar"* (1m 38s).

### 3. Métricas Transversales de Sistema y Operación
* **Latencia de Respuesta del Sistema (ms):** Tiempo promedio en solicitudes críticas:
  * Consultar disponibilidad: 185 ms (SLA <250 ms)
  * Procesar el pago: 420 ms (SLA <600 ms)
  * Validar reserva (PNR): 95 ms (SLA <150 ms)
  * Generar pase de abordar: 240 ms (SLA <300 ms)
* **Volumen de Notificaciones Emitidas:** Conteo desglosado por tipo (Confirmación de reserva: 712, Sin disponibilidad: 142, Rechazo de pago: 68, Cancelación: 34, Error PNR: 28).

---

## 📊 Visualizaciones del Dashboard

1. **Embudo de Conversión (Funnel):**  
   Búsquedas (100%) ➔ Con Disponibilidad (87%) ➔ Pago Aprobado (55%) ➔ Reserva Confirmada (52%). Permite detectar caídas en vuelos agotados o abandonos en pasarela.
2. **Gráfico de Barras Apiladas:**  
   Pagos Aprobados al 1er intento (Verde) vs Aprobados en Reintento (Índigo) vs Rechazados (Rojo) por día de la semana.
3. **Gráfico de Líneas (Tendencia Temporal):**  
   Pases de abordar generados vs Errores de validación PNR por franja horaria.
4. **Tarjetas de Check-in & Ancillaries:**  
   Monetización de maletas adicionales, tiempo promedio de check-in y tasa de finalización.
5. **Widget de Sistema & Notificaciones:**  
   Semáforo de latencias SLA y barras de distribución de alertas.
6. **Tabla Interactiva de Reservas:**  
   Permite cambiar el estado de cualquier PNR a *"Cancelada"* para ver en vivo cómo se aplica la devolución y se recalculan los Ingresos Netos.

---

## 🤖 Integración con Agente de IA en N8N

* **Método:** `POST`
* **URL:** `https://lab3fsicrm.app.n8n.cloud/webhook/6a9c61c2-7a26-4751-bded-a18c08486ab6`
* **Payload Enriquecido:** Viaja con el mensaje del usuario y el estado operativo en tiempo real (Ingresos Netos, Tasa de Conversión, Reservas activas y muestras de PNRs).
