# Ángela España — Fase 0: Auditoría y arquitectura

Documento de trabajo interno (Efecto42). Fecha: 2026-08-15.
Ámbito: repositorio `Efecto42/AMES`, transformación de `/casa` en la tienda oficial de Ángela España.

---

## 0. Decisiones registradas (2026-08-15, aprobación de auditoría)

1. **Vercel canónico: `angelaespana42`**. Autorizado eliminar/desconectar solo los duplicados de Ángela España (`angelastore`, `ames`, `ames-3m28`, `angela-espana`, `angela-espa-a-mp8z`). Ningún otro proyecto del equipo se toca. Si la API/MCP no permite eliminarlos, se reportan los conectados con instrucciones manuales.
2. **Base de datos: Supabase confirmado**. Proyecto único `angela-espana-prod` en organización controlada por Juan/Efecto42. Sin staging ni proyectos múltiples por ahora. Creación pendiente de aprobar organización/región/costo (ver §10).
3. **Next.js 16**: `next lint` no existe; ESLint se configura con `eslint.config.mjs` y script `eslint .`. No usar `middleware.ts` (convención obsoleta); interceptación de rutas con `proxy.ts`. La protección de `/admin` se re-verifica además en cada Server Action y operación de servidor: el proxy no es la única barrera.
4. **Migraciones por capacidad, no esquema completo en Fase 2**. Núcleo inicial (admins, categorías, colecciones, productos, imágenes, variantes, inventario, auditoría) en Fase 2; carrito y pedidos en Fases 4–5; Atelier en Fase 6; promociones/Prenda del Día en Fase 7; contenido editorial y ajustes cuando se necesiten. Ninguna tabla especulativa sin consumidor real en su fase.
5. **Compra como invitado en V1**. Sin cuentas de cliente.
6. **Pagos reales apagados**. No conectar Stripe ni crear webhooks hasta tener productos, políticas, envío y cuenta comercial confirmados.
7. **IA de imagen diferida**. V1 solo visualizador conceptual determinista claramente etiquetado. Sin proveedor, costos ni infraestructura de IA.
8. **Sin Upstash por ahora**. Límites simples adecuados al tráfico inicial (servidor, p. ej. contadores en Postgres); rate limiting externo solo cuando exista necesidad medida.

---

## 1. Auditoría del estado actual

### 1.1 Código

| Elemento | Estado |
|---|---|
| Framework | Next.js 16.3.0, App Router, React 19.2, TypeScript 5.9 estricto |
| Rutas | `/` (landing de liquidación) y `/casa` (vista privada) — nada más |
| Archivos de app | `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/casa/{page.tsx, CasaExperience.tsx, casa.module.css}` |
| Estilos | CSS plano minificado a mano (7 líneas totales entre ambos archivos, todo en una línea). Sin Tailwind, sin sistema de diseño formalizado |
| Datos | Ninguno. Todo el contenido está escrito en el código (hard-coded) |
| Dependencias | Solo `next`, `react`, `react-dom`. Cero dependencias de datos, pagos, validación o auth |
| Lint | No existe ESLint ni script `lint`. Solo `typecheck` |
| Tests | No existen |
| Imágenes | 10 JPG editoriales en `/public`, reutilizadas en ambas experiencias |
| Git | Rama `main` limpia. Historia: sitio estático → migración a Next → landing de liquidación → 4 iteraciones de Casa |

### 1.2 Estado de `/` (landing de liquidación)

- Cumple su función: breve, promocional, todo el cierre por WhatsApp (`529981117084` correcto).
- Indexable (`robots: index: true`). Correcto para la campaña.
- Paleta propia de campaña (papel, tinta, rojo `#a72c35`, amarillo, azul) — **distinta a la paleta de la tienda oficial**; conviene que sigan separadas.
- Su CSS vive en `globals.css`, que también carga `/casa`. Hay que separar los estilos por experiencia antes de crecer la tienda (riesgo de contaminación cruzada).

### 1.3 Estado de `/casa`

- Prototipo visual de una sola página (client component). `noindex` vía metadata: correcto.
- Ya insinúa las secciones pedidas: header, hero, "productos", Prenda del Día ($950 MXN ya escrito), Atelier con selector de 4 tonos, diseñadora, servicios, footer.
- **Todo es decorativo**: botones "Buscar", "Bolsa · 0" y "Explorar ＋" no hacen nada; las "prendas" son fotos editoriales con etiquetas genéricas (aceptable como demo, pero sin marcar como contenido temporal — §17 del brief).
- La regla de Prenda del Día está escrita en código; el brief exige que sea administrable.
- No hay enlace desde `/` hacia `/casa` (correcto).

### 1.4 Infraestructura y despliegue

- **Vercel, hallazgo importante**: al menos dos proyectos del equipo `colo-proyects` despliegan este mismo repo desde `main` y ambos publican a producción con cada push: `angelaespana42.vercel.app` y `angelastore.vercel.app` (mismo timestamp de deploy). Existen además proyectos `ames`, `ames-3m28`, `angela-espana`, `angela-espa-a-mp8z` que podrían estar también conectados. Hay que elegir **un** proyecto canónico y desconectar el resto antes de agregar variables de entorno, webhooks de Stripe y base de datos — de lo contrario habrá múltiples entornos "producción" con secretos divergentes y webhooks duplicados.
- No hay dominio propio configurado (solo `*.vercel.app`).
- No hay `.vercel/project.json` local ni variables de entorno definidas.
- `vercel.json` mínimo y correcto. Node 24 en Vercel, `engines >= 20.9`: compatible.
- **CI residual**: `.github/workflows/jekyll-docker.yml` intenta construir el repo con Jekyll en cada push/PR. Es basura de la etapa estática; falla o pierde minutos de CI. Eliminar.
- No hay `robots.txt`, `sitemap`, ni cabeceras de seguridad.

### 1.5 Conclusión de auditoría

Base sana y pequeña: no hay deuda estructural que migrar, pero tampoco existe nada de comercio real. Todo lo transaccional (datos, auth, admin, carrito, pagos) se construye desde cero. Los tres problemas a corregir antes de la Fase 1: proyectos Vercel duplicados, workflow Jekyll, CSS compartido entre experiencias.

---

## 2. Arquitectura técnica propuesta

### 2.1 Stack

| Capa | Elección | Motivo |
|---|---|---|
| App | Next.js 16 App Router (ya en uso) | Server Components para catálogo, Server Actions para admin/carrito |
| Base de datos | Supabase Postgres | Administrada, RLS, ya hay acceso MCP del equipo; sin decisión previa documentada que lo contradiga |
| Auth admin | Supabase Auth (email + contraseña, cuenta creada manualmente) | Sin registro público; rol `admin` en tabla propia |
| Imágenes de producto | Supabase Storage (bucket `products`) + `next/image` | Fuera del repo, como exige el brief |
| Pagos | Stripe Checkout (MXN) | No tocamos datos de tarjeta; webhook firmado confirma pedido |
| Validación | Zod en todos los formularios y actions | Cliente y servidor |
| Estilos | CSS Modules + design tokens en variables CSS | Continuidad con lo existente; sin introducir Tailwind a mitad de proyecto |
| Email transaccional | Resend (cuando haya cuenta) | Confirmación de pedido; opcional hasta configurarse |

### 2.2 Principios

- **Servidor manda**: precios, inventario, promociones y totales se calculan siempre en servidor a partir de la base de datos. El cliente solo envía identificadores y cantidades.
- **Centavos enteros**: todo precio es `integer` en centavos MXN (`price_cents`). Formateo con `Intl.NumberFormat("es-MX")` solo en presentación.
- **Tres zonas** con límites claros:
  - `app/(campana)/` → landing `/` (se toca solo con autorización).
  - `app/casa/` → tienda (noindex hasta lanzamiento, vía metadata de layout + cabecera `X-Robots-Tag` en `proxy.ts`).
  - `app/admin/` → panel (gate de sesión en `proxy.ts` **y** re-verificación de sesión/rol en cada Server Action, route handler y query de servidor — el proxy nunca es la única barrera).
- **Contenido demo solo en desarrollo**: componentes de demostración se muestran únicamente cuando `NODE_ENV !== "production"` o con flag de revisión, y con etiqueta visible "Contenido temporal".

### 2.3 Estructura de carpetas objetivo

```
app/
  (campana)/page.tsx            # landing actual, intacta, con su CSS propio
  casa/
    layout.tsx                  # header/footer/bolsa, noindex, tokens de la casa
    page.tsx                    # home tienda
    tienda/page.tsx
    colecciones/[slug]/page.tsx
    producto/[slug]/page.tsx
    atelier/page.tsx
    prenda-del-dia/page.tsx
    historia/page.tsx
    contacto/page.tsx
    carrito/page.tsx
    checkout/page.tsx
    checkout/resultado/page.tsx
  admin/
    layout.tsx                  # gate de sesión
    login/page.tsx
    page.tsx                    # dashboard
    productos/…  colecciones/…  pedidos/…  promocion/…  atelier/…  contenido/…  importar/…
  api/
    webhooks/stripe/route.ts    # solo cuando se autorice conectar Stripe
proxy.ts                        # Next 16: reemplaza a middleware.ts (noindex casa, gate admin)
lib/
  db/ (cliente supabase server/browser, queries tipadas)
  commerce/ (carrito, totales, promociones, inventario)
  validation/ (esquemas zod)
components/
  casa/…  admin/…  ui/…
supabase/migrations/…           # migraciones versionadas SQL
docs/…
```

### 2.4 Seguridad (resumen operativo)

- `proxy.ts` (Next 16; no `middleware.ts`): `/admin/*` exige sesión; además cada Server Action/route de admin re-verifica sesión y rol en servidor (el proxy no es la única barrera).
- Claves: `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` solo en servidor (nunca `NEXT_PUBLIC_*`).
- RLS activa en todas las tablas: lectura pública solo de productos/colecciones publicadas; escritura solo service-role/admin.
- Storage: bucket de productos con lectura pública de imágenes publicadas y escritura solo admin.
- Webhook Stripe con verificación de firma; idempotencia por `event.id`.
- Límites simples en servidor (contadores con ventana temporal en Postgres) para login, checkout y formulario Atelier; rate limiting externo solo cuando una necesidad medida lo justifique.
- Tabla `audit_log` para toda mutación administrativa.
- Logs sin PII (nunca direcciones, teléfonos ni emails completos).

---

## 3. Mapa de rutas

| Ruta | Función | Índice |
|---|---|---|
| `/` | Landing liquidación (intacta) | index |
| `/casa` | Home tienda: hero, destacados, Prenda del Día, Atelier, trayectoria breve, servicios | noindex hasta lanzamiento |
| `/casa/tienda` | Catálogo completo con filtros (categoría, talla, color, precio) y búsqueda | noindex |
| `/casa/colecciones/[slug]` | Página de colección | noindex |
| `/casa/producto/[slug]` | Ficha de producto | noindex |
| `/casa/atelier` | Configurador a la medida + visualizador cromático | noindex |
| `/casa/prenda-del-dia` | Condiciones y pieza vigente de la promoción | noindex |
| `/casa/historia` | Trayectoria de Ángela (contenido administrable) | noindex |
| `/casa/contacto` | Showroom, WhatsApp, consultas | noindex |
| `/casa/carrito` | Carrito | noindex siempre |
| `/casa/checkout` (+ `/resultado`) | Datos, entrega, pago, confirmación | noindex siempre |
| `/admin/*` | Panel privado | noindex siempre + auth |
| `/api/webhooks/stripe` | Webhook de pagos | n/a |

Al lanzar: se retira el noindex de `/casa/**` (excepto carrito/checkout), se publica sitemap y canonicals. El paso de `/casa` a raíz del dominio final es una decisión separada de Ángela (ver preguntas).

---

## 4. Modelo de datos

Todos los montos en centavos MXN. Todas las tablas con `created_at`/`updated_at`. RLS en todas.

Este es el **modelo objetivo**; no se crea completo en Fase 2. Las migraciones se dividen por capacidad y cada una se escribe en la fase que la implementa y prueba (decisión §0.4):

| Capacidad | Tablas | Fase |
|---|---|---|
| Núcleo de catálogo | `admin_users`, `categories`, `collections`, `products`, `product_images`, `product_variants`, `inventory_moves`, `audit_log` | 2–3 |
| Carrito y pedidos | `customers`, `addresses`, `carts`, `cart_items`, `orders`, `order_items`, `payments` | 4–5 |
| Atelier | `atelier_requests` | 6 |
| Promociones | `promotions`, `daily_piece` | 7 |
| Contenido y ajustes | `editorial_content`, `site_settings` | cuando se necesiten (≤8) |

```
admin_users        id, auth_user_id (fk auth.users), name, role ('owner'|'editor'), active
site_settings      key, value jsonb            -- textos base, redes, flags de bloques promocionales
editorial_content  slug, title, body, status   -- historia, políticas, páginas de texto

categories         id, name, slug, position
collections        id, name, slug, description, cover_image_id, status, position
products           id, name, slug, short_description, description,
                   category_id, collection_id, tags text[],
                   price_cents, compare_at_price_cents (nullable), currency 'MXN',
                   materials, care, measurements jsonb, size_guide jsonb,
                   status ('draft'|'active'|'sold_out'|'archived'),
                   featured bool, is_new bool, limited_edition bool, one_of_a_kind bool,
                   gift_eligible bool, made_to_order bool,
                   seo_title, seo_description, published_at, video_url (nullable)
product_images     id, product_id, storage_path, alt, position, is_primary
product_variants   id, product_id, size, color, sku, stock int,
                   price_override_cents (nullable), active
                   -- inventario por combinación talla×color vive aquí (stock)

customers          id, name, email, phone
addresses          id, customer_id, line1, line2, city, state, zip, country, notes
carts              id, session_token, customer_id (nullable), status, expires_at
cart_items         id, cart_id, variant_id, qty, is_gift bool
orders             id, order_number, customer_id, address_id,
                   status ('pending'|'paid'|'preparing'|'shipped'|'delivered'|'cancelled'),
                   subtotal_cents, discount_cents, shipping_cents, total_cents,
                   delivery_method, channel ('web'|'whatsapp'), notes
order_items        id, order_id, variant_id, product_snapshot jsonb, qty,
                   unit_price_cents, is_gift bool
payments           id, order_id, provider 'stripe', provider_ref, amount_cents,
                   status, raw_event jsonb
inventory_moves    id, variant_id, delta, reason ('sale'|'restock'|'adjust'|'release'), order_id?

promotions         id, kind ('prenda_del_dia'|...), name, active, starts_at, ends_at, config jsonb
daily_piece        id, promotion_id, product_id, date_start, date_end, active,
                   min_purchase_cents, eligible_scope jsonb (productos/categorías),
                   gift_stock int, per_order_limit int, auto_apply bool,
                   legal_text, special_image_id (nullable)

atelier_requests   id, garment_type, occasion, silhouette, length, size_or_measurements jsonb,
                   color, finishes, references_text, budget_cents (nullable),
                   desired_date, comments, contact jsonb, inspiration_images jsonb,
                   ai_consent bool, status ('new'|'in_review'|'quoted'|'accepted'|'closed')

audit_log          id, admin_user_id, action, entity, entity_id, diff jsonb, created_at
```

Reglas duras:
- Un producto solo es visible en tienda si `status='active'` **y** `published_at <= now()` **y** tiene ≥1 imagen y ≥1 variante activa.
- El descuento de stock ocurre en la confirmación del webhook (con `inventory_moves` como registro), no en el cliente.
- `order_items.product_snapshot` congela nombre/precio/imagen al momento de compra.

---

## 5. Panel administrativo (diseño)

Navegación lateral: **Dashboard · Productos · Colecciones · Pedidos · Prenda del Día · Atelier · Contenido · Importar CSV · Ajustes**.

- **Dashboard**: pedidos recientes, solicitudes Atelier nuevas, alertas de stock bajo, estado de la promoción vigente.
- **Productos**: lista con filtros por estado; acciones crear/editar/duplicar/archivar (archivar y borrar imagen piden confirmación). Editor por secciones: información, fotos (subida drag&drop, orden, imagen principal), precio, variantes (matriz talla×color con stock por celda), materiales y cuidados, medidas y guía, banderas (destacado, nuevo, limitado, pieza única, elegible a obsequio, a medida), SEO, programación de publicación. Vista previa antes de publicar. Guardar como borrador o publicar.
- **Colecciones**: crear, ordenar, portada, asignar productos.
- **Pedidos**: lista por estado, detalle con líneas, pago y dirección; cambiar estado con historial; sin edición de montos.
- **Prenda del Día**: elegir producto elegible, fechas, monto mínimo, alcance de productos participantes, stock del obsequio, límite por pedido, texto legal, imagen especial, activar/desactivar, aplicación automática o manual. Vista de "cómo se ve hoy".
- **Atelier**: bandeja de solicitudes con estado y notas internas.
- **Contenido**: textos de portada, historia, políticas, servicios, redes; activar/desactivar bloques promocionales.
- **Importar CSV**: subir archivo → validación fila por fila → vista previa con errores señalados → confirmación → creación como borradores. Plantilla CSV descargable y documentada (`docs/plantilla-productos.csv`).

Transversal: validación Zod con mensajes en español, estados vacíos con guía ("Aún no hay productos. Crea el primero"), confirmaciones para acciones destructivas, todo cambio escribe en `audit_log`.

---

## 6. Flujo para agregar un producto

1. Ángela entra a `/admin` e inicia sesión.
2. Productos → "Nuevo producto".
3. Sube fotografías (se almacenan en Supabase Storage; puede reordenar y marcar la principal).
4. Escribe nombre (slug autogenerado y editable), descripción corta y completa.
5. Selecciona categoría y colección (o crea colección al vuelo).
6. Define precio (captura en pesos con decimales; se guarda en centavos) y precio anterior opcional.
7. Añade tallas y colores → se genera la matriz de variantes.
8. Carga inventario por cada combinación talla×color.
9. Añade materiales, cuidados y medidas.
10. Marca banderas (destacado, nuevo, limitado, única, elegible a obsequio, a medida).
11. Previsualiza la ficha tal como se verá en `/casa/producto/[slug]`.
12. Guarda como borrador o publica (opcionalmente programa fecha de publicación).

Criterio de éxito: producto publicado visible en tienda **sin tocar código ni hacer deploy** (datos leídos en runtime, sin regeneración estática obligatoria; ISR con revalidación por tag al guardar).

---

## 7. Flujo de compra

1. Cliente navega catálogo → ficha → elige talla y color (variantes agotadas deshabilitadas, jamás agregables).
2. "Agregar a la bolsa" (carrito persistente: cookie `cart_token` + tabla `carts`) o "Comprar ahora" (crea carrito efímero y salta a checkout). Alternativa siempre visible: "Consultar por WhatsApp" con mensaje prellenado con nombre y URL del producto.
3. Carrito: líneas, subtotal calculado en servidor, estado de la Prenda del Día ("Te faltan $X para desbloquear el obsequio"), avisos de stock.
4. Checkout: datos de contacto → dirección → método de entrega (envío en México / recogida en showroom con cita) → resumen.
5. Pago: el servidor revalida stock, precios y promoción, crea la orden en `pending` y una sesión de Stripe Checkout en MXN. El cliente paga en Stripe.
6. Webhook `checkout.session.completed` (firma verificada): orden → `paid`, descuento de inventario, registro en `payments`, obsequio confirmado o retirado si dejó de cumplir condiciones, email de confirmación si Resend está configurado.
7. `/casa/checkout/resultado`: confirmación con número de pedido, o estado de error/pendiente con salida a WhatsApp.
8. Alternativa completa sin pago en línea: "Completar por WhatsApp" arma el mensaje con el contenido del carrito y crea la orden con `channel='whatsapp'` y estado `pending` para seguimiento en el panel.

Pagos reales **apagados por defecto** (flag `payments_enabled` en `site_settings`): hasta tener cuenta Stripe correcta en MXN, productos reales, políticas publicadas, costos de entrega definidos, pruebas end-to-end y webhook verificado, el checkout ofrece únicamente la vía WhatsApp.

---

## 8. Prenda del Día (diseño)

- **Datos**: tabla `daily_piece` (§4) — nada de reglas en código. Texto legal, monto mínimo, alcance, stock del obsequio, límite por pedido, fechas y estado editables; la regla inicial "desde $950 MXN" es solo el primer registro sugerido, editable o desactivable.
- **Presentación**: módulo teatral en `/casa` — telón vino profundo, luz puntual sutil (gradiente radial), una sola pieza en escena; ocupa una franja, no la página. Página `/casa/prenda-del-dia` con condiciones completas y pieza vigente. Si no hay promoción activa: el módulo no se renderiza.
- **Motor en carrito** (todas las comprobaciones en servidor, función única `evaluateDailyPiece(cart)`):
  1. ¿Promoción activa y dentro de fechas?
  2. ¿Subtotal de productos participantes ≥ mínimo? Si no: mostrar cuánto falta.
  3. ¿Queda `gift_stock`? Si no: mensaje de agotado, sin regalo.
  4. Regalo se agrega como línea `is_gift=true` a $0, respetando `per_order_limit`, sin duplicarse.
  5. Si el carrito deja de cumplir (se quita un producto), el regalo se retira automáticamente con aviso.
  6. Revalidación completa en servidor inmediatamente antes de crear la sesión de pago; el webhook descuenta también el `gift_stock`.
- **Modo manual** (`auto_apply=false`): el cliente ve el beneficio y lo activa con un botón en el carrito.

---

## 9. Atelier y visualización de color

### V1 (esta construcción)
- Configurador multipaso en `/casa/atelier`: tipo de prenda → ocasión → silueta → largo → talla o medidas → color → acabados → referencias e imágenes de inspiración (subida a Storage) → presupuesto opcional → fecha deseada → comentarios → contacto.
- Guarda `atelier_request` y ofrece continuar por WhatsApp con resumen prellenado.
- **Visualizador cromático determinista**: silueta vectorial (SVG) de la prenda coloreada con la paleta seleccionada, con etiqueta permanente "Vista conceptual de color — el tono real del textil se confirma con Ángela". Sin IA, sin fingirla. Tres categorías visuales siempre diferenciadas: (1) vista conceptual, (2) fotografía real, (3) imagen generada por IA (cuando exista).

### V2 (posterior, diseño previsto)
- Generación de imagen servidor-side detrás de una interfaz `VisualizationProvider` intercambiable (proveedor por decidir).
- Requisitos ya contemplados en el esquema: `ai_consent` registrado, límites de uso por sesión/día, tope de costo mensual, moderación de prompts e imágenes, estados de espera y error, cola de revisión humana en el panel, marca de agua/etiqueta "Visualización generada por IA — no es una reproducción exacta del resultado final".

---

## 10. Dependencias externas necesarias

| Servicio | Para qué | Estado |
|---|---|---|
| Supabase | Postgres, Auth, Storage | Confirmado (§0.2). Org disponible: **"Colo proyects"** (`nccthzlvhwckzbyespue`, plan Pro, única org con acceso). Nombre: `angela-espana-prod`. Región propuesta: `us-east-1` (misma que los demás proyectos del equipo; mejor latencia México de las disponibles). Costo: **$10 USD/mes** adicionales (cómputo del proyecto en plan Pro, dato de API). Pendiente: confirmación de Juan para crear |
| Stripe (cuenta MXN de Ángela/Efecto42) | Pagos | **No conectar** ni crear webhooks hasta confirmar productos, políticas, envío y cuenta comercial (§0.6) |
| Vercel (`angelaespana42` canónico) | Hosting + env vars | Duplicados por eliminar manualmente (sin API de borrado en MCP); ver reporte de Fase 0 |
| Resend (u otro SMTP) | Emails de confirmación | Opcional hasta tener cuenta |
| Dominio propio | Lanzamiento | No existe aún |
| Analytics (Vercel Analytics o Plausible) | Eventos §15 | Decisión pendiente |
| Proveedor IA de imagen | Atelier V2 | Diferido |

## 11. Riesgos

1. **Vercel duplicado** (alto): dos+ proyectos producción del mismo repo → webhooks y secretos divergentes. Mitigación: consolidar antes de Fase 2.
2. **Contenido faltante** (alto): sin fotos de producto, precios, tallas, políticas ni textos reales, la tienda no puede lanzarse. Mitigación: estados vacíos elegantes + flujo CSV + lista de pendientes para Ángela (§13).
3. **Stripe/fiscal** (medio): titularidad de cuenta, facturación y política de devoluciones son decisiones de negocio. Pagos apagados por flag hasta resolverse.
4. **Un solo entorno de datos** (medio): sin staging, las pruebas tocan datos reales. Mitigación: Supabase branching o proyecto de staging + preview deployments.
5. **Fotografías pesadas** (medio): rendimiento. Mitigación: Storage + `next/image` + límites de tamaño en subida.
6. **Regresión de la landing** (medio): CSS global compartido. Mitigación: separar hojas por zona en Fase 1 y verificar `/` píxel a píxel.
7. **Alcance del panel** (medio): el admin completo es el grueso del trabajo; recortarlo mal generaría "administrable" solo de nombre. Mitigación: fases 3–8 incrementales con criterios explícitos.
8. **Indexación accidental** (bajo): mitigado con noindex en layout + `X-Robots-Tag` + exclusión de sitemap; verificación en Fase 9.

## 12. Fases y criterios de aceptación

Cada fase termina con: `tsc --noEmit` limpio, `eslint .` limpio (Next 16 eliminó `next lint`; config en `eslint.config.mjs`), `next build` exitoso, prueba manual de rutas en móvil y escritorio, y reporte de qué quedó hecho vs. pendiente de datos/decisiones.

- **Fase 0 — Saneamiento y arquitectura** (este doc): eliminar workflow Jekyll, ESLint vía `eslint.config.mjs` + script `eslint .`, separar CSS de campaña sin cambio visual, consolidación manual de Vercel (canónico: `angelaespana42`). ✔ cuando `/` y `/casa` quedan idénticas y el build pasa.
- **Fase 1 — Sistema visual y navegación**: tokens de la casa (marfil, tinta, vino, champagne), layout de `/casa` (header, bolsa, footer), esqueleto de todas las rutas con estados vacíos, noindex por middleware. ✔ navegación completa por teclado, sin contenido inventado.
- **Fase 2 — Datos y catálogo**: proyecto Supabase, migraciones **solo del núcleo de catálogo** (§4: admins, categorías, colecciones, productos, imágenes, variantes, inventario, auditoría), RLS, Storage, seeds demo solo-desarrollo, tienda/colecciones/lectura de catálogo real. ✔ producto insertado por SQL aparece en tienda; borradores jamás visibles.
- **Fase 3 — Panel administrativo**: auth, CRUD de productos e imágenes, variantes e inventario, colecciones, audit log, CSV. ✔ Ángela crea y publica un producto completo sin tocar código; acciones destructivas confirman.
- **Fase 4 — Ficha, búsqueda y carrito**: migraciones de carrito (`carts`, `cart_items`), ficha completa (§7 brief), zoom, guía de tallas, relacionados, búsqueda, carrito persistente con validación servidor. ✔ variante agotada inagregable; carrito sobrevive recarga; totales solo de servidor.
- **Fase 5 — Pedidos**: migraciones de pedidos (`customers`, `addresses`, `orders`, `order_items`, `payments`), checkout como invitado, registro de órdenes, inventario transaccional, vía WhatsApp, panel de pedidos. **Stripe no se conecta ni se crean webhooks** hasta que Juan confirme cuenta comercial, productos, políticas y envío (§0.6); la estructura queda lista detrás del flag `payments_enabled`. ✔ pedido por WhatsApp end-to-end registrado y administrable; manipulación de precio en cliente no altera totales.
- **Fase 6 — Atelier**: migración `atelier_requests`, configurador, visualizador determinista, solicitudes en panel. ✔ solicitud llega al panel con imágenes; etiquetado "vista conceptual" siempre visible.
- **Fase 7 — Prenda del Día**: migraciones `promotions`/`daily_piece`, motor completo (§8) + módulo teatral. ✔ los 6 chequeos del motor pasan pruebas, incluida revalidación pre-pago y retiro automático del regalo.
- **Fase 8 — Contenido, SEO y analítica**: historia/políticas administrables, metadata y datos estructurados de producto (preparados tras flag de lanzamiento), sitemap, eventos de analítica (§15 brief). ✔ contenido editable desde panel; eventos disparan en los 7 puntos definidos.
- **Fase 9 — Seguridad, pruebas y lanzamiento**: rate limiting, revisión de RLS y headers, accesibilidad (foco, contraste, alt, reduced motion), pruebas de flujo, checklist de lanzamiento. ✔ `/security-review` sin hallazgos altos; lanzamiento solo con autorización explícita.

## 13. Preguntas indispensables (no resolubles desde el repo)

**Bloquean fases tempranas**
1. ~~¿Cuál proyecto Vercel canónico?~~ **Resuelto (§0.1)**: `angelaespana42`; duplicados de Ángela España autorizados a eliminar.
2. ~~¿Confirmas Supabase?~~ **Resuelto (§0.2)**: Supabase, proyecto `angela-espana-prod`. Pendiente solo confirmar org "Colo proyects", región `us-east-1` y costo $10 USD/mes antes de crear.

**Bloquean lanzamiento comercial (pueden esperar, se dejan como campos pendientes)**
3. Cuenta Stripe: ¿de Ángela o de Efecto42? ¿Existe ya, con moneda MXN? ¿Se requerirá facturación (CFDI)?
4. Categorías reales del catálogo y colecciones iniciales.
5. Sistema de tallas que maneja Ángela (XS–XL, numérico, a medida).
6. Costos y tiempos de envío en México; ¿hay envíos internacionales?
7. Políticas comerciales: cambios, devoluciones, apartados, anticipos del Atelier, privacidad.
8. Texto legal definitivo de la Prenda del Día y si la regla de $950 MXN sigue vigente.
9. Historia/trayectoria: ¿quién redacta el texto y entrega el material fotográfico?
10. Redes sociales oficiales a enlazar.
11. Email oficial de la marca (para confirmaciones y contacto).
12. Dominio definitivo y, al lanzar, ¿la tienda vive en la raíz del dominio (reemplazando la landing cuando termine la liquidación) o conviven?
13. ~~¿Cuentas de cliente en V1?~~ **Resuelto (§0.5)**: compra como invitado; sin cuentas de cliente. El header no mostrará "Cuenta".
14. Correo de la administradora para crear su acceso a `/admin`.
