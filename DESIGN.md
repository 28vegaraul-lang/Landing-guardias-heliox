# Heliox Intelligence — Estrategia de landing, copy y CRO

Documento de diseño que acompaña a `index.html`.

> **Actualización (30-07-2026):** la dirección visual y el copy fueron
> rediseñados en Claude Design (proyecto «Tres direcciones de hero») sobre el
> sistema **Industry**: Barlow Condensed + Barlow, papel `#f7f6f3`, tinta
> `#1d1f20`, azul acero `#5980a6/#1d2d3d`, marcos blueprint con marcas de
> registro y bloques de cuadrante animados. `index.html` implementa ese diseño
> (archivo fuente: `Heliox Landing.dc.html` del proyecto de Claude Design).
> El hero quedó fijado en «La última guardia que harás a mano», por lo que el
> test A/B/C de heros descrito más abajo se retiró del código; las secciones
> 1–3 de este documento describen la primera iteración y se conservan como
> registro. Sigue vigente: FormSubmit, capa de analítica y el planteamiento
> CRO general.

---

## 1 · Propuestas de hero

El hero no habla del producto: habla del futuro que el visitante desea.
Tres propuestas, ordenadas por recomendación:

### Hero A — *implementado* — «Declaración Apple»
> **Las guardias, resueltas.**
>
> Un sistema que aprende las reglas de tu servicio —todas— y construye el
> calendario de guardias por ti. Justo, completo y sin conflictos.
> En minutos, no en tardes.

Por qué funciona: dos palabras que condensan la transformación completa. El
punto final transmite rotundidad («esto ya está solucionado»). El subheadline
carga toda la explicación, con el inciso «—todas—» atacando la objeción nº 1
(«mi servicio es demasiado peculiar»). «En minutos, no en tardes» ancla el
contraste temporal (anclaje + aversión a la pérdida).

### Hero B — «Futuro imaginado»
> **Imagina no volver a cuadrar una guardia.**
>
> Heliox aprende cómo funciona tu servicio y genera cada mes un calendario
> justo, completo y con los descansos garantizados. Tú solo lo revisas.

Por qué funciona: el imperativo «imagina» activa simulación mental (el lector
se proyecta en el resultado antes de saber qué es el producto). Ideal si el
tráfico llega frío desde redes.

### Hero C — «La última vez»
> **Haz que el próximo calendario sea el último que construyas a mano.**
>
> Creado por médicos, Heliox convierte las reglas de tu servicio en una
> planificación automática, equilibrada y sin conflictos.

Por qué funciona: urgencia sin presión — sitúa la decisión en el siguiente
ciclo mensual, que es exactamente cuando el dolor vuelve. Buen candidato para
campañas de email a jefes de residentes a final de mes.

---

## 2 · Wireframe y jerarquía visual

```
┌──────────────────────────────────────────────┐
│ NAV sticky: logo · anclas · [CTA]            │  siempre visible, blur
├──────────────────────────────────────────────┤
│ HERO  ┌ copy (55%) ┐  ┌ calendario (45%) ┐   │  Z-pattern
│       │ eyebrow    │  │ animación caos→  │   │
│       │ H1 · sub   │  │ orden + checks   │   │
│       │ CTA + CTA2 │  └──────────────────┘   │
├──────────────────────────────────────────────┤
│ FRANJA de confianza (3 claims, hairlines)    │
├──────────────────────────────────────────────┤
│ IMAGINA — fondo oscuro, serif grande         │  pausa emocional
├──────────────────────────────────────────────┤
│ PROBLEMA — grid 3×2 de dolores               │
│ COSTE OCULTO — copy + 3 stats (fondo alt)    │
│ SOLUCIÓN — 3 puntos numerados                │
│ CÓMO FUNCIONA — 3 pasos (fondo alt)          │
│ BENEFICIOS — grid 3×2                        │
│ DIFERENCIACIÓN — comparativa claro/oscuro    │
│ PERSONALIZACIÓN — nube de reglas en serif    │
│ POR QUÉ HELIOX — fondo oscuro, manifiesto    │
│ CASOS DE USO — 5 cards por rol               │
│ TESTIMONIOS — 3 quotes (marcados ejemplo)    │
│ FAQ — acordeón, 6 objeciones                 │
├──────────────────────────────────────────────┤
│ CTA FINAL — fondo oscuro, headline + form    │  clímax
├──────────────────────────────────────────────┤
│ FOOTER mínimo                                │
└──────────────────────────────────────────────┘
```

Ritmo visual: blanco → oscuro → blanco → gris → … Las tres secciones oscuras
(Imagina, Por qué Heliox, CTA final) son los tres picos emocionales de la
página; el ojo las lee como «momentos importantes».

## 3 · Sistema visual

- **Paleta**: tinta `#0B1220`, fondo `#FFFFFF` / `#F6F7F9`, acento único
  `#2E5CE6`. El acento se reserva para CTA, datos y micro-señales: la escasez
  del color dirige la mirada hacia la acción.
- **Tipografía**: Instrument Sans (UI, titulares) + Instrument Serif (momentos
  emocionales: «Imagina», reglas personalizadas, citas). El cambio a serif
  marca «aquí habla un humano, no un software».
- **Imágenes**: ninguna fotografía de stock. El único visual es el calendario
  animado del hero — el producto demostrándose a sí mismo. Anti-patrón evitado:
  médicos sonrientes con tablet.
- **Iconografía**: casi ausente; hairlines, números serif y guiones hacen el
  trabajo. Menos elementos = más percepción premium.
- **Motion**: reveals de 600 ms con ease-out y stagger de 60 ms; animación del
  hero en 3 actos (celdas → asignación → verificaciones);
  `prefers-reduced-motion` desactiva todo.

## 4 · Justificación CRO sección a sección

| Sección | Emoción buscada | Objeción que elimina | Sesgo / principio |
|---|---|---|---|
| Hero | Alivio anticipado | «Otra app más» — no: resultado | Anclaje («minutos, no tardes»), fluency |
| Franja confianza | Identificación | «No conocen mi realidad» | Similitud / in-group («ese Excel») |
| Imagina | Deseo | — (abre el gap emocional) | Simulación mental, prospección |
| Problema | Reconocimiento («son ellos, me entienden») | «No entenderán mi caso» | Efecto espejo, PAS-Problema |
| Coste oculto | Incomodidad productiva | «Puedo seguir como hasta ahora» | Aversión a la pérdida, coste de oportunidad, PAS-Agitate |
| Solución | Confianza + control | «La IA decidirá por mí» → «Tú decides. Él calcula.» | Autonomía percibida, PAS-Solve |
| Cómo funciona | Sensación de facilidad | «Será un proyecto enorme de implantar» | Reducción de fricción percibida, chunking (3 pasos) |
| Beneficios | Proyección del beneficio | «¿Qué gano yo exactamente?» | JTBD: se venden resultados, no features |
| Diferenciación | Superioridad de la elección | «Ya existen programas de turnos» | Contraste, categoría propia («no es software, es tu sistema») |
| Personalización | Sorpresa («¡esa regla es la nuestra!») | «Nuestras reglas son inmodelables» | Concreción > abstracción, prueba por ejemplo |
| Por qué Heliox | Confianza en las personas | «¿Quiénes son estos?» | Autoridad + similitud (médicos), storytelling de origen |
| Casos de uso | Relevancia personal | «Esto es para el jefe, no para mí» | Segmentación por rol, efecto cóctel |
| Testimonios | Deseo social | «¿Funcionará de verdad?» | Prueba social prospectiva — honesta: marcados como ejemplo |
| FAQ | Tranquilidad final | Datos, precio, control, esfuerzo | Cierre de bucles abiertos (Zeigarnik) |
| CTA final | Determinación | «¿Y ahora qué hago?» | Un solo siguiente paso, compromiso mínimo (30 min, sin compromiso) |

Decisiones CRO transversales:

- **Un único objetivo de conversión** (demo). El CTA se repite idéntico en
  nav, hero y cierre: consistencia verbal = menor carga cognitiva.
- **Microcopy bajo cada CTA** («30 minutos. Sin compromiso.») reduce el riesgo
  percibido justo en el momento de la decisión.
- **Formulario de 3 campos + 1 opcional**: cada campo extra cuesta conversión;
  el textarea opcional con placeholder realista («Somos 18 residentes…»)
  cualifica el lead sin exigir esfuerzo.
- **Testimonios honestos**: al marcarlos como ilustrativos se protege la
  credibilidad ante una audiencia médica escéptica — mentir aquí destruiría
  toda la página.
- **Sin precio en la página**: el precio a medida se difiere a la demo, que es
  coherente con el posicionamiento de solución hecha a medida (y convierte la
  curiosidad por el precio en motivo para reservar la llamada).

## 5 · Estado de producción

Ya implementado en el código:

- **Formulario real**: envío AJAX a FormSubmit (sin backend propio), con
  honeypot antispam, estado de éxito integrado (sin abandonar la página),
  estado de error con vía de contacto alternativa y evento de conversión
  `demo_request`. Fallback sin JavaScript: POST estándar a FormSubmit.
- **Analítica de eventos**: `page_view`, `cta_click` (con ubicación),
  `scroll_depth` (25/50/75/100), `faq_open` (con pregunta), `demo_request` y
  `demo_request_error`. Todos los eventos incluyen la variante de hero. Los
  eventos se acumulan en `window.dataLayer`; para enviarlos a una
  herramienta basta rellenar `GA4_ID` o `PLAUSIBLE_DOMAIN` al inicio de
  `script.js`.
- **Test A/B/C del hero**: asignación aleatoria persistente por visitante
  (localStorage), variante incluida en cada evento y en el propio lead
  (campo `variante_hero`). Forzable para revisión con `?v=A`, `?v=B`, `?v=C`.

Pendiente (requiere acción humana):

1. **Activar FormSubmit**: el primer envío real dispara un correo de
   confirmación a la dirección receptora; hay que pulsar el enlace de
   activación una vez. Tras activar, FormSubmit ofrece un alias aleatorio —
   conviene sustituir el email visible en `index.html` por ese alias para no
   exponerlo a scrapers.
2. **Correo y dominio corporativos**: los envíos llegan de momento a
   `28vegaraul@gmail.com`; cambiar por el buzón real cuando exista (una
   línea en `index.html`).
3. **Cuenta de analítica**: crear la propiedad GA4 o el sitio en Plausible y
   pegar el ID/dominio en la cabecera de `script.js`.
4. **Publicación**: activar GitHub Pages (Settings → Pages → deploy from
   branch) o conectar el repo a Vercel/Netlify.
