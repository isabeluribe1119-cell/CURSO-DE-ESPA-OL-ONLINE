---
slug: banco-prompts
title: Banco de prompts para crear materiales
type: Banco de prompts
icon: robot
summary: Catorce prompts reutilizables con variables editables para planificar clases, crear diálogos, lecturas, ejercicios, juegos infantiles, rúbricas, revisiones y mensajes, con criterios para evaluar los resultados.
ages: [Todas las edades]
areas: [Tecnología, Materiales]
module: [9, 16]
---

# Banco de prompts para crear materiales

> Basado en el [Módulo 16](/modulos/16-inteligencia-artificial/). Funcionan con cualquier asistente de IA conversacional general. **La IA propone; el tutor decide**: revisa siempre los resultados.

## Cómo usar este banco

1. Copia el prompt.
2. Sustituye las **variables** entre corchetes: `[NIVEL]`, `[L1]`, `[EDAD]`, `[VARIEDAD]`, `[OBJETIVO]`, `[ESTRUCTURA]`, `[TEMA]`, `[DURACIÓN]`.
3. **No incluyas datos personales** del estudiante: usa un perfil anonimizado.
4. Evalúa el resultado con los criterios del final.
5. Guarda la versión mejorada del prompt.

## Variables frecuentes

| Variable | Ejemplos |
|---|---|
| `[NIVEL]` | A1, A2, B1, B2, C1, C2 (MCER) |
| `[L1]` | inglés, portugués, chino mandarín, alemán… |
| `[VARIEDAD]` | español de Colombia (Bogotá), de México, rioplatense, del centro de España… |
| `[EDAD]` | 6 años, adolescente de 15, adulto de 40 |
| `[OBJETIVO]` | pedir en un restaurante, narrar un viaje, argumentar en una reunión |
| `[ESTRUCTURA]` | pretérito indefinido, *por/para*, subjuntivo en recomendaciones |

## 1. Plan de clase completo

```
Actúa como diseñador/a instruccional especializado/a en español como lengua extranjera.
Diseña un plan de clase online de [DURACIÓN] minutos para:
- Estudiante: [EDAD], lengua materna [L1], nivel [NIVEL], intereses: [INTERESES], objetivo personal: [OBJETIVO PERSONAL].
- Objetivo comunicativo de la clase: [OBJETIVO].
- Foco lingüístico: [ESTRUCTURA / LÉXICO].
- Variedad de español: [VARIEDAD].
Estructura con tiempos: activación, presentación contextualizada, descubrimiento guiado de la forma, práctica controlada, producción comunicativa, retroalimentación y cierre.
Para cada fase: instrucciones para el tutor, lo que hace el estudiante, materiales y respuestas esperadas.
Incluye un criterio de evaluación, un plan B si el estudiante no entiende y una tarea de 15 minutos.
No uses materiales con derechos de terceros; describe de forma genérica cualquier recurso externo.
```

## 2. Secuencia de gramática integrada

```
Diseña una secuencia didáctica para enseñar [ESTRUCTURA] a un estudiante de nivel [NIVEL] (lengua materna [L1]), integrando tres perspectivas:
- tradicional (forma, paradigma, reglas formales),
- cognitiva (valor central, perspectiva del hablante, contraste de significados; sin metalenguaje complejo),
- comunicativa (situación realista, intención, tarea con resultado).
Sigue estos 8 pasos: 1) situación comunicativa; 2) objetivo medible; 3) presentación del significado con preguntas de significado; 4) descubrimiento de la forma; 5) práctica controlada que exija atender al significado; 6) producción comunicativa; 7) retroalimentación y criterio de logro; 8) adaptaciones para [NIVEL INFERIOR] y [NIVEL SUPERIOR].
Indica qué usos son convencionales y conviene aprender como bloques. Si hay variación entre variedades del español, señálala.
```

## 3. Diálogo por nivel

```
Escribe un diálogo original en español de [VARIEDAD] para nivel [NIVEL].
Situación: [SITUACIÓN]. Personajes: [PERSONAJES].
[N] intervenciones, máximo [M] palabras cada una.
Estructuras objetivo (al menos 2 veces, con naturalidad): [ESTRUCTURAS].
Debe sonar natural (marcadores, reacciones), tener un pequeño problema o giro y evitar estereotipos.
Después: 4 preguntas de comprensión (2 globales, 2 de detalle) con respuestas, y una nota cultural o pragmática de 2 líneas marcada como «verificar».
```

## 4. Lectura graduada original

```
Escribe una lectura graduada original de [N] palabras para nivel [NIVEL] sobre [TEMA], ambientada en [LUGAR].
Restricciones: tiempos verbales permitidos: [TIEMPOS]; léxico frecuente; frases de máximo [X] palabras; incluye 5 palabras nuevas en negrita que se entiendan por el contexto.
Debe tener un personaje con un objetivo, un problema y una resolución.
Después: glosario de las 5 palabras (definición sencilla en español), 5 preguntas de comprensión (V/F/no se dice + 2 abiertas) y clave.
No incluyas datos históricos o culturales que no puedas verificar.
```

## 5. Ejercicios de práctica controlada con significado

```
Crea 10 ítems de práctica controlada sobre [ESTRUCTURA] para nivel [NIVEL].
Cada ítem debe obligar a comprender la frase para elegir la forma (no basta con mirar una palabra clave).
Incluye 2 ítems en los que ambas opciones sean posibles con significados distintos y pide al estudiante que explique la diferencia.
Contexto común para todos los ítems: [CONTEXTO, p. ej. un chat entre amigos que organizan un viaje].
Añade clave con una justificación breve para cada respuesta.
```

## 6. Tarea comunicativa con vacío de información

```
Diseña una tarea con vacío de información para una clase online individual (tutor + estudiante) de nivel [NIVEL].
Objetivo: [OBJETIVO]. Lengua necesaria: [ESTRUCTURAS].
Prepara dos tarjetas: una para el estudiante y otra para el tutor, con información complementaria.
Define el resultado de la tarea (qué deben decidir o conseguir), una complicación a mitad de la tarea y 6 expresiones útiles como andamiaje.
Incluye criterios de evaluación observables.
```

## 7. Juegos para niños

```
Diseña 4 juegos de 5 minutos para una clase online de español con un niño de [EDAD] años que [no lee / está aprendiendo a leer / lee con fluidez].
Vocabulario objetivo: [6-8 PALABRAS]. Materiales disponibles en casa: [MATERIALES].
Cada juego: instrucción de una frase acompañable con gestos; alterna movimiento y calma; el primer juego permite responder sin hablar; la exigencia de producción aumenta progresivamente.
Indica el papel del adulto acompañante y una adaptación si el niño se cansa.
No incluyas enlaces a vídeos ni canciones con derechos de autor; propone canciones originales sencillas o de dominio público.
```

## 8. Preguntas de conversación graduadas

```
Crea 10 preguntas de conversación sobre [TEMA] para un estudiante adulto de nivel [NIVEL], ordenadas de lo concreto y personal a lo abstracto y argumentativo.
Para cada pregunta, indica la estructura que probablemente necesitará (p. ej. imperfecto, condicional, subjuntivo) y una pregunta de seguimiento.
Añade un dilema final que obligue a tomar postura y un banco de 8 expresiones útiles.
Evita temas sensibles: [TEMAS QUE EVITAR].
```

## 9. Adaptación de un texto

```
Adapta este texto (propio o con licencia que permite adaptación) para nivel [NIVEL] y estudiante de [EDAD].
Mantén las ideas principales y el tono. Acorta las frases, sustituye el léxico poco frecuente (excepto: [PALABRAS QUE SE MANTIENEN]) y explicita los conectores. Extensión objetivo: [N] palabras.
Después, muestra en una tabla los principales cambios y su motivo.
TEXTO: [PEGAR]
```

## 10. Prueba de comprensión

```
Diseña una prueba de comprensión [lectora / auditiva] para nivel [NIVEL] a partir de este texto o transcripción:
3 preguntas de opción múltiple (3 opciones; distractores plausibles), 3 ítems de verdadero / falso / no se dice, 1 pregunta de inferencia abierta.
Clave con la línea del texto que justifica cada respuesta. Comprueba que ninguna pregunta se responde sin el texto.
TEXTO: [PEGAR]
```

## 11. Rúbrica analítica

```
Crea una rúbrica analítica de 4 niveles (inicial, en desarrollo, adecuado, destacado) para evaluar esta tarea [oral / escrita] de nivel [NIVEL]: [DESCRIPCIÓN].
Criterios: [LISTA DE CRITERIOS].
Descriptores observables y propios del nivel [NIVEL] (no de un hablante nativo). Formato: tabla.
Añade 3 preguntas de autoevaluación para el estudiante.
```

## 12. Revisión pedagógica de un texto del estudiante

```
Eres profesor/a de ELE. Revisa este texto de un estudiante de nivel [NIVEL], hablante de [L1]. No reescribas todo el texto.
1) Tabla: fragmento | propuesta | tipo de error (gramática, léxico, ortografía, cohesión, registro) | explicación breve adecuada al nivel.
2) Solo errores relevantes para el nivel o que afectan a la comprensión; agrupa los repetidos.
3) 2 fortalezas concretas. 4) 2 prioridades.
5) Si un uso es correcto en alguna variedad del español, indícalo en lugar de marcarlo como error.
TEXTO (anonimizado): [PEGAR]
```

## 13. Resumen de clase para el estudiante

```
A partir de mis notas de clase (anonimizadas), redacta un resumen breve para el estudiante en español de nivel [NIVEL]:
- Lo que hicimos hoy (2 líneas).
- Expresiones nuevas (lista).
- 3 correcciones importantes (forma incorrecta → forma adecuada, con una explicación de una línea).
- Tarea para la próxima clase.
Tono cercano y motivador. No añadas nada que no esté en mis notas.
NOTAS: [PEGAR]
```

## 14. Mensaje de seguimiento ético

```
Redacta un mensaje breve y cordial en español (registro [formal / informal]) para [situación: después de una clase de prueba / estudiante que dejó de reservar / recordatorio de pago].
Requisitos: sin presión ni urgencias falsas, sin prometer resultados, con una propuesta concreta y la opción explícita de no continuar.
Máximo 90 palabras.
```

## Criterios para evaluar cualquier resultado

| Criterio | Pregunta | ✓ |
|---|---|---|
| Corrección lingüística | ¿Hay errores de gramática, ortografía, tildes o léxico? | ☐ |
| Naturalidad | ¿Lo diría así un hablante real? (léelo en voz alta) | ☐ |
| Coherencia de variedad | ¿Es consistente con la variedad elegida? | ☐ |
| Adecuación al nivel | ¿Léxico y estructuras corresponden al nivel? | ☐ |
| Alineación con el objetivo | ¿Practica realmente lo que dice practicar? | ☐ |
| Atención al significado | ¿Exige comprender para responder? | ☐ |
| Clave correcta | ¿Resolví yo la actividad y coincide con la clave? | ☐ |
| Veracidad | ¿Datos, fechas y fuentes existen y son correctos? | ☐ |
| Respeto e inclusión | ¿Evita estereotipos y contenidos inadecuados? | ☐ |
| Derechos y privacidad | ¿Sin contenido protegido de terceros ni datos personales? | ☐ |

---
*Aula Abierta ELE · Isabel Uribe · CC BY-SA 4.0*
