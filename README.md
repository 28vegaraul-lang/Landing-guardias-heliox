# Landing — Heliox Intelligence

Landing page de conversión para el sistema de gestión inteligente de guardias
hospitalarias de Heliox Intelligence. Objetivo único: solicitudes de demostración.

## Estructura

- `index.html` — página completa según el diseño de Claude Design (sistema
  «Industry»): hero, punto de partida, reglas, reparto, selector interactivo
  de especialidades, capturas del sistema, métricas, equipo y contacto
- `styles.css` — tokens y componentes del sistema Industry (Barlow Condensed
  + Barlow, papel/tinta/acero, marcos blueprint)
- `script.js` — animaciones al scroll, selector de servicios, validación y
  envío del formulario (FormSubmit) y analítica de eventos
- `assets/` — capturas del producto optimizadas (webp + png)
- `DESIGN.md` — estrategia de copy y CRO, e historial de la iteración previa

## Uso

Es una página estática sin build: basta abrir `index.html` en un navegador
o servirla desde cualquier hosting estático (GitHub Pages, Vercel, Netlify).

Antes de lanzar a producción, revisar la sección «Estado de producción» de
`DESIGN.md`: solo quedan pasos que requieren cuentas propias (activar
FormSubmit con un primer envío, pegar el ID de GA4/Plausible en `script.js`
y publicar en GitHub Pages/Vercel/Netlify).
