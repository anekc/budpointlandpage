# Cambios en la landing

Rama: `landing-audit`. **Nada está publicado.** Los cambios están en el árbol de trabajo, sin commit.

## Archivos modificados

| Archivo | Cambio | Motivo |
|---|---|---|
| `app/page.tsx` | Capítulo 02 (EN/ES): explica que Apple Pay requiere una automatización de Atajos; las alertas por correo se limitan a Banamex (ES) y se quitan de EN | Hallazgo 4: el parser solo reconoce Banamex |
| `app/page.tsx` | Capítulo 04: nuevo punto "Pro: para compartir, tú o la otra persona necesitan Pro" | Hallazgo 9: `canShareWithFriend` |
| `app/page.tsx` | Capítulo 04: la tarjeta acompañante ahora es `SplitMathCard` | Hallazgo 11 (fase D) |
| `app/page.tsx` | Detalles: Atajos sin "correos de tu banco" en EN; Importar y iCloud marcados como "Pro:"; iCloud ya no dice "nunca vemos tu información" | Hallazgos 4, 5 y 9 |
| `app/page.tsx` | Plan Gratis: 15 etiquetas, más "3 metas de ahorro" y "Pagos recurrentes" | Hallazgos 1 y 2 |
| `app/page.tsx` | Plan Mensual: lista de Pro según `ProFeatureCatalog` (iCloud, compartidos, CSV/PDF, horas de trabajo, reporte PDF por persona); se quitó "Pagos recurrentes" | Hallazgos 2 y 3 |
| `app/page.tsx` | Nota regional debajo de los planes | Hallazgo 12 |
| `app/page.tsx` | FAQ "¿Necesito conectar mi banco?" y "¿Quién puede ver mi información?" reescritas | Hallazgos 4 y 6 |
| `app/page.tsx` | Sección final: pasos "Cómo entrar" (instalar TestFlight → aceptar la invitación → instalar y comentar) | Hallazgo 10 (fase G) |
| `app/page.tsx` | `<link rel="canonical">` solo en la página de inicio | Hallazgo 13 |
| `app/page.tsx` | El campo de correo muestra un anillo de foco | Hallazgo 14 |
| `app/components/NocturnoUI.tsx` | Nuevo `SplitMathCard`: Pagaste / Tu gasto / Mariana te debe. Usa los montos de la cena de la tarjeta "Hoy" ($900 / $450 MXN; $77 / $38.50 USD) | Fase D; mismo criterio que `PeriodSummaryCalculator` |
| `app/components/NocturnoUI.tsx` | `TransactionsCard`, `SharedCard` y `StatusPill` respetan `prefers-reduced-motion` | Hallazgo 15 |
| `app/nocturno.css` | Anillo `:focus-visible` global en `.nb` | Hallazgo 14 |
| `app/layout.tsx` | Título y descripción nuevos, `metadataBase`, `og:url`, `siteName`, `alternateLocale: es_MX` | Hallazgo 7 |
| `app/opengraph-image.tsx` (nuevo) | Imagen 1200×630 para compartir el enlace | Hallazgo 13 |
| `app/sitemap.ts` (nuevo) | Inicio, blog, posts, soporte, privacidad y términos | Hallazgo 13 |
| `app/robots.ts` (nuevo) | Permite todo y apunta al sitemap | Hallazgo 13 |

**No se tocó nada de esto:** la app iOS, el backend, las reglas de Firestore, los productos de StoreKit, las cifras de precios, la política de privacidad, los términos ni el titular del hero.

## Evidencia visual

- `evidence/escritorio-1440-es-oscuro.jpg`: página completa a 1440 px, en español y modo oscuro, con todos los cambios. Está partida en dos columnas.
- `evidence/movil-375-es-oscuro.jpg`: página a 375 px. Se tomó **antes** de alinear las fichas de la cena y de corregir el movimiento reducido; por eso la tarjeta "Hoy" sale vacía.
- `evidence/og-image.jpg`: la imagen para redes.

## Diferido a propósito

| Tema | Por qué |
|---|---|
| Cambiar el titular del hero | La evaluación (AUDIT §3) favorece el actual; un cambio debería medirse primero |
| Analítica | Agrega una dependencia y un proveedor; requiere tu aprobación (AUDIT §5) |
| Redacción del cifrado en la política | Es un cambio legal; hay una propuesta en AUDIT §4 |
| Ruta `/es` indexable y `hreflang` | Requiere reestructurar el ruteo; P2 |
| Borrar componentes sin uso y `app-preview.png` vacío | Limpieza sin impacto para el usuario; P2 |
| Deduplicar la lista de espera | Depende de la configuración de Formspree |
