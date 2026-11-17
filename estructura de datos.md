# Estructura de DATOS: Sistema de Reservas de Vuelos y Check-in (Aerolínea B2B SaaS)

Esta estructura soporta integralmente los procesos modelados en los diagramas de arquitectura empresarial:
* **Proceso 2: Reserva, Pago y Emisión de Tiquetes (Funnel de Conversión)**
* **Proceso 3: Check-in, Asignación de Asientos y Servicios Adicionales (Ancillaries)**
* **Métricas Transversales: Pasarela de Pagos, Latencia de Sistema y Notificaciones**

---

## 1. Tabla de Vuelos (Flights)
Almacena la oferta de vuelos programados para validar disponibilidad y gestionar tarifas dinámicas.
```json
{
  "id": "string (UUID - identificador único del vuelo)",
  "flight_number": "string (Código del vuelo, ej: 'AV123', 'LA405')",
  "origin": "string (Código IATA origen: 'BOG', 'MDE', 'CLO')",
  "destination": "string (Código IATA destino: 'MIA', 'MAD', 'CTG')",
  "departure_time": "datetime (Fecha y hora de salida)",
  "arrival_time": "datetime (Fecha y hora de llegada)",
  "base_price": "decimal (Tarifa base en USD)",
  "total_capacity": "integer (Capacidad total de asientos)",
  "available_seats": "integer (Cupos libres disponibles para la búsqueda)",
  "status": "string ('scheduled', 'delayed', 'cancelled', 'completed')"
}
```

---

## 2. Tabla de Pasajeros / Clientes (Passengers)
Identidad de los clientes que reservan y realizan el check-in.
```json
{
  "id": "string (UUID - identificador único del pasajero)",
  "first_name": "string (Nombres del pasajero)",
  "last_name": "string (Apellidos del pasajero)",
  "document_type": "string ('CC', 'PASSPORT', 'CE')",
  "document_number": "string (Número de documento)",
  "email": "string (Correo para notificaciones, e-tickets y pases de abordar)",
  "phone": "string (Teléfono de contacto)",
  "created_at": "datetime"
}
```

---

## 3. Tabla de Búsquedas y Disponibilidad (Searches)
Alimenta la **Tasa de Disponibilidad de Vuelos (%)** y el primer paso del **Embudo de Conversión**.
```json
{
  "id": "string (UUID - evento de búsqueda)",
  "origin": "string (IATA origen consultado)",
  "destination": "string (IATA destino consultado)",
  "search_date": "date (Fecha de vuelo buscada)",
  "passengers_count": "integer",
  "has_availability": "boolean (true: opciones encontradas, false: 'Sin disponibilidad')",
  "created_at": "datetime",
  "converted_to_booking_id": "string (Nullable - si avanzó a reserva)"
}
```

---

## 4. Tabla de Reservas (Bookings)
Entidad central que controla el ciclo de vida del tiquete desde la selección hasta la emisión o cancelación.
```json
{
  "id": "string (UUID - identificador único)",
  "reservation_code": "string (Código PNR de 6 caracteres alfanumérico, ej: 'X7K9P2')",
  "flight_id": "string (Foreign Key -> Flights)",
  "passenger_id": "string (Foreign Key -> Passengers)",
  "fare_type": "string ('basic', 'classic', 'flex')",
  "total_amount": "decimal (Monto bruto facturado)",
  "currency": "string ('USD')",
  "status": "string ('pending_payment', 'confirmed', 'cancelled', 'checked_in')",
  "created_at": "datetime (Momento de creación de la reserva)",
  "confirmed_at": "datetime (Nullable - Emisión exitosa del tiquete)",
  "cancelled_at": "datetime (Nullable - Si el cliente cancela post-emisión)"
}
```

---

## 5. Tabla de Pagos, Reintentos y Reembolsos (Payments)
Soporta la **Tasa de Rechazo de Pagos**, la **Tasa de Recuperación por Reintento** y el **Monto en Devoluciones**.
```json
{
  "id": "string (UUID de la transacción)",
  "booking_id": "string (Foreign Key -> Bookings)",
  "transaction_type": "string ('ticket_payment', 'extra_baggage', 'refund')",
  "amount": "decimal (Valor de la transacción)",
  "currency": "string ('USD')",
  "payment_method": "string ('credit_card', 'debit_card', 'pse', 'apple_pay')",
  "attempt_number": "integer (1 para primer intento, 2+ para reintentos)",
  "is_retry": "boolean (true si viene del bucle 'reintentar pago')",
  "status": "string ('approved', 'rejected', 'refunded')",
  "rejection_reason": "string (Nullable: 'fondos_insuficientes', 'bloqueo_banco', 'timeout')",
  "processed_at": "datetime"
}
```

---

## 6. Tabla de Check-in y Pases de Abordar (Check_Ins)
Registra la validación de reserva, la selección de asiento, el equipaje adicional y la emisión del pase de abordar.
```json
{
  "id": "string (UUID del check-in)",
  "booking_id": "string (Foreign Key -> Bookings)",
  "seat_number": "string (Silla asignada, ej: '12A', '14F')",
  "seat_class": "string ('economy', 'business', 'exit_row')",
  "has_extra_baggage": "boolean (Decisión '¿Equipaje adicional?')",
  "extra_baggage_count": "integer (Cantidad de maletas adicionales compradas)",
  "extra_baggage_amount": "decimal (Ancillary Revenue recaudado por equipaje)",
  "boarding_pass_code": "string (Código QR / barras del pase de abordar emitido)",
  "boarding_gate": "string (Puerta de embarque)",
  "is_valid_booking": "boolean (true si pasó la compuerta '¿Reserva válida?', false si falló)",
  "started_at": "datetime (Momento de ingresar el código PNR)",
  "completed_at": "datetime (Momento de emitir y entregar pase de abordar)",
  "duration_seconds": "integer (Tiempo transcurrido en completar el check-in)"
}
```

---

## 7. Tabla de Notificaciones Emitidas (System_Notifications)
Conteo y trazabilidad de alertas automáticas enviadas al usuario en puntos de decisión críticos.
```json
{
  "id": "string (UUID)",
  "type": "string ('no_availability', 'payment_rejected', 'booking_confirmed', 'cancellation_refund', 'validation_error')",
  "recipient_email": "string",
  "channel": "string ('email', 'sms', 'push')",
  "sent_at": "datetime",
  "status": "string ('delivered', 'bounced')"
}
```

---

## 8. Tabla de Métricas de Latencia Técnica (System_Latencies)
Rendimiento en milisegundos de los puntos de interacción crítica del sistema:
```json
{
  "service_endpoint": "string ('consultar_disponibilidad', 'procesar_pago', 'validar_reserva', 'generar_pase_abordar')",
  "avg_latency_ms": "integer",
  "p95_latency_ms": "integer",
  "status": "string ('optimal', 'degraded', 'critical')"
}
```

---

## 🧮 Fórmulas de las Métricas del Dashboard

1. **Tasa de Disponibilidad de Vuelos (%):**  
   $$\frac{\text{Búsquedas con disponibilidad}}{\text{Total de búsquedas}} \times 100$$
2. **Tasa de Conversión Búsqueda a Reserva (%):**  
   $$\frac{\text{Reservas confirmadas y emitidas}}{\text{Total de búsquedas}} \times 100$$
3. **Tasa de Rechazo de Pagos (%):**  
   $$\frac{\text{Transacciones rechazadas}}{\text{Total transacciones de pago}} \times 100$$
4. **Tasa de Recuperación por Reintento (%):**  
   $$\frac{\text{Pagos aprobados en intento } \ge 2}{\text{Pagos inicialmente rechazados en intento 1}} \times 100$$
5. **Tasa de Cancelación Post-Emisión (%):**  
   $$\frac{\text{Reservas canceladas}}{\text{Total reservas confirmadas}} \times 100$$
6. **Ingresos Netos por Ventas ($):**  
   $$\sum \text{Pagos Tiquetes Aprobados} - \sum \text{Reembolsos por Cancelación}$$
7. **Tasa de Error en Validación de Reserva (%):**  
   $$\frac{\text{Intentos con '¿Reserva válida?' = NO}}{\text{Total intentos de check-in}} \times 100$$
8. **Tasa de Adopción de Equipaje Adicional (%):**  
   $$\frac{\text{Check-ins con equipaje adicional}}{\text{Total check-ins completados}} \times 100$$
9. **Ingresos por Equipaje Adicional (Ancillary Revenue $):**  
   $$\sum \text{extra\_baggage\_amount en Check-ins}$$
10. **Tasa de Finalización de Check-in (%):**  
    $$\frac{\text{Check-ins con pase de abordar generado}}{\text{Intentos de check-in iniciados}} \times 100$$
11. **Tiempo Promedio de Check-in:**  
    $$\text{PROMEDIO}(\text{duration\_seconds en Check-ins completados})$$
