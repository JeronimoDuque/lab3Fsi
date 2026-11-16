/**
 * Mock Data para CRM Sales Dashboard
 * 
 * Cumple estrictamente con el esquema definido en 'estructura de datos.md':
 * 1. users: Equipo de ventas con cuota mensual y avatares.
 * 2. stages: Etapas del pipeline con orden y probabilidad de cierre.
 * 3. customers: Clientes B2B con sector industrial y contacto.
 * 4. deals: Oportunidades de venta (tabla central de hechos).
 */

export const users = [
  {
    id: "u1",
    full_name: "Ana García",
    email: "ana.garcia@salescorp.io",
    role: "sales_rep",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
    quota_amount: 85000,
    status: "active"
  },
  {
    id: "u2",
    full_name: "Carlos Mendoza",
    email: "carlos.mendoza@salescorp.io",
    role: "sales_rep",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    quota_amount: 80000,
    status: "active"
  },
  {
    id: "u3",
    full_name: "Elena Ramos",
    email: "elena.ramos@salescorp.io",
    role: "sales_rep",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    quota_amount: 90000,
    status: "active"
  },
  {
    id: "u4",
    full_name: "Javier Morales",
    email: "javier.morales@salescorp.io",
    role: "sales_rep",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    quota_amount: 75000,
    status: "active"
  },
  {
    id: "u5",
    full_name: "Sofía Chen",
    email: "sofia.chen@salescorp.io",
    role: "manager",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
    quota_amount: 110000,
    status: "active"
  }
];

export const stages = [
  {
    id: "s1",
    name: "Prospect",
    display_order: 1,
    win_probability: 10,
    color: "#94a3b8" // Slate
  },
  {
    id: "s2",
    name: "Lead",
    display_order: 2,
    win_probability: 30,
    color: "#6366f1" // Indigo / Azul
  },
  {
    id: "s3",
    name: "Negotiation",
    display_order: 3,
    win_probability: 60,
    color: "#ea580c" // Coral / Naranja vibrante de la imagen
  },
  {
    id: "s4",
    name: "Closed Won",
    display_order: 4,
    win_probability: 100,
    color: "#10b981" // Verde esmeralda de la imagen
  },
  {
    id: "s5",
    name: "Closed Lost",
    display_order: 5,
    win_probability: 0,
    color: "#f43f5e" // Rosa / Rojo suave
  }
];

export const customers = [
  {
    id: "c1",
    company_name: "TechSolutions SL",
    industry: "Software & SaaS",
    contact_person: "Carlos Ruiz",
    email: "cruiz@techsolutions.es",
    phone: "+34 912 345 678",
    created_at: "2024-01-10T09:00:00Z"
  },
  {
    id: "c2",
    company_name: "Nexus Retail Global",
    industry: "Retail & E-commerce",
    contact_person: "Marta Gómez",
    email: "mgomez@nexusretail.com",
    phone: "+34 933 219 876",
    created_at: "2024-01-15T11:30:00Z"
  },
  {
    id: "c3",
    company_name: "FinEdge Payments",
    industry: "FinTech",
    contact_person: "Diego Alarcón",
    email: "dalarcon@finedge.io",
    phone: "+34 911 884 210",
    created_at: "2024-02-01T14:15:00Z"
  },
  {
    id: "c4",
    company_name: "MedHealth Diagnostics",
    industry: "Healthcare",
    contact_person: "Dra. Lucía Beltrán",
    email: "lbeltran@medhealth.org",
    phone: "+34 960 452 311",
    created_at: "2024-02-12T10:00:00Z"
  },
  {
    id: "c5",
    company_name: "CloudSync Systems",
    industry: "Cloud & DevSecOps",
    contact_person: "Raúl Ibáñez",
    email: "raul@cloudsync.tech",
    phone: "+34 917 554 322",
    created_at: "2024-02-20T16:45:00Z"
  },
  {
    id: "c6",
    company_name: "Iberica Logística 4.0",
    industry: "Logistics & Supply",
    contact_person: "Patricia Soria",
    email: "psoria@iberialog.es",
    phone: "+34 944 123 789",
    created_at: "2024-03-01T08:30:00Z"
  },
  {
    id: "c7",
    company_name: "DataBridge Analytics",
    industry: "Big Data & AI",
    contact_person: "Víctor Navas",
    email: "vnavas@databridge.ai",
    phone: "+34 954 678 901",
    created_at: "2024-03-10T12:00:00Z"
  },
  {
    id: "c8",
    company_name: "AgroTech Futura",
    industry: "AgriTech",
    contact_person: "Inés Carmona",
    email: "icarmona@agrotech.es",
    phone: "+34 968 332 114",
    created_at: "2024-03-18T15:20:00Z"
  },
  {
    id: "c9",
    company_name: "EduLearn Digital",
    industry: "EdTech",
    contact_person: "Manuel Varela",
    email: "mvarela@edulearn.net",
    phone: "+34 981 776 543",
    created_at: "2024-04-02T09:40:00Z"
  },
  {
    id: "c10",
    company_name: "CyberShield Security",
    industry: "Cybersecurity",
    contact_person: "Sara Montero",
    email: "sara@cybershield.eu",
    phone: "+34 919 008 765",
    created_at: "2024-04-14T11:10:00Z"
  }
];

export const deals = [
  {
    id: "d1",
    title: "Licencia Enterprise Anual 2024",
    customer_id: "c1",
    owner_id: "u1",
    stage_id: "s4",
    amount: 32000.00,
    currency: "EUR",
    status: "won",
    created_at: "2024-04-02T10:00:00Z",
    closed_at: "2024-04-20T14:30:00Z",
    expected_close_date: "2024-04-25"
  },
  {
    id: "d2",
    title: "Renovación Anual Suite Omnicanal",
    customer_id: "c2",
    owner_id: "u1",
    stage_id: "s3",
    amount: 18500.00,
    currency: "EUR",
    status: "open",
    created_at: "2024-05-01T09:00:00Z",
    expected_close_date: "2024-06-15"
  },
  {
    id: "d3",
    title: "Plataforma Core Banking API",
    customer_id: "c3",
    owner_id: "u3",
    stage_id: "s4",
    amount: 48000.00,
    currency: "EUR",
    status: "won",
    created_at: "2024-04-10T11:00:00Z",
    closed_at: "2024-05-04T16:00:00Z",
    expected_close_date: "2024-05-05"
  },
  {
    id: "d4",
    title: "Integración HIS Hospitalario",
    customer_id: "c4",
    owner_id: "u2",
    stage_id: "s3",
    amount: 27500.00,
    currency: "EUR",
    status: "open",
    created_at: "2024-05-05T08:30:00Z",
    expected_close_date: "2024-06-20"
  },
  {
    id: "d5",
    title: "Migración Multi-Cloud DevSecOps",
    customer_id: "c5",
    owner_id: "u4",
    stage_id: "s5",
    amount: 22000.00,
    currency: "EUR",
    status: "lost",
    created_at: "2024-03-25T14:00:00Z",
    closed_at: "2024-04-18T10:15:00Z",
    loss_reason: "competencia (precio más agresivo)"
  },
  {
    id: "d6",
    title: "Optimización Rutas TMS Flota",
    customer_id: "c6",
    owner_id: "u2",
    stage_id: "s4",
    amount: 39000.00,
    currency: "EUR",
    status: "won",
    created_at: "2024-04-12T15:20:00Z",
    closed_at: "2024-05-10T11:45:00Z",
    expected_close_date: "2024-05-15"
  },
  {
    id: "d7",
    title: "Data Lakehouse & Pipeline ETL",
    customer_id: "c7",
    owner_id: "u3",
    stage_id: "s4",
    amount: 54000.00,
    currency: "EUR",
    status: "won",
    created_at: "2024-03-15T10:40:00Z",
    closed_at: "2024-04-28T17:00:00Z",
    expected_close_date: "2024-04-30"
  },
  {
    id: "d8",
    title: "Sensores IoT y Telemetría Agrícola",
    customer_id: "c8",
    owner_id: "u4",
    stage_id: "s2",
    amount: 16000.00,
    currency: "EUR",
    status: "open",
    created_at: "2024-05-12T09:15:00Z",
    expected_close_date: "2024-06-30"
  },
  {
    id: "d9",
    title: "Campus Virtual LMS 5.000 usuarios",
    customer_id: "c9",
    owner_id: "u1",
    stage_id: "s4",
    amount: 29500.00,
    currency: "EUR",
    status: "won",
    created_at: "2024-04-05T13:00:00Z",
    closed_at: "2024-05-18T12:30:00Z",
    expected_close_date: "2024-05-20"
  },
  {
    id: "d10",
    title: "SOC Gestionado 24/7 y EDR",
    customer_id: "c10",
    owner_id: "u5",
    stage_id: "s4",
    amount: 62000.00,
    currency: "EUR",
    status: "won",
    created_at: "2024-03-20T10:00:00Z",
    closed_at: "2024-05-02T18:00:00Z",
    expected_close_date: "2024-05-05"
  },
  {
    id: "d11",
    title: "Módulo Add-on IA Predictiva",
    customer_id: "c1",
    owner_id: "u1",
    stage_id: "s3",
    amount: 14000.00,
    currency: "EUR",
    status: "open",
    created_at: "2024-05-08T16:00:00Z",
    expected_close_date: "2024-06-12"
  },
  {
    id: "d12",
    title: "Puntos de Venta Cloud 45 Tiendas",
    customer_id: "c2",
    owner_id: "u2",
    stage_id: "s4",
    amount: 36000.00,
    currency: "EUR",
    status: "won",
    created_at: "2024-04-18T10:30:00Z",
    closed_at: "2024-05-22T14:10:00Z",
    expected_close_date: "2024-05-25"
  },
  {
    id: "d13",
    title: "Gateway Antifraude y Cumplimiento",
    customer_id: "c3",
    owner_id: "u3",
    stage_id: "s3",
    amount: 31000.00,
    currency: "EUR",
    status: "open",
    created_at: "2024-05-14T11:45:00Z",
    expected_close_date: "2024-06-25"
  },
  {
    id: "d14",
    title: "Portal Paciente y Teleconsulta",
    customer_id: "c4",
    owner_id: "u4",
    stage_id: "s5",
    amount: 19000.00,
    currency: "EUR",
    status: "lost",
    created_at: "2024-03-10T14:20:00Z",
    closed_at: "2024-04-15T09:00:00Z",
    loss_reason: "falta de presupuesto en Q2"
  },
  {
    id: "d15",
    title: "Auditoría Kubernetes & CI/CD",
    customer_id: "c5",
    owner_id: "u5",
    stage_id: "s1",
    amount: 12500.00,
    currency: "EUR",
    status: "open",
    created_at: "2024-05-20T15:00:00Z",
    expected_close_date: "2024-07-15"
  },
  {
    id: "d16",
    title: "App Conductor y Prueba de Entrega",
    customer_id: "c6",
    owner_id: "u2",
    stage_id: "s2",
    amount: 15500.00,
    currency: "EUR",
    status: "open",
    created_at: "2024-05-16T12:10:00Z",
    expected_close_date: "2024-07-01"
  },
  {
    id: "d17",
    title: "Cuadro de Mando Ejecutivo PowerBI",
    customer_id: "c7",
    owner_id: "u3",
    stage_id: "s4",
    amount: 26000.00,
    currency: "EUR",
    status: "won",
    created_at: "2024-04-22T09:00:00Z",
    closed_at: "2024-05-25T16:40:00Z",
    expected_close_date: "2024-05-30"
  },
  {
    id: "d18",
    title: "Sistema Riego Automatizado",
    customer_id: "c8",
    owner_id: "u4",
    stage_id: "s1",
    amount: 9800.00,
    currency: "EUR",
    status: "open",
    created_at: "2024-05-22T10:30:00Z",
    expected_close_date: "2024-07-20"
  },
  {
    id: "d19",
    title: "Proctoring Seguro para Exámenes",
    customer_id: "c9",
    owner_id: "u1",
    stage_id: "s5",
    amount: 14500.00,
    currency: "EUR",
    status: "lost",
    created_at: "2024-04-01T11:00:00Z",
    closed_at: "2024-05-02T10:30:00Z",
    loss_reason: "decision retrasada al próximo año académico"
  },
  {
    id: "d20",
    title: "Pentesting y Simulación Red Team",
    customer_id: "c10",
    owner_id: "u5",
    stage_id: "s3",
    amount: 24000.00,
    currency: "EUR",
    status: "open",
    created_at: "2024-05-11T13:40:00Z",
    expected_close_date: "2024-06-18"
  },
  {
    id: "d21",
    title: "Migración Base de Datos Oracle a Postgres",
    customer_id: "c1",
    owner_id: "u2",
    stage_id: "s4",
    amount: 41000.00,
    currency: "EUR",
    status: "won",
    created_at: "2024-03-30T10:00:00Z",
    closed_at: "2024-05-15T15:20:00Z",
    expected_close_date: "2024-05-20"
  },
  {
    id: "d22",
    title: "Recomendador Personalizado E-commerce",
    customer_id: "c2",
    owner_id: "u3",
    stage_id: "s2",
    amount: 21500.00,
    currency: "EUR",
    status: "open",
    created_at: "2024-05-18T14:15:00Z",
    expected_close_date: "2024-07-10"
  },
  {
    id: "d23",
    title: "Infraestructura B2B Open Banking",
    customer_id: "c3",
    owner_id: "u5",
    stage_id: "s4",
    amount: 58000.00,
    currency: "EUR",
    status: "won",
    created_at: "2024-04-05T09:30:00Z",
    closed_at: "2024-05-28T17:15:00Z",
    expected_close_date: "2024-05-30"
  },
  {
    id: "d24",
    title: "Interconexión Laboratorios Clínicos",
    customer_id: "c4",
    owner_id: "u4",
    stage_id: "s1",
    amount: 17200.00,
    currency: "EUR",
    status: "open",
    created_at: "2024-05-24T16:00:00Z",
    expected_close_date: "2024-07-25"
  },
  {
    id: "d25",
    title: "Contenedores Docker y Orquestación",
    customer_id: "c5",
    owner_id: "u1",
    stage_id: "s4",
    amount: 23000.00,
    currency: "EUR",
    status: "won",
    created_at: "2024-04-14T10:00:00Z",
    closed_at: "2024-05-19T11:00:00Z",
    expected_close_date: "2024-05-22"
  },
  {
    id: "d26",
    title: "Visibilidad Cadena de Frío en Tránsito",
    customer_id: "c6",
    owner_id: "u2",
    stage_id: "s3",
    amount: 28500.00,
    currency: "EUR",
    status: "open",
    created_at: "2024-05-15T08:50:00Z",
    expected_close_date: "2024-06-28"
  },
  {
    id: "d27",
    title: "Warehouse Analítico Snowflake",
    customer_id: "c7",
    owner_id: "u3",
    stage_id: "s5",
    amount: 37000.00,
    currency: "EUR",
    status: "lost",
    created_at: "2024-03-12T14:00:00Z",
    closed_at: "2024-04-25T16:30:00Z",
    loss_reason: "cambio de CTO y prioridades internas"
  },
  {
    id: "d28",
    title: "Certificación ISO 27001 y Compliance",
    customer_id: "c10",
    owner_id: "u5",
    stage_id: "s4",
    amount: 34000.00,
    currency: "EUR",
    status: "won",
    created_at: "2024-04-08T11:20:00Z",
    closed_at: "2024-05-26T15:00:00Z",
    expected_close_date: "2024-05-28"
  }
];

export default {
  users,
  stages,
  customers,
  deals
};
