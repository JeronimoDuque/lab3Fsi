# 📊 CRM Sales Intelligence Dashboard (B2B SaaS MVP)

MVP de **Dashboard de CRM enfocado en la toma de decisiones rápidas** para un Responsable de Ventas (VP / Head of Sales). Permite monitorear en tiempo real el rendimiento del equipo, la velocidad del pipeline y el estado de los ingresos.

Diseñado siguiendo estrictamente la **referencia visual provista**: estilo minimalista, bordes amplios (`rounded-3xl` / `rounded-2xl`), sombras suaves difusas, fondo crema/hueso (`#fbfbfa`), tarjetas blancas y acentos en **naranja/coral** para ingresos y llamados a la acción, **verde esmeralda** para tratos ganados e insights positivos, y **azul/índigo** para métricas operativas.

---

## 🚀 Cómo Ejecutar el Proyecto

Tienes **dos opciones** listas para usar:

### Opción 1: Ejecución Inmediata sin Instalación (Recomendado)
Simplemente haz **doble clic** en el archivo:
```text
index.html
```
o ábrelo con cualquier navegador web (Chrome, Edge, Firefox, Safari).  
*No requiere `node`, ni `npm`, ni compilación previa. Se ejecuta al 100% en el navegador con React 18, Tailwind CSS y Babel.*

### Opción 2: Proyecto Modular React + Vite
Si deseas ejecutarlo dentro de un entorno de desarrollo Node.js estándar:
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```

---

## 📁 Estructura del Proyecto

```text
lab3Fsi/
├── mockData.js                  # 📦 Archivo central de Datos Simulados (ESM)
├── index.html                   # 🌐 Aplicación SPA autocontenida lista para abrir en navegador
├── README.md                    # 📖 Documentación técnica y fórmulas
├── estructura de datos.md       # 📋 Especificación original de entidades
├── package.json                 # ⚙️ Configuración NPM (React 18, Lucide, Tailwind)
├── vite.config.js               # ⚡ Configuración Vite
├── tailwind.config.js           # 🎨 Configuración de paleta de colores y tokens de diseño
└── src/
    ├── main.jsx                 # Punto de entrada React
    ├── App.jsx                  # Orquestador principal, estado dinámico y lógica reactiva
    ├── index.css                # Directivas Tailwind y estilos de scrollbar
    ├── mockData.js              # Datos simulados para consumo modular
    └── components/
        ├── Sidebar.jsx          # Barra lateral de navegación con estilo fiel a la referencia
        ├── Header.jsx           # Título, selector de fechas ("1 Jun - 30 Jun 2026") y botón "+ New Deal"
        ├── InsightBanner.jsx    # Banner superior verde de insights automáticos
        ├── KPICards.jsx         # 4 KPIs calculados dinámicamente sobre el array de deals
        ├── PipelineStageChart.jsx # Gráfico principal de barras (Ingresos por etapa)
        ├── RevenueOverTimeChart.jsx # Gráfico secundario de líneas (Evolución de ventas vs cuota)
        ├── RepsLeaderboard.jsx  # Leaderboard de rendimiento de vendedores (Attainment & Win Rate)
        ├── IndustryBreakdown.jsx # Desglose de composición del pipeline por industria
        ├── DealsTable.jsx       # Tabla de oportunidades con dropdown para cambiar estado en vivo
        └── NewDealModal.jsx     # Modal interactivo para registrar nuevas oportunidades
```

---

## 🧮 Lógica de Negocio y Fórmulas de KPIs (100% Dinámicos)

**Ningún KPI ni gráfico contiene texto o métricas estáticas.** Todos se calculan en tiempo de ejecución a partir del array reactivo de `deals`:

| KPI | Fórmula / Lógica | Descripción |
| :--- | :--- | :--- |
| **Total Revenue** | `∑ deal.amount WHERE deal.status === 'won'` | Suma total del valor monetario de todos los tratos cerrados ganados. |
| **Active Deals** | `COUNT(deal) WHERE deal.status === 'open'` | Cantidad de oportunidades comerciales actualmente en negociación activa. |
| **Active Pipeline Value** | `∑ deal.amount WHERE deal.status === 'open'` | Valor total en riesgo / negociación en el pipeline abierto. |
| **Win Rate** | `(won_count / (won_count + lost_count)) * 100` | Porcentaje de tratos ganados sobre el total de tratos cerrados con resolución. |
| **Avg Deal Size** | `Total Revenue / won_count` | Ticket promedio de venta en tratos ganados. |
| **Revenue Growth** | `((may_rev - apr_rev) / apr_rev) * 100` | Comparativa porcentual real de ingresos cerrados respecto al mes anterior. |

> 💡 **Prueba de Reactividad:** En la tabla inferior de **Top Deals**, cambia el selector de estado de cualquier trato (por ejemplo, de `Open` a `Won` o a `Lost`). Observarás cómo:
> 1. El **Total Revenue** aumenta o disminuye instantáneamente.
> 2. El **Win Rate** se recalcula automáticamente.
> 3. Las barras del **Pipeline Stage** se redimensionan en tiempo real.
> 4. La curva del gráfico de **Sales Evolution** ajusta sus puntos.
> 5. El ranking de vendedores (**Leaderboard**) actualiza la posición del comercial.

---

## 📊 Gráficos Implementados

### 1. Gráfico Principal (Barras): Revenue by Pipeline Stage
* **Eje X:** Etapas ordenadas según `display_order` (`Prospect`, `Lead`, `Negotiation`, `Closed Won`, `Closed Lost`).
* **Eje Y:** Suma acumulada de `amount` en miles de euros (€k).
* **Colores de Etapa:**
  * `Prospect`: Slate suave (`#94a3b8`)
  * `Lead`: Índigo / Azul (`#6366f1`)
  * `Negotiation`: **Naranja Coral vibrante** (`#ea580c`), fiel al diseño de referencia.
  * `Closed Won`: **Verde Esmeralda** (`#10b981`).
  * `Closed Lost`: **Rojo Suave** (`#f43f5e`).

### 2. Gráfico Secundario (Línea): Sales Evolution Over Time
* Muestra la evolución temporal de ventas ganadas vs la cuota mensual del equipo.
* Incluye selector de granularidad: `D` (Día), `W` (Semana), `M` (Mes) como en la interfaz de referencia.
* Curva con degradado suave en verde esmeralda y línea punteada para el target de cuota.

### 3. Leaderboard de Rendimiento de Vendedores
* Inspirado en la tarjeta *"Brand Performance Leaderboard"* de la referencia visual.
* Clasifica a los comerciales por volumen de ventas ganadas, porcentaje de cumplimiento de cuota (`attainment %`) y tasa de cierre individual.

### 4. Pipeline Composition by Industry
* Inspirado en *"Reference Sources Composition"*.
* Barras horizontales redondeadas que muestran la distribución de ingresos por sector del cliente (SaaS, FinTech, Healthcare, Logistics, etc.).

---

## 🧱 Estructura de Datos (Mock Data)

El archivo `mockData.js` exporta 4 entidades estrictamente normalizadas según `estructura de datos.md`:

1. **`users` (5 vendedores):**
   * Identificador único (`u1`, `u2`, ...), nombre completo, email corporativo, rol (`sales_rep` / `manager`), avatar realista de alta resolución, cuota mensual asignada (`quota_amount`) y estado.
2. **`stages` (5 etapas del pipeline):**
   * `id`, nombre visible, `display_order` secuencial, `win_probability` (%) y color temático.
3. **`customers` (10 empresas B2B):**
   * `id`, nombre corporativo, industria/sector, contacto principal, email y teléfono.
4. **`deals` (28 oportunidades realistas):**
   * `id`, título del contrato, claves foráneas (`customer_id`, `owner_id`, `stage_id`), importe (`amount`), divisa (`EUR`), estado final (`won`, `open`, `lost`), fechas ISO (`created_at`, `closed_at`, `expected_close_date`) y motivo de pérdida (`loss_reason`).

---

## 🎨 Paleta de Colores y Tokens UI

* **Fondo exterior:** `#e7e5dc` / `#f4f3ef` (tono marfil/hueso suave).
* **Superficie de Tarjetas:** `#ffffff` puro con bordes `#ecebe6`.
* **Sidebar:** `#fbfbfa` con elementos activos en peach `#ffedd5` y texto coral `#c2410c`.
* **Bordes redondeados:** `rounded-[28px]` exterior y `rounded-2xl` (16px) en tarjetas interiores.
* **Sombras:** `0 4px 20px -2px rgba(0, 0, 0, 0.04)`.
* **Tipografía:** Inter / Sans-serif moderna de alta legibilidad.
