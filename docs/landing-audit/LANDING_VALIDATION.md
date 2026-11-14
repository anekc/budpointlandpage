# Validación

Todo se corrió en local el 14 de noviembre de 2026 contra `next start` (build de producción).

## Pruebas y build

| Prueba | Resultado |
|---|---|
| `next lint` | ✔ Sin advertencias ni errores |
| `tsc --noEmit` | ✔ Sin errores |
| `next build` | ✔ 18 páginas estáticas, incluidas `/robots.txt`, `/sitemap.xml` y `/opengraph-image` |
| Pruebas automáticas | **No existen** en este repo: no hay script `test` |

## Rutas (HTTP)

| Ruta | Código |
|---|---|
| `/` | 200 |
| `/blog` | 200 |
| `/blog/posts/welcome-to-budpoint` | 200 |
| `/support` | 200 |
| `/privacy` | 200 |
| `/terms` | 200 |
| `/robots.txt` | 200 |
| `/sitemap.xml` | 200 (lista los 11 URLs) |
| `/opengraph-image` | 200 (PNG de 1200×630) |
| `/nope` | 404 (esperado) |

## Responsive

**Método.** Cada ruta se cargó en un iframe del ancho exacto, servido desde el mismo origen. Después se midió `scrollWidth` contra el ancho y se buscaron elementos que se salieran por la derecha. Usé iframes porque Chrome sin interfaz no permite ventanas de menos de 500 px.

| Rutas | Anchos | Resultado |
|---|---|---|
| `/` (es), `/` (en), `/privacy`, `/terms`, `/support`, `/blog` | 375, 390, 768, 1024, 1440 | **30 de 30 sin desbordamiento horizontal**. Un solo `h1` por página. 0 imágenes sin `alt`. |

**Inspección visual.** Revisé las capturas a 375 px (es, oscuro) y 1440 px (es oscuro, en claro).

- Me falta probar en un Android real. El caso que dio problemas antes fue Chrome en Android a 360 px.

## Idiomas

- `?lang=es` y `?lang=en` cambian `<html lang>` en todas las rutas (verificado en las 30 combinaciones).
- Revisé que los textos nuevos existan en los dos idiomas: pasos de la beta, nota de precios, ficha de la cena, puntos Pro y FAQ.
- Las cifras de precio no cambiaron: USD en inglés y MXN en español.

## CTA

| CTA | Destino | Verificación |
|---|---|---|
| Header, hero y sección final ("Prueba la beta" / "Descarga la beta en TestFlight") | `https://testflight.apple.com/join/GZth4W4d` | GET 200, título "Join the Budpoint beta - TestFlight - Apple". Abre en una pestaña nueva con `noopener` |
| "Mira cómo funciona" | Hace scroll a `#features` | Revisado en el código; no lo probé con clic |
| Lista de espera | POST a Formspree `mnnvdwdy` | **No probado a propósito**, para no crear registros reales. El código revisado muestra éxito y error, valida el formato y bloquea doble envío mientras está enviando |
| Correo de soporte | `mailto:support@budpoint.app` | El enlace existe; no verifiqué el buzón |

## SEO y accesibilidad

| Revisión | Resultado |
|---|---|
| `<title>` | "Budpoint: budgets and shared expenses for iPhone" |
| Canonical | Solo en `/` → `https://budpoint.app/`. Las demás rutas no heredan el canonical del inicio |
| `og:image` | URL absoluta, `https://budpoint.app/opengraph-image?…` |
| Sitemap y robots | ✔ |
| Foco visible | Anillo `:focus-visible` agregado; el campo de correo tiene anillo con `focus-within`. **Falta un recorrido manual con teclado** |
| Movimiento reducido | Revisado con `--force-prefers-reduced-motion`: todas las tarjetas se ven sin animación |
| Contraste | No medí con herramienta. Los colores son los tokens Nocturno, sin cambios |
| Errores de consola | 0 mensajes en `/`, `/?lang=en`, `/privacy`, `/terms`, `/support`, `/blog` y un post. Capturado con `--enable-logging` de Chrome sin interfaz |
| Core Web Vitals | **No medidos**: Lighthouse no está disponible aquí |

## Pruebas manuales pendientes

1. Abrir la vista previa de Vercel en un iPhone real y en el Android que falló antes (360 px).
2. Recorrer la página con Tab: header → hero → FAQ → formulario.
3. Mandar a la lista de espera un correo tuyo y confirmar que llega a Formspree.
4. Pegar el enlace en WhatsApp o iMessage para ver la imagen de vista previa (solo funciona ya publicado).
5. Correr Lighthouse en la vista previa.
