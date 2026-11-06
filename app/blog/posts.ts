export interface Post {
  slug: string
  title: Record<'en' | 'es', string>
  description: Record<'en' | 'es', string>
  date: Record<'en' | 'es', string>
  readTime: Record<'en' | 'es', string>
  tags: Record<'en' | 'es', string[]>
}

// Newest first
export const posts: Post[] = [
  {
    slug: 'danger-of-invisibility',
    title: {
      es: 'El Peligro de la Invisibilidad',
      en: 'The Danger of Invisibility',
    },
    description: {
      es: 'Por qué la automatización financiera está arruinando tus ahorros y cómo el registro manual puede cambiar tus hábitos.',
      en: 'Why financial automation is ruining your savings and how manual tracking can change your habits.',
    },
    date: {
      es: '31 de Enero, 2026',
      en: 'January 31, 2026',
    },
    readTime: {
      es: '5 min',
      en: '5 min',
    },
    tags: {
      es: ['Psicología', 'Ahorro', 'Hábitos'],
      en: ['Psychology', 'Savings', 'Habits'],
    },
  },
  {
    slug: 'importance-of-emergency-fund',
    title: {
      es: 'Por Qué Necesitas un Fondo de Emergencia',
      en: 'Why You Need an Emergency Fund',
    },
    description: {
      es: 'Descubre qué es, cuánto ahorrar y las mejores opciones en México (Bancos vs Sofipos) para tu dinero en 2026.',
      en: 'Discover what it is, how much to save, and the best High-Yield Savings Accounts to keep your money safe and growing.',
    },
    date: {
      es: '24 de Enero, 2026',
      en: 'January 24, 2026',
    },
    readTime: {
      es: '6 min',
      en: '6 min',
    },
    tags: {
      es: ['Ahorro', 'Inversión', 'México'],
      en: ['Savings', 'Emergency Fund', 'Tips'],
    },
  },
  {
    slug: 'how-to-choose-budget-period',
    title: {
      es: 'Cómo Elegir el Periodo de tu Presupuesto',
      en: 'How to Choose Your Budget Period',
    },
    description: {
      es: '¿Mensual, quincenal o por corte de tarjeta? Descubre cuál periodo funciona mejor para ti.',
      en: 'Monthly, biweekly, or billing cycle? Find out which budget period works best for you.',
    },
    date: {
      es: '22 de Enero, 2026',
      en: 'January 22, 2026',
    },
    readTime: {
      es: '8 min',
      en: '8 min',
    },
    tags: {
      es: ['Presupuesto', 'Tips', 'Guía'],
      en: ['Budgeting', 'Tips', 'Guide'],
    },
  },
  {
    slug: 'why-budgeting-matters',
    title: {
      es: 'Por Qué es Importante Armar un Presupuesto',
      en: 'Why Budgeting Matters',
    },
    description: {
      es: 'Datos y estudios que demuestran cómo un presupuesto puede transformar tu bienestar financiero y reducir el estrés.',
      en: 'Data and studies showing how a budget can transform your financial well-being and reduce stress.',
    },
    date: {
      es: '21 de Enero, 2026',
      en: 'January 21, 2026',
    },
    readTime: {
      es: '10 min',
      en: '10 min',
    },
    tags: {
      es: ['Presupuesto', 'Finanzas', 'Datos'],
      en: ['Budgeting', 'Finance', 'Data'],
    },
  },
  {
    slug: 'welcome-to-budpoint',
    title: {
      es: 'Bienvenido al Blog de Budpoint',
      en: 'Welcome to the Budpoint Blog',
    },
    description: {
      es: 'Descubre cómo Budpoint te ayudará a tomar control de tus finanzas personales de forma inteligente.',
      en: 'Discover how Budpoint will help you take control of your personal finances smartly.',
    },
    date: {
      es: '18 de Enero, 2026',
      en: 'January 18, 2026',
    },
    readTime: {
      es: '3 min',
      en: '3 min',
    },
    tags: {
      es: ['Anuncios', 'Budpoint'],
      en: ['Announcements', 'Budpoint'],
    },
  },
  {
    slug: '5-tips-to-save-money',
    title: {
      es: '5 Tips para Ahorrar Dinero en 2026',
      en: '5 Tips to Save Money in 2026',
    },
    description: {
      es: 'Estrategias prácticas para mejorar tus finanzas personales y empezar a ahorrar desde hoy.',
      en: 'Practical strategies to improve your personal finances and start saving today.',
    },
    date: {
      es: '15 de Enero, 2026',
      en: 'January 15, 2026',
    },
    readTime: {
      es: '8 min',
      en: '8 min',
    },
    tags: {
      es: ['Tips', 'Finanzas'],
      en: ['Tips', 'Finance'],
    },
  },
]
