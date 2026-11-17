/**
 * Mock Data para Dashboard de Aerolínea: Métricas de Reserva, Conversión y Check-in
 * 
 * Basado estrictamente en 'estructura de datos.md' y los procesos BPMN de:
 * - Proceso 2: Reserva y Emisión de Tiquetes (Embudo y Pasarela de Pagos)
 * - Proceso 3: Check-in, Asignación de Asientos y Equipaje Adicional (Ancillaries)
 * - Métricas Transversales: Latencia de Sistema y Notificaciones
 */

export const flights = [
  {
    id: "f1",
    flight_number: "AV120",
    origin: "BOG",
    destination: "MIA",
    departure_time: "2024-06-15T07:30:00Z",
    arrival_time: "2024-06-15T12:15:00Z",
    base_price: 340.00,
    total_capacity: 180,
    available_seats: 14,
    status: "scheduled"
  },
  {
    id: "f2",
    flight_number: "AV244",
    origin: "MDE",
    destination: "MAD",
    departure_time: "2024-06-15T18:40:00Z",
    arrival_time: "2024-06-16T11:20:00Z",
    base_price: 680.00,
    total_capacity: 250,
    available_seats: 8,
    status: "scheduled"
  },
  {
    id: "f3",
    flight_number: "LA402",
    origin: "BOG",
    destination: "CLO",
    departure_time: "2024-06-16T09:10:00Z",
    arrival_time: "2024-06-16T10:05:00Z",
    base_price: 95.00,
    total_capacity: 150,
    available_seats: 32,
    status: "scheduled"
  },
  {
    id: "f4",
    flight_number: "AV8520",
    origin: "MDE",
    destination: "CTG",
    departure_time: "2024-06-16T14:00:00Z",
    arrival_time: "2024-06-16T15:10:00Z",
    base_price: 110.00,
    total_capacity: 160,
    available_seats: 0, // Vuelo agotado para medir "Sin disponibilidad"
    status: "scheduled"
  },
  {
    id: "f5",
    flight_number: "AV940",
    origin: "BOG",
    destination: "CUN",
    departure_time: "2024-06-17T11:30:00Z",
    arrival_time: "2024-06-17T16:00:00Z",
    base_price: 290.00,
    total_capacity: 180,
    available_seats: 22,
    status: "scheduled"
  }
];

export const passengers = [
  {
    id: "p1",
    first_name: "Andrés",
    last_name: "Mejía",
    document_type: "CC",
    document_number: "1020455890",
    email: "andres.mejia@gmail.com",
    phone: "+57 300 456 7890",
    created_at: "2024-05-10T08:00:00Z"
  },
  {
    id: "p2",
    first_name: "Camila",
    last_name: "Restrepo",
    document_type: "PASSPORT",
    document_number: "PA8994321",
    email: "camila.restrepo@outlook.com",
    phone: "+57 312 987 6543",
    created_at: "2024-05-12T10:30:00Z"
  },
  {
    id: "p3",
    first_name: "Mateo",
    last_name: "García",
    document_type: "CC",
    document_number: "71289456",
    email: "mgarcia@techcorp.io",
    phone: "+57 315 223 9988",
    created_at: "2024-05-15T14:20:00Z"
  },
  {
    id: "p4",
    first_name: "Valentina",
    last_name: "Castro",
    document_type: "CC",
    document_number: "1037654123",
    email: "valencastro@gmail.com",
    phone: "+57 318 667 1122",
    created_at: "2024-05-18T09:15:00Z"
  },
  {
    id: "p5",
    first_name: "David",
    last_name: "Fernández",
    document_type: "PASSPORT",
    document_number: "ESP441209",
    email: "dfernandez@madrid.es",
    phone: "+34 612 345 678",
    created_at: "2024-05-20T16:45:00Z"
  }
];

// Estadísticas globales de búsquedas para el embudo de conversión
export const searchMetrics = {
  totalSearches: 4850,
  searchesWithAvailability: 4220, // 87.0% Tasa de Disponibilidad
  searchesNoAvailability: 630,    // 13.0% Sin disponibilidad
  targetSearches: 5000
};

export const bookings = [
  {
    id: "b1",
    reservation_code: "X7K9P2",
    flight_id: "f1",
    passenger_id: "p1",
    fare_type: "classic",
    total_amount: 340.00,
    currency: "USD",
    status: "checked_in",
    created_at: "2024-06-01T10:00:00Z",
    confirmed_at: "2024-06-01T10:05:00Z"
  },
  {
    id: "b2",
    reservation_code: "AB34Q1",
    flight_id: "f2",
    passenger_id: "p2",
    fare_type: "flex",
    total_amount: 680.00,
    currency: "USD",
    status: "confirmed",
    created_at: "2024-06-01T11:20:00Z",
    confirmed_at: "2024-06-01T11:28:00Z"
  },
  {
    id: "b3",
    reservation_code: "M9K2L8",
    flight_id: "f3",
    passenger_id: "p3",
    fare_type: "basic",
    total_amount: 95.00,
    currency: "USD",
    status: "cancelled", // Cancela post-emisión (devolución)
    created_at: "2024-06-02T09:15:00Z",
    confirmed_at: "2024-06-02T09:20:00Z",
    cancelled_at: "2024-06-03T14:30:00Z"
  },
  {
    id: "b4",
    reservation_code: "PL55T9",
    flight_id: "f1",
    passenger_id: "p4",
    fare_type: "flex",
    total_amount: 410.00,
    currency: "USD",
    status: "checked_in",
    created_at: "2024-06-02T14:00:00Z",
    confirmed_at: "2024-06-02T14:08:00Z"
  },
  {
    id: "b5",
    reservation_code: "ZQ88W4",
    flight_id: "f2",
    passenger_id: "p5",
    fare_type: "classic",
    total_amount: 720.00,
    currency: "USD",
    status: "confirmed",
    created_at: "2024-06-03T08:45:00Z",
    confirmed_at: "2024-06-03T08:52:00Z"
  },
  {
    id: "b6",
    reservation_code: "CV12R7",
    flight_id: "f5",
    passenger_id: "p1",
    fare_type: "basic",
    total_amount: 290.00,
    currency: "USD",
    status: "cancelled", // Cancelación post-emisión
    created_at: "2024-06-03T16:10:00Z",
    confirmed_at: "2024-06-03T16:15:00Z",
    cancelled_at: "2024-06-04T10:00:00Z"
  },
  {
    id: "b7",
    reservation_code: "NW91K3",
    flight_id: "f3",
    passenger_id: "p2",
    fare_type: "classic",
    total_amount: 125.00,
    currency: "USD",
    status: "checked_in",
    created_at: "2024-06-04T11:00:00Z",
    confirmed_at: "2024-06-04T11:05:00Z"
  },
  {
    id: "b8",
    reservation_code: "TR44Y6",
    flight_id: "f1",
    passenger_id: "p3",
    fare_type: "classic",
    total_amount: 340.00,
    currency: "USD",
    status: "confirmed",
    created_at: "2024-06-04T15:30:00Z",
    confirmed_at: "2024-06-04T15:42:00Z"
  },
  {
    id: "b9",
    reservation_code: "GH77P0",
    flight_id: "f5",
    passenger_id: "p4",
    fare_type: "flex",
    total_amount: 360.00,
    currency: "USD",
    status: "checked_in",
    created_at: "2024-06-05T09:20:00Z",
    confirmed_at: "2024-06-05T09:25:00Z"
  },
  {
    id: "b10",
    reservation_code: "LK33M5",
    flight_id: "f2",
    passenger_id: "p5",
    fare_type: "flex",
    total_amount: 810.00,
    currency: "USD",
    status: "confirmed",
    created_at: "2024-06-05T13:40:00Z",
    confirmed_at: "2024-06-05T13:50:00Z"
  },
  {
    id: "b11",
    reservation_code: "OP66D2",
    flight_id: "f1",
    passenger_id: "p2",
    fare_type: "basic",
    total_amount: 280.00,
    currency: "USD",
    status: "checked_in",
    created_at: "2024-06-06T10:15:00Z",
    confirmed_at: "2024-06-06T10:20:00Z"
  },
  {
    id: "b12",
    reservation_code: "QW99X8",
    flight_id: "f3",
    passenger_id: "p4",
    fare_type: "classic",
    total_amount: 115.00,
    currency: "USD",
    status: "confirmed",
    created_at: "2024-06-06T16:00:00Z",
    confirmed_at: "2024-06-06T16:08:00Z"
  },
  {
    id: "b13",
    reservation_code: "MN44Z1",
    flight_id: "f2",
    passenger_id: "p1",
    fare_type: "classic",
    total_amount: 690.00,
    currency: "USD",
    status: "cancelled", // Cancelación post-emisión
    created_at: "2024-06-07T08:30:00Z",
    confirmed_at: "2024-06-07T08:38:00Z",
    cancelled_at: "2024-06-07T17:00:00Z"
  },
  {
    id: "b14",
    reservation_code: "RT88V9",
    flight_id: "f5",
    passenger_id: "p3",
    fare_type: "flex",
    total_amount: 375.00,
    currency: "USD",
    status: "checked_in",
    created_at: "2024-06-07T12:00:00Z",
    confirmed_at: "2024-06-07T12:10:00Z"
  },
  {
    id: "b15",
    reservation_code: "KJ55C4",
    flight_id: "f1",
    passenger_id: "p5",
    fare_type: "classic",
    total_amount: 340.00,
    currency: "USD",
    status: "confirmed",
    created_at: "2024-06-08T09:00:00Z",
    confirmed_at: "2024-06-08T09:12:00Z"
  }
];

export const payments = [
  // Intentos iniciales aprobados
  { id: "pay1", booking_id: "b1", transaction_type: "ticket_payment", amount: 340.00, currency: "USD", payment_method: "credit_card", attempt_number: 1, is_retry: false, status: "approved", processed_at: "2024-06-01T10:05:00Z" },
  
  // Caso de reintento exitoso: Intento 1 rechazado por fondos_insuficientes ➔ Intento 2 aprobado
  { id: "pay2_fail", booking_id: "b2", transaction_type: "ticket_payment", amount: 680.00, currency: "USD", payment_method: "credit_card", attempt_number: 1, is_retry: false, status: "rejected", rejection_reason: "fondos_insuficientes", processed_at: "2024-06-01T11:22:00Z" },
  { id: "pay2_ok", booking_id: "b2", transaction_type: "ticket_payment", amount: 680.00, currency: "USD", payment_method: "debit_card", attempt_number: 2, is_retry: true, status: "approved", processed_at: "2024-06-01T11:28:00Z" },

  // b3 aprobado luego cancelado (reembolso)
  { id: "pay3", booking_id: "b3", transaction_type: "ticket_payment", amount: 95.00, currency: "USD", payment_method: "credit_card", attempt_number: 1, is_retry: false, status: "approved", processed_at: "2024-06-02T09:20:00Z" },
  { id: "ref3", booking_id: "b3", transaction_type: "refund", amount: 95.00, currency: "USD", payment_method: "credit_card", attempt_number: 1, is_retry: false, status: "refunded", processed_at: "2024-06-03T14:35:00Z" },

  // b4 aprobado primer intento
  { id: "pay4", booking_id: "b4", transaction_type: "ticket_payment", amount: 410.00, currency: "USD", payment_method: "apple_pay", attempt_number: 1, is_retry: false, status: "approved", processed_at: "2024-06-02T14:08:00Z" },

  // Caso de rechazo con reintento exitoso
  { id: "pay5_fail", booking_id: "b5", transaction_type: "ticket_payment", amount: 720.00, currency: "USD", payment_method: "credit_card", attempt_number: 1, is_retry: false, status: "rejected", rejection_reason: "bloqueo_seguridad_banco", processed_at: "2024-06-03T08:46:00Z" },
  { id: "pay5_ok", booking_id: "b5", transaction_type: "ticket_payment", amount: 720.00, currency: "USD", payment_method: "credit_card", attempt_number: 2, is_retry: true, status: "approved", processed_at: "2024-06-03T08:52:00Z" },

  // b6 aprobado y luego reembolsado
  { id: "pay6", booking_id: "b6", transaction_type: "ticket_payment", amount: 290.00, currency: "USD", payment_method: "debit_card", attempt_number: 1, is_retry: false, status: "approved", processed_at: "2024-06-03T16:15:00Z" },
  { id: "ref6", booking_id: "b6", transaction_type: "refund", amount: 290.00, currency: "USD", payment_method: "debit_card", attempt_number: 1, is_retry: false, status: "refunded", processed_at: "2024-06-04T10:05:00Z" },

  // b7 y b8 aprobados
  { id: "pay7", booking_id: "b7", transaction_type: "ticket_payment", amount: 125.00, currency: "USD", payment_method: "pse", attempt_number: 1, is_retry: false, status: "approved", processed_at: "2024-06-04T11:05:00Z" },
  { id: "pay8", booking_id: "b8", transaction_type: "ticket_payment", amount: 340.00, currency: "USD", payment_method: "credit_card", attempt_number: 1, is_retry: false, status: "approved", processed_at: "2024-06-04T15:42:00Z" },

  // Pagos por Equipaje Adicional en Check-in (Ancillary Revenue $)
  { id: "anc1", booking_id: "b1", transaction_type: "extra_baggage", amount: 45.00, currency: "USD", payment_method: "credit_card", attempt_number: 1, is_retry: false, status: "approved", processed_at: "2024-06-15T05:30:00Z" },
  { id: "anc4", booking_id: "b4", transaction_type: "extra_baggage", amount: 90.00, currency: "USD", payment_method: "apple_pay", attempt_number: 1, is_retry: false, status: "approved", processed_at: "2024-06-15T06:15:00Z" },
  { id: "anc9", booking_id: "b9", transaction_type: "extra_baggage", amount: 45.00, currency: "USD", payment_method: "credit_card", attempt_number: 1, is_retry: false, status: "approved", processed_at: "2024-06-17T09:40:00Z" },
  { id: "anc14", booking_id: "b14", transaction_type: "extra_baggage", amount: 45.00, currency: "USD", payment_method: "debit_card", attempt_number: 1, is_retry: false, status: "approved", processed_at: "2024-06-07T12:08:00Z" }
];

export const checkIns = [
  {
    id: "chk1",
    booking_id: "b1",
    seat_number: "14A",
    seat_class: "economy",
    has_extra_baggage: true,
    extra_baggage_count: 1,
    extra_baggage_amount: 45.00,
    boarding_pass_code: "BP-AV120-X7K9P2-14A",
    boarding_gate: "B12",
    is_valid_booking: true,
    started_at: "2024-06-15T05:28:10Z",
    completed_at: "2024-06-15T05:29:45Z",
    duration_seconds: 95 // 1m 35s
  },
  {
    id: "chk4",
    booking_id: "b4",
    seat_number: "03F",
    seat_class: "business",
    has_extra_baggage: true,
    extra_baggage_count: 2,
    extra_baggage_amount: 90.00,
    boarding_pass_code: "BP-AV120-PL55T9-03F",
    boarding_gate: "B12",
    is_valid_booking: true,
    started_at: "2024-06-15T06:12:00Z",
    completed_at: "2024-06-15T06:14:10Z",
    duration_seconds: 130 // 2m 10s
  },
  {
    id: "chk7",
    booking_id: "b7",
    seat_number: "08C",
    seat_class: "economy",
    has_extra_baggage: false,
    extra_baggage_count: 0,
    extra_baggage_amount: 0.00,
    boarding_pass_code: "BP-LA402-NW91K3-08C",
    boarding_gate: "A04",
    is_valid_booking: true,
    started_at: "2024-06-16T07:05:00Z",
    completed_at: "2024-06-16T07:06:15Z",
    duration_seconds: 75 // 1m 15s
  },
  {
    id: "chk9",
    booking_id: "b9",
    seat_number: "12B",
    seat_class: "exit_row",
    has_extra_baggage: true,
    extra_baggage_count: 1,
    extra_baggage_amount: 45.00,
    boarding_pass_code: "BP-AV940-GH77P0-12B",
    boarding_gate: "C08",
    is_valid_booking: true,
    started_at: "2024-06-17T09:38:00Z",
    completed_at: "2024-06-17T09:39:50Z",
    duration_seconds: 110 // 1m 50s
  },
  {
    id: "chk11",
    booking_id: "b11",
    seat_number: "18D",
    seat_class: "economy",
    has_extra_baggage: false,
    extra_baggage_count: 0,
    extra_baggage_amount: 0.00,
    boarding_pass_code: "BP-AV120-OP66D2-18D",
    boarding_gate: "B12",
    is_valid_booking: true,
    started_at: "2024-06-15T05:50:00Z",
    completed_at: "2024-06-15T05:51:20Z",
    duration_seconds: 80 // 1m 20s
  },
  {
    id: "chk14",
    booking_id: "b14",
    seat_number: "05A",
    seat_class: "business",
    has_extra_baggage: true,
    extra_baggage_count: 1,
    extra_baggage_amount: 45.00,
    boarding_pass_code: "BP-AV940-RT88V9-05A",
    boarding_gate: "C08",
    is_valid_booking: true,
    started_at: "2024-06-17T09:10:00Z",
    completed_at: "2024-06-17T09:11:55Z",
    duration_seconds: 115 // 1m 55s
  }
];

// Registro de intentos de Check-in para medir Tasa de Error en Validación
export const checkInValidationStats = {
  totalAttempts: 1240,
  successfulValidations: 1188, // 95.8% válidos
  failedValidations: 52,        // 4.2% Tasa de Error en Validación
  completedPasses: 1152        // 92.9% Tasa de Finalización de Check-in
};

// Métricas de Pasarela de Pago Semanal (Gráfico de Barras Apiladas)
export const weeklyPaymentTrends = [
  { period: "Lun", approvedFirst: 142, approvedRetry: 28, rejected: 18 },
  { period: "Mar", approvedFirst: 165, approvedRetry: 34, rejected: 22 },
  { period: "Mié", approvedFirst: 180, approvedRetry: 38, rejected: 25 },
  { period: "Jue", approvedFirst: 195, approvedRetry: 42, rejected: 24 },
  { period: "Vie", approvedFirst: 230, approvedRetry: 51, rejected: 31 },
  { period: "Sáb", approvedFirst: 210, approvedRetry: 46, rejected: 28 },
  { period: "Dom", approvedFirst: 175, approvedRetry: 35, rejected: 20 }
];

// Tendencia temporal de Check-in (Pases de abordar vs Errores de validación)
export const checkInTrends = [
  { time: "06:00", boardingPasses: 120, validationErrors: 4 },
  { time: "08:00", boardingPasses: 245, validationErrors: 11 },
  { time: "10:00", boardingPasses: 310, validationErrors: 15 },
  { time: "12:00", boardingPasses: 195, validationErrors: 8 },
  { time: "14:00", boardingPasses: 280, validationErrors: 12 },
  { time: "16:00", boardingPasses: 340, validationErrors: 16 },
  { time: "18:00", boardingPasses: 220, validationErrors: 7 }
];

// Rendimiento Técnico y Latencias de endpoints críticos
export const systemLatencies = [
  { service: "Consultar disponibilidad", latencyMs: 185, targetMs: 250, status: "optimal" },
  { service: "Procesar el pago", latencyMs: 420, targetMs: 600, status: "optimal" },
  { service: "Validar reserva (PNR)", latencyMs: 95, targetMs: 150, status: "optimal" },
  { service: "Generar pase de abordar", latencyMs: 240, targetMs: 300, status: "optimal" }
];

// Notificaciones automáticas emitidas desglosadas por tipo
export const notificationsVolume = [
  { type: "Confirmación de reserva", count: 712, color: "#10b981", desc: "Tiquete electrónico emitido" },
  { type: "Sin disponibilidad", count: 142, color: "#ea580c", desc: "Alerta de ruta llena" },
  { type: "Rechazo de pago", count: 68, color: "#f43f5e", desc: "Notificación con opción de reintento" },
  { type: "Cancelación y devolución", count: 34, color: "#6366f1", desc: "Reembolso procesado" },
  { type: "Error de validación PNR", count: 28, color: "#94a3b8", desc: "Código no encontrado en check-in" }
];

export default {
  flights,
  passengers,
  searchMetrics,
  bookings,
  payments,
  checkIns,
  checkInValidationStats,
  weeklyPaymentTrends,
  checkInTrends,
  systemLatencies,
  notificationsVolume
};
