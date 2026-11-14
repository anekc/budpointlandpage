# Auditoría de la landing de Budpoint

Fecha: 14 de noviembre de 2026. Rama: `landing-audit` (sin publicar).

**Fuentes revisadas:**
- Landing: `app/`.
- App iOS: `AppleTest/PersonalHub/PersonalHub`, `BudpointStore.storekit`, `PersonalHubTests/BudpointStore-MX.storekit` y `docs/PRICING.md`.
- Backend: `AppleTest/BudpointBackend/firestore.rules` y `functions/src`.

**Lo que no se pudo revisar:**
- App Store Connect: no hay acceso desde aquí.
- Las reglas de Firestore que están desplegadas en producción. Solo vi el archivo del repo.

## 1. Hallazgos iniciales y prioridad

**P0** = arreglar antes de promocionar · **P1** = importante para el lanzamiento · **P2** = opcional.

| # | Prioridad | Área | Hallazgo | Estado |
|---|---|---|---|---|
| 1 | P0 | Precios / Free vs Pro | El plan Gratis decía **5 etiquetas**, pero la app permite **15** (`FreemiumManager.Limits.maxTags = 15`). | Corregido |
| 2 | P0 | Precios / Free vs Pro | "Pagos recurrentes" aparecía como función de Pro, pero en la app son **gratis**: no hay ningún candado sobre `isRecurring`. | Corregido |
| 3 | P0 | Precios / Free vs Pro | "Exporta a CSV y PDF" no describía lo que hace Pro. En la app, Pro incluye: importar CSV y estados de cuenta en PDF, exportar CSV, el reporte PDF por persona y el costo en horas de trabajo (`ProFeatureCatalog`). | Corregido |
| 4 | P0 | Afirmaciones | "Bank email alerts work too" / "si tu banco te manda un correo… también sirve". El parser de correos solo reconoce **Banamex** (`BankAlertParser`, "hoy solo Banamex"). | Corregido |
| 5 | P0 | Privacidad | "We never see your data / Nosotros nunca vemos tu información" es una frase absoluta. Además, los gastos compartidos, el perfil y las conexiones sí pasan por Firebase. | Corregido: ahora dice "tu respaldo vive en tu iCloud privado, no en nuestros servidores" |
| 6 | P0 | Privacidad | Según la FAQ "¿Quién puede ver mi información?", por nuestros servidores solo pasan los gastos compartidos. Faltaba mencionar el perfil (nombre y código), las conexiones y la analítica anónima. | Corregido, alineado con la política de privacidad vigente |
| 7 | P0 | SEO | La meta description decía "**Coming soon to iOS**" y "financial analytics designed for today's economy". Las dos cosas son falsas hoy. | Corregido |
| 8 | P0 | Precios | No pude confirmar en App Store Connect los precios ($5.99 / $39.99 USD, $59 / $399 MXN) ni las pruebas gratis (7 y 14 días). `docs/PRICING.md` marca como **PENDIENTE** fijarlos en ASC. | **Bloqueante: lo confirma el dueño.** No cambié ninguna cifra. |
| 9 | P1 | Afirmaciones | No se aclaraba que el respaldo en iCloud, la importación de CSV y compartir gastos requieren Pro. Para compartir, Pro lo tiene que tener al menos una de las dos personas (`canShareWithFriend`). | Corregido |
| 10 | P1 | Conversión | No se explicaba cómo entrar a la beta. | Agregado: "Cómo entrar", en 3 pasos |
| 11 | P1 | Diferenciador | No había un ejemplo concreto de cómo se divide un gasto. | Agregado: tarjeta "Cena del viernes" con Pagaste / Tu gasto / Te debe |
| 12 | P1 | Precios | No se decía en qué moneda ni en qué tienda aplican los precios. | Agregado: nota regional |
| 13 | P1 | SEO | Faltaban la URL canónica, `sitemap.xml`, `robots.txt` y la imagen para redes (OG). | Agregados |
| 14 | P1 | Accesibilidad | No había un indicador de foco visible y consistente. El campo de correo tenía `outline-none` sin ningún reemplazo. | Corregido |
| 15 | P1 | Accesibilidad | Algunas animaciones de listas (Hoy, Compartidos) no respetaban "reducir movimiento" y empezaban invisibles. | Corregido |
| 16 | P1 | Analítica | La landing no mide nada: ni visitas ni clics en TestFlight. | Solo recomendación (§5); requiere tu aprobación |
| 17 | P1 | Lista de espera | Formspree no filtra correos duplicados. No hay doble opt-in. | Pendiente de decisión (§6) |
| 18 | P2 | SEO / idiomas | El servidor entrega todo el HTML en inglés y el idioma cambia en el cliente. No hay URL `/es` indexable ni `hreflang`. | Diferido |
| 19 | P2 | Código | Quedaron archivos sin uso: `Features.tsx`, `Pricing.tsx`, `Waitlist.tsx`, `Navbar.tsx`, `LazyVideo.tsx`, `public/app-preview.png` (vacío) y las carpetas de `screenshots`. | Diferido (limpieza) |
| 20 | P2 | Legal | La política de privacidad dice que el respaldo de iCloud va "cifrado de extremo a extremo". En la app solo se cifran ciertos campos (§4). | **Propuesta de redacción, sin publicar** |

**Lo que ya funciona y se conservó:**
- El diseño Nocturno, el modo claro/oscuro y la detección de idioma.
- Los cuatro capítulos con tarjetas animadas.
- El iPhone en el hero.
- La FAQ.
- El enlace a la beta pública de TestFlight: responde 200, con el título "Join the Budpoint beta".
- El formulario de espera, con estados de éxito y error.

## 2. Matriz de verificación de funciones

| Función | Lo que dice la landing | Evidencia en el código | Estado | Acción |
|---|---|---|---|---|
| Dashboard y resumen | Periodo, balance, gasto por cuenta, 7 widgets reordenables | `DashboardView`, `NocturnoPeriodCard`; `DashboardWidget` tiene 7 casos | IMPLEMENTADO, PROBADO PARCIALMENTE | Mantener |
| Ingresos, gastos y transferencias | "Ingresos, gastos y transferencias" | `Transaction`, `TransactionFormView` | IMPLEMENTADO, PROBADO PARCIALMENTE | Mantener |
| Recurrentes | "Pagos recurrentes que se registran solos" | `isRecurring`, `RecurringTransactionsSummaryView`, sin candado Pro | IMPLEMENTADO, PROBADO PARCIALMENTE | Ya figura como Gratis |
| Presupuestos y etiquetas | Regla 50/30/20, presupuestos por etiqueta, sin etiqueta aparte | `BudgetRule`, `BudgetRuleView`, `UnbudgetedTagsView`, `UncategorizedBudgetRowView` | IMPLEMENTADO, PROBADO PARCIALMENTE | Mantener |
| Metas de ahorro | "Metas conectadas a tus cuentas" | `MetasContentView`, `GoalTransactionsView`; Gratis: 3 metas | IMPLEMENTADO, PROBADO PARCIALMENTE | Límite agregado al plan Gratis |
| Gastos compartidos | Enviar a cada quien su parte con su código; la otra persona acepta | `ShareTransactionView`, `SharedTransaction` (Firestore), reglas `shared_transactions` | IMPLEMENTADO, PROBADO PARCIALMENTE | Aclarado: requiere Pro de uno de los dos |
| Contabilidad de la división | Solo tu parte cuenta en tu balance | `PeriodSummaryCalculator` suma `calculateOwnerAmount`, que toma solo el split del dueño | IMPLEMENTADO Y VERIFICADO (en código) | Ejemplo nuevo, con los mismos datos de la tarjeta "Hoy" |
| Cobros y reembolsos | "Te deben", saldar desde tus tarjetas | `ReceivableAutoSync`, `ReceivablesReconciliationView`, `owes_you` | IMPLEMENTADO, PROBADO PARCIALMENTE | Mantener |
| Multicuenta | Saldo de cada cuenta | `AccountsStore`; Gratis: 2 cuentas | IMPLEMENTADO, PROBADO PARCIALMENTE | Mantener |
| Sincronización con iCloud | Respaldo y restauración | `CloudKitSyncManager`, `CloudPersistence`; candado Pro en `CloudPersistence.swift:104` | IMPLEMENTADO (Pro), PROBADO PARCIALMENTE | Marcado como Pro |
| Sincronización con Firebase | Solo para compartir | `FirebaseManager`, `FirebaseModels`: perfil, conexiones, compartidos, verificación de Pro | IMPLEMENTADO | La FAQ ahora lo describe |
| Importar CSV | "Importa tu historial" | `ImportExportView` (candado Pro), `DraftTransactionsView` | IMPLEMENTADO (Pro) | Marcado como Pro |
| Importar estados de cuenta en PDF | (no se mencionaba) | `PDFImporter` + parsers de BBVA, Banamex, Banorte, Nu y Revolut | IMPLEMENTADO (Pro), NO PROBADO POR MÍ | Agregado solo en español (son bancos de México) |
| Cuadre de tarjetas | "Cuánto pagar de cada tarjeta" | `ReconciliationService`, `OwnReconciliationView` | IMPLEMENTADO, PROBADO PARCIALMENTE | Mantener |
| Atajos de Apple Pay | La compra aparece sola y tú la confirmas | `LogExpenseIntent`, `ApplePayInboxStore`, `ApplePayPendingBanner` | IMPLEMENTADO, PROBADO PARCIALMENTE | Aclarado: requiere configurar una automatización en Atajos |
| Alertas por correo del banco | "Si tu banco te manda un correo…" | `BankAlertParser`: **solo Banamex** | PARCIALMENTE IMPLEMENTADO | Limitado a Banamex (ES) y quitado de EN |
| Costo en horas de trabajo | Pro | `TimeCostManager` (candado Pro) | IMPLEMENTADO (Pro) | Mantener |
| Widgets de pantalla de inicio | Información y acceso directo | `PersonalHubWidget`, `BudpointBudgetWidget`, `PersonalHubWidgetControl` | IMPLEMENTADO, PROBADO PARCIALMENTE | Mantener |
| Gratis vs Pro | Límites del plan Gratis | `FreemiumManager.Limits`: 2 cuentas, 15 etiquetas, 2 personas, 3 presupuestos por periodo, 3 metas | IMPLEMENTADO Y VERIFICADO (en código) | Corregido |
| Restaurar compras | (no se menciona) | `StoreKitManager.restorePurchases` usa `AppStore.sync()` | IMPLEMENTADO, PROBADO PARCIALMENTE (`restore_purchases_test.md`) | Sin cambios |
| Eliminar cuenta | Política de privacidad | `ConnectFriendsView`: borra el perfil, las conexiones y los compartidos de Firebase; lo local y lo de iCloud se queda | IMPLEMENTADO | La política ya lo describe así |
| Privacidad / almacenamiento | iPhone + iCloud privado; Firebase solo para compartir | Ver §4 | IMPLEMENTADO, con matiz sobre el cifrado | FAQ corregida; política: propuesta |

"PROBADO PARCIALMENTE" significa que el código existe y está conectado a la interfaz, pero yo no lo ejecuté en un dispositivo.

## 3. Hero: titular actual contra la alternativa

- **Actual:** "Descubre en qué se te va el dinero, antes de que se acabe el mes." / "Know where your money went. Before the month ends."
- **Alternativa:** "Your money. Your budget. Even when you split the bill."

**Evaluación cualitativa.** No hay datos de conversión. Sin un experimento, ninguna de las dos se puede declarar ganadora.

| Criterio | Actual | Alternativa |
|---|---|---|
| Claridad para quien llega por primera vez | Alta: dice qué problema resuelve | Media: tres frases cortas, más abstractas |
| Relevancia emocional | Alta: toca la ansiedad de fin de mes | Media |
| Diferenciación | Baja: muchas apps de presupuesto prometen lo mismo | Alta: menciona los gastos divididos |
| Intención de búsqueda | Alineada con "en qué gasto mi dinero" | Alineada con "dividir gastos" |
| Lectura en móvil | 4 líneas a 42 px | 3 líneas |

**Decisión:** conservar el titular actual. Ya está en la landing, en el video y en la imagen para redes, y la diferenciación queda cubierta por otros elementos:
- El subtítulo ya dice "Registra el gasto de todos sin que tu balance lo resienta".
- El nuevo ejemplo de la cena en el capítulo 04.
- El nuevo título SEO, "budgets and shared expenses".

Si quieres medirlo, la recomendación es una prueba A/B cuando exista analítica (§5).

## 4. Privacidad y seguridad: verificación

| Afirmación | Evidencia | Estado |
|---|---|---|
| Los datos viven en el iPhone | Persistencia local en la app | Verificado |
| iCloud usa tu base de datos privada | `privateCloudDatabase` en `CloudKitManager` / `CloudPersistence` | Verificado; el desarrollador no tiene acceso a la base privada del usuario |
| Cifrado en iCloud | `CloudKitEncryption`. Se cifran en el dispositivo los montos, los nombres, las notas, las descripciones, los saldos iniciales y las metas (`*Encrypted`). **No se cifran** las fechas, la moneda, el tipo, los IDs ni los flags. | **Matiz**: decir "todo cifrado de extremo a extremo" es más de lo que hace el código |
| Firebase guarda solo lo necesario para compartir | `FirebaseUser` (nombre, correo opcional de Sign in with Apple, código, token de notificaciones, estado Pro), conexiones y gastos compartidos | Verificado; la FAQ ya lo refleja |
| Reglas de acceso | `firestore.rules`: cada usuario lee solo lo suyo y los compartidos donde participa; todo lo demás está denegado | Verificado en el repo; **producción NO VERIFICADA** |
| Autenticación | Sign in with Apple + Firebase Auth | Verificado |
| Analítica de la app | `AppAnalytics`: Firebase Analytics, solo eventos manuales, sin montos, se puede apagar, encendida por defecto | Verificado; coincide con la política |
| Borrar datos | La eliminación de cuenta borra lo que hay en Firebase; lo local y lo de iCloud los borra el usuario | Verificado; coincide con la política |
| Lo que ve el desarrollador | Puede ver los gastos compartidos en Firestore (no están cifrados de extremo a extremo) | Por eso se quitó "nunca vemos tu información" |

**Redacción propuesta para la política (no publicada, requiere tu aprobación).** Iría en la sección "Respaldo y sincronización con iCloud", en lugar de "Va cifrada de extremo a extremo… ni nosotros ni Apple podemos leerla":

> ES: «Tu información se guarda en tu base de datos privada de iCloud, a la que nosotros no tenemos acceso. Además, los montos, nombres, notas y descripciones se cifran en tu iPhone antes de subirse, con una llave que se queda en tu Llavero de iCloud. Otros datos, como fechas y monedas, quedan protegidos por el cifrado estándar de iCloud.»
>
> EN: "Your data is stored in your private iCloud database, which we can't access. On top of that, amounts, names, notes and descriptions are encrypted on your iPhone before upload, with a key kept in your iCloud Keychain. Other data, like dates and currencies, is protected by iCloud's standard encryption."

No cambié la fecha de la política ni ningún término legal.

## 5. Analítica de la landing (recomendación, sin implementar)

Hoy la landing no mide nada. La propuesta mínima es **Vercel Web Analytics**: no usa cookies, ya estás en Vercel y solo requiere `@vercel/analytics`. Agregar esa dependencia necesita tu aprobación.

| Evento | Cuándo se dispara | Parámetros (sin datos personales) |
|---|---|---|
| (vista de página) | Automático | ruta |
| `testflight_click` | Clic en cualquier botón de TestFlight | `placement`: header / hero / cta · `lang` |
| `waitlist_submit` | Respuesta OK de Formspree | `lang` (nunca el correo) |
| `waitlist_error` | Respuesta con error | `lang` |
| `pricing_view` | La sección de precios entra en pantalla (una vez por visita) | `lang` |
| `language_switch` | Clic en ES/EN | `to` |

**Limitaciones:**
- Un clic en TestFlight **no** equivale a una instalación ni a terminar el onboarding. Las instalaciones se ven en App Store Connect ▸ TestFlight.
- Para no contar dos veces el mismo evento, se dispara solo en el handler, no en efectos de render.

## 6. Incertidumbres pendientes

1. **Precios y pruebas gratis en App Store Connect.** No verificados. `PRICING.md` dice que siguen pendientes.
2. **Reglas de Firestore en producción.** Solo revisé el archivo del repo.
3. **Duplicados en la lista de espera.** Formspree acepta duplicados. Se pueden limpiar al exportar, o activar en Formspree la protección contra spam y el reCAPTCHA. No envié correos de prueba al formulario.
4. **Retroalimentación de testers.** TestFlight permite mandar comentarios con captura de pantalla, y existe support@budpoint.app. No verifiqué que ese buzón reciba correo.
5. **iOS 17 o posterior.** Sale de `IPHONEOS_DEPLOYMENT_TARGET = 17.0` en el proyecto. El build de TestFlight podría tener otro valor; conviene confirmarlo en ASC.
