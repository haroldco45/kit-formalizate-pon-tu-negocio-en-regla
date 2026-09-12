# Kit Formalízate

PWA para que un negocio pequeño en Colombia sepa qué le falta para quedar en regla, cuánto le cuesta y cuándo se le vence cada papel. Funciona sin internet y guarda todo en el propio celular.

**Desarrollada por Vibras Positivas HM — Derechos de Autor Reservados**

---

## Qué hace

| Pestaña | Para qué sirve |
|---|---|
| **Ruta** | 9 pasos de formalización, cada uno con dónde se hace, qué cuesta y el plazo. Se marcan como hechos y el avance queda guardado. |
| **Costos** | Calculadora de matrícula y renovación mercantil con las tarifas oficiales 2026, más el chequeo de si ya toca cobrar IVA. |
| **Papeles** | Lista de documentos con sus vencimientos. Alerta automática cuando faltan menos de 60 días para el 31 de marzo. |
| **Mi negocio** | Datos del negocio. La cédula o NIT se muestra enmascarada por defecto. |

El botón de WhatsApp arma un mensaje con el avance y lo que falta, listo para enviar al dueño o al contador.

## Valores vigentes en esta versión (2026)

| Concepto | Valor | Norma |
|---|---|---|
| UVT | $52.374 | Resolución DIAN 000238 del 15 de diciembre de 2025 |
| UVB | $12.110 | Resolución MinHacienda, vigencia 2026 |
| SMMLV | $1.750.905 | Decretos 1469 y 1470 de 2025 |
| Auxilio de transporte | $249.095 | Decretos 1469 y 1470 de 2025 |
| Tope no responsable de IVA | $183.309.000 (3.500 UVT) | Art. 437 E.T. |
| Tope de costos con documento POS | $261.870 (5 UVT) | — |
| Formulario RUES | $8.500 | Decreto 1074 de 2015, mod. Decreto 045 de 2024 |
| Certificado de matrícula mercantil | $6.100 | Decreto 1074 de 2015, mod. Decreto 045 de 2024 |

### Tarifa de matrícula y renovación del comerciante

| Activos | Fórmula |
|---|---|
| Hasta $78.715.000 | $24.220 + 8.477 × (Activos / 1.000.000) |
| Hasta $302.750.000 | $575.225 + 4.238,5 × (Activos − $78.715.000) / 1.000.000 |
| Hasta $787.150.000 | $1.359.347,5 + 1.211 × (Activos − $302.750.000) / 1.000.000 |
| Hasta $7.871.500.000 | $1.843.747,5 + 544,95 × (Activos − $787.150.000) / 1.000.000 |
| Hasta $24.220.000.000 | $5.031.705 + 302,75 × (Activos − $7.871.500.000) / 1.000.000 |
| En adelante | $9.118.830 + 151,375 × (Activos − $24.220.000.000) / 1.000.000, tope $12.110.000 |

Verificado contra el ejemplo oficial: activos de $73.000.000 → $643.041.

### Tarifa de establecimiento de comercio

| Activos hasta | Misma jurisdicción | Otra |
|---|---|---|
| $78.715.000 | $48.400 | $97.000 |
| $302.750.000 | $121.000 | $242.000 |
| $787.150.000 | $194.000 | $388.000 |
| $7.871.500.000 | $266.000 | $533.000 |
| $24.220.000.000 | $339.000 | $678.000 |
| $121.100.000.000 | $412.000 | $823.000 |
| En adelante | $484.000 | $969.000 |

## Actualización anual

En enero hay que tocar un solo bloque del `index.html`, el objeto `V` y los arreglos `TRAMOS_MATRICULA` y `TRAMOS_ESTAB`. Fuentes a revisar cada año:

- UVT: resolución de la DIAN de diciembre.
- UVB: resolución del Ministerio de Hacienda de diciembre.
- Tarifas de registro: circular de Confecámaras o la página de tarifas de cualquier Cámara de Comercio.
- SMMLV: decreto de fin de año del Ministerio de Trabajo.

También hay que subir el número de versión del caché en `sw.js` (`kit-formalizate-v1` → `v2`) para que los celulares que ya la tienen instalada reciban los valores nuevos.

## Archivos

```
index.html                 app completa (HTML + CSS + JS, sin dependencias)
manifest.json              manifiesto PWA
sw.js                      service worker, cache-first
icon-192.png               ícono
icon-512.png               ícono
icon-maskable-512.png      ícono maskable para Android
og-kit-formalizate.png     imagen Open Graph 1200×630
```

## Publicación

1. Subir la carpeta completa al hosting (Netlify, GitHub Pages o cPanel).
2. Confirmar que la ruta pública coincide con la de las metaetiquetas: `https://vibraspositivashm.com/kit-formalizate/`. Si cambia, ajustar `og:url` y `og:image` en el `index.html`.
3. La PWA necesita HTTPS para que el service worker y el botón de instalar funcionen.
4. Probar el aviso de instalación en Chrome Android antes de enviar el enlace por WhatsApp.

## Tratamiento de datos

La app no envía información a ningún servidor. Todo queda en el `localStorage` del dispositivo, con respaldo en memoria si el navegador lo bloquea. La cédula o NIT se muestra enmascarada salvo que el usuario toque "Ver". Incluye aviso de privacidad y botón de borrado total, conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.

## Alcance

La app orienta sobre trámites nacionales. Uso del suelo, concepto sanitario y bomberos los fija cada municipio, por eso aparecen como "varía por municipio" en vez de traer un valor que quedaría mal en otra alcaldía.
