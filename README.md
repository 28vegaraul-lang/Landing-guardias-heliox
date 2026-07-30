# Landing — Heliox Intelligence

Landing page de conversión para el sistema de gestión inteligente de guardias
hospitalarias de Heliox Intelligence. Objetivo único: solicitudes de demostración.

## Estructura

- `index.html` — página completa (hero, imagina, problema, coste oculto,
  solución, cómo funciona, beneficios, diferenciación, personalización,
  por qué Heliox, casos de uso, testimonios ilustrativos, FAQ, CTA final)
- `styles.css` — sistema de diseño (minimalismo clínico premium)
- `script.js` — animación del calendario del hero, reveals al scroll, FAQ,
  envío del formulario (FormSubmit), analítica de eventos y test A/B/C del hero
- `DESIGN.md` — estrategia de copy, propuestas de hero alternativas,
  wireframe y justificación CRO sección a sección

## Uso

Es una página estática sin build: basta abrir `index.html` en un navegador
o servirla desde cualquier hosting estático (GitHub Pages, Vercel, Netlify).

Antes de lanzar a producción, revisar la sección «Estado de producción» de
`DESIGN.md`: solo quedan pasos que requieren cuentas propias (activar
FormSubmit con un primer envío, pegar el ID de GA4/Plausible en `script.js`
y publicar en GitHub Pages/Vercel/Netlify).
