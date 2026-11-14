# Checklist de publicación de la landing

## Listo para publicar (en la rama `landing-audit`)

- [x] Afirmaciones alineadas con la app:
  - Banamex.
  - Pro en iCloud, importación y compartidos.
  - Límites del plan Gratis.
  - Recurrentes gratis.
- [x] Sin la frase "nunca vemos tu información".
- [x] FAQ de privacidad alineada con la política vigente.
- [x] Ejemplo de la cena dividida, con el mismo criterio que el cálculo de la app.
- [x] Pasos para entrar a la beta y nota regional de precios.
- [x] Metadatos sin "Coming soon"; canonical, sitemap, robots e imagen para redes.
- [x] Foco visible y movimiento reducido.
- [x] Lint, typecheck y build OK; 30 de 30 combinaciones de ruta y ancho sin desbordamiento; 0 errores de consola.

## Bloqueantes antes de promocionar afuera

- [ ] **Precios y pruebas gratis en App Store Connect.** Confirmar que estos precios están fijados:

  | Producto | USA | México |
  |---|---|---|
  | `budpoint_monthly_premium` | $5.99 | $59 MXN |
  | `budpoint_yearly_premium` | $39.99 | $399 MXN |

  Confirmar también las pruebas de 7 y 14 días. Si no coinciden, hay que cambiar la landing o ASC antes de promocionar.
- [ ] **Prueba en dispositivos reales**: iPhone y el Android de 360 px, con la vista previa de Vercel.

## Aprobaciones que necesito de ti

1. **Publicar**: hacer merge de `landing-audit` a `main`, lo que despliega automáticamente en Vercel.
2. **Política de privacidad**: aceptar o ajustar la redacción del cifrado de iCloud (AUDIT §4).
3. **Analítica**: aprobar Vercel Web Analytics y los eventos propuestos (AUDIT §5).
4. **Titular del hero**: confirmar que se queda el actual (AUDIT §3).

## Recomendación final

**CONDICIONAL.**
- Los cambios de la rama hacen la landing más precisa que la versión publicada hoy, que tiene afirmaciones incorrectas: 5 etiquetas, recurrentes como Pro, correos de cualquier banco, "Coming soon". Por eso recomiendo publicarla en cuanto la apruebes.
- Antes de promocionarla fuera de tu círculo, falta confirmar los precios y las pruebas gratis en App Store Connect, y probar en dispositivos reales.
