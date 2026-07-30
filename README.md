# steward.cl — réplica estática

Réplica del sitio de Steward implementada como archivos estáticos, con la misma
estructura y aspecto del sitio actual pero sin PrestaShop detrás.

> Copia de trabajo. No es el sitio oficial de Steward, no procesa compras y lleva
> `noindex` para no aparecer en buscadores ni competir con el original por contenido
> duplicado. El contenido (nombres, precios, SKU, fotos) es material real de steward.cl.

## Páginas

| Ruta | Qué es |
|---|---|
| `/` | Home |
| `/utensilios-de-cocina/` · `/mezquinos/` · `/menaje-cocina/` · `/moldes/` · `/espatulas-de-cocina/` | Categorías |
| `/producto/…/` | Una ficha por categoría (5) |
| `/tiendas/` | Las tres tiendas |

## Estructura

```
/
├── index.html                 home
├── <categoria>/index.html     5 categorías
├── producto/<slug>/index.html 5 fichas
├── tiendas/index.html
├── assets/
│   ├── site.css               única hoja de estilo
│   └── app.js                 único script, sin dependencias
├── img/                       fotos de producto, logo, iconos
└── robots.txt
```

Sin proceso de build: son archivos que cualquier hosting estático sirve tal cual.
En Render va con *publish directory* en la raíz, sin build command, rama `main`.

## Cómo se genera

```bash
python3 extrae5.py        # catálogo de steward.cl -> contenido.json
python3 genera_sitio.py   # contenido.json + plantillas -> demo/
```

Los scripts viven en el repositorio de trabajo de la agencia. El contenido está separado
de la presentación: hoy es un JSON, y en una implementación productiva ese JSON lo
alimenta la base de datos del catálogo.

## De dónde salió el contenido

steward.cl está detrás de un firewall de Cloudflare que devuelve 403 a cualquier cliente
que no sea un navegador con una persona detrás, así que hubo que cruzar dos fuentes:

- **Nombres, precios y SKU**: buscador del sitio en vivo. Son los vigentes al 30 de julio
  de 2026.
- **Fotos**: snapshots públicos de Wayback Machine.
- Se unen por el **slug del producto**, que aparece tanto en su URL como en el nombre del
  archivo de imagen.

Por eso cada categoría muestra una selección y no el catálogo completo: solo entraron los
productos cuya foto fue posible recuperar del archivo. En una implementación productiva
las fotos vienen del catálogo y esta restricción no existe.

## Lo que esta copia no tiene

- Carro y pasarela de pago (el botón avisa que no está conectado).
- Buscador funcional, cuenta de usuario ni seguimiento de pedido.
- Stock en tiempo real.
- El catálogo completo: son 12 páginas, no las ~15.000 del sitio real.

---

GoPoint Agency · 30 de julio de 2026
