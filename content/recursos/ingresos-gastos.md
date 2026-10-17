---
slug: ingresos-gastos
title: Hoja de cálculo de ingresos y gastos
type: Hoja de cálculo
icon: coins
summary: Hoja de cálculo con fórmulas para pasar de la facturación al ingreso neto, calcular el ingreso por hora trabajada y estimar tu precio mínimo por hora. Valores de ejemplo ilustrativos.
ages: [Todas las edades]
areas: [Finanzas, Negocio]
module: [15]
extra: [ingresos-gastos.csv]
---

# Hoja de cálculo de ingresos y gastos

> Basada en el [Módulo 15](/modulos/15-precios-ingresos/). **Los valores de ejemplo son ilustrativos** (cifras redondas para practicar), no precios de mercado ni expectativas de ingresos. No es asesoramiento fiscal.

## Cómo usarla

1. Descarga el archivo **CSV** (botón de descarga de esta página).
2. Ábrelo con **Google Sheets** (Archivo → Importar → Subir), **LibreOffice Calc** o **Excel**.
   - Si Excel muestra todo en una sola columna, usa *Datos → Desde texto/CSV* y elige la **coma** como separador.
   - Las fórmulas solo usan operaciones básicas (+ − × ÷), compatibles con cualquier idioma de la hoja de cálculo.
3. Cambia **solo** los valores de la sección «Parámetros» (columna B, filas 3 a 12) y de «Cálculo del precio mínimo» (filas 24 y 25).
4. Los «Resultados» se calculan solos.
5. Duplica la hoja cada mes para comparar.

## Estructura

| Fila | Concepto | Tipo |
|---|---|---|
| 3–12 | Precio, clases, comisiones, gastos, impuestos estimados, horas trabajadas | Datos que introduces |
| 14 | Facturación bruta | `= precio × clases` |
| 15 | Comisiones de plataformas | `= facturación × % comisión` |
| 16 | Ingresos recibidos | `= facturación − comisiones − comisiones de pago` |
| 17 | Gastos profesionales | `= suma de gastos` |
| 18 | Beneficio antes de impuestos | `= ingresos recibidos − gastos` |
| 19 | Impuestos estimados | `= beneficio × % impuestos` |
| 20 | **Ingreso neto** | `= beneficio − impuestos` |
| 21 | Ingreso neto por hora de clase | `= ingreso neto ÷ clases` |
| 22 | **Ingreso neto por hora trabajada** | `= ingreso neto ÷ horas totales` |
| 26 | Facturación necesaria | `= (ingreso objetivo + gastos) ÷ (1 − % impuestos) ÷ (1 − % comisión)` |
| 27 | **Precio mínimo por hora** | `= facturación necesaria ÷ horas vendibles` |

## Resultado con los valores de ejemplo

| Concepto | Valor |
|---|---|
| Facturación bruta | 1 250 |
| Ingresos recibidos | 912,50 |
| Gastos profesionales | 80 |
| Ingreso neto | 666 |
| Ingreso neto por hora de clase | 13,32 |
| Ingreso neto por hora trabajada | 8,88 |
| Precio mínimo por hora (para un objetivo de 1 000 netos) | 22,50 |

Observa la diferencia entre el precio de la clase (25) y el ingreso neto por hora trabajada (8,88): es la razón por la que conviene calcular antes de fijar precios.

## Registro mensual sugerido (copia en otra pestaña)

| Mes | Facturación | Ingreso neto | Horas trabajadas | Neto por hora trabajada | Estudiantes activos | Notas |
|---|---|---|---|---|---|---|
| | | | | | | |

---
*Aula Abierta ELE · Isabel Uribe · CC BY-SA 4.0*
