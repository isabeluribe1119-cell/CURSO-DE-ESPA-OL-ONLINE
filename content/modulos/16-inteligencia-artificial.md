---
number: 16
slug: inteligencia-artificial
title: Inteligencia artificial aplicada a la enseñanza
short: Inteligencia artificial
summary: Cómo usar la IA generativa para crear actividades, diálogos por nivel, adaptaciones, evaluaciones y revisiones, automatizar tareas repetitivas y detectar alucinaciones, con criterios de privacidad, derechos de autor y una biblioteca de prompts reutilizables.
icon: robot
hours: 5
levels: [Todos los niveles]
ages: [Todas las edades]
methods: [Diseño instruccional, Tecnología educativa]
areas: [Tecnología, Materiales]
related: [banco-prompts, lista-calidad-docente]
objectives:
  - Usar la IA generativa como asistente para crear y adaptar materiales.
  - Redactar prompts con contexto, variables y criterios de calidad.
  - Detectar alucinaciones, errores lingüísticos y fallos didácticos.
  - Proteger la privacidad de los estudiantes al usar herramientas de IA.
  - Respetar los derechos de autor y mantener la revisión humana.
  - Mantener una biblioteca personal de prompts reutilizables.
---

Las herramientas de IA generativa (chatbots y asistentes basados en grandes modelos de lenguaje) pueden ahorrar mucho tiempo a un tutor. Pero no saben quién es tu estudiante, cometen errores con apariencia de seguridad y no sustituyen tu criterio pedagógico.

> [!NOTA] Principio de este módulo
> **La IA propone; el tutor decide.** Todo material generado con IA pasa por tu revisión lingüística, didáctica y ética antes de llegar a un estudiante.

> [!VERIFICAR]
> Las herramientas de IA, sus capacidades, precios, condiciones de uso y políticas de privacidad cambian muy rápido. Los prompts de este módulo están escritos para funcionar con cualquier asistente conversacional general; adapta los detalles a la herramienta que uses y lee sus condiciones.

## Generación de actividades

> **Objetivo de la lección:** obtener borradores de actividades alineadas con un objetivo concreto.

### Anatomía de un buen prompt pedagógico

1. **Rol:** «Actúa como profesor/a de ELE con experiencia en…».
2. **Contexto del estudiante:** nivel, edad, L1, intereses, variedad de español.
3. **Objetivo de aprendizaje** concreto.
4. **Formato** de salida: número de ítems, tipo, extensión.
5. **Restricciones:** léxico, estructuras, temas que evitar.
6. **Criterios de calidad:** naturalidad, atención al significado, clave de respuestas.

```prompt
Actúa como profesor/a de español como lengua extranjera con experiencia en clases online individuales.

Estudiante: [EDAD] años, lengua materna [L1], nivel [NIVEL MCER], interesado/a en [INTERESES].
Variedad de español de referencia: [VARIEDAD, p. ej. español de Colombia].
Objetivo de la clase: [OBJETIVO COMUNICATIVO] usando [ESTRUCTURA O LÉXICO].

Crea una secuencia de 3 actividades:
1. Una actividad de práctica controlada (8 ítems) que obligue a atender al significado, no solo a la forma.
2. Una actividad semiguiada (vacío de información o elección con justificación).
3. Una tarea comunicativa final con situación, rol del estudiante, rol del tutor y resultado esperado.

Requisitos:
- Lengua natural y coherente con la variedad indicada (no mezcles vosotros/ustedes).
- Incluye clave de respuestas y respuestas posibles para la tarea final.
- Indica qué errores son previsibles para un hablante de [L1].
- No incluyas datos culturales que no puedas verificar; si mencionas uno, márcalo como «verificar».
```

### Plan de 60 minutos

| Min. | Bloque | Qué hacer |
|---|---|---|
| 0–8 | Activación | Escribe una actividad que hayas hecho con un generador y di si la usarías tal cual. |
| 8–22 | Lectura guiada | Lee la anatomía de un buen prompt pedagógico y el ejemplo de prompt completo. |
| 22–38 | Práctica | Escribe un prompt con rol, perfil, objetivo, formato, restricciones y criterios. |
| 38–52 | Aplicación con tu estudiante | Ejecuta el prompt, resuelve la actividad tú primero y anota qué corregirías. |
| 52–60 | Cierre | Guarda el prompt mejorado con sus variables. |

## Creación de diálogos por nivel

> **Objetivo de la lección:** generar diálogos naturales y adecuados al nivel.

```prompt
Escribe un diálogo original en español de [VARIEDAD] para estudiantes de nivel [NIVEL].

Situación: [SITUACIÓN, p. ej. pedir un tinto y un pandebono en una cafetería de Bogotá].
Personajes: [NOMBRES Y RELACIÓN].
Extensión: [N] intervenciones, máximo [M] palabras por intervención.
Estructuras objetivo (deben aparecer al menos 2 veces de forma natural): [ESTRUCTURAS].
Léxico: usa vocabulario frecuente adecuado al nivel; si introduces 3 palabras nuevas, márcalas en negrita.

El diálogo debe:
- Sonar como una conversación real (marcadores como "bueno", "oye", "listo", reacciones, alguna duda).
- Tener un pequeño giro o problema.
- Evitar estereotipos sobre el país o sus hablantes.

Después del diálogo, incluye:
- 4 preguntas de comprensión (2 globales, 2 de detalle).
- Una lista de las estructuras objetivo tal como aparecen.
- Una nota de 2 líneas sobre un aspecto cultural o pragmático del diálogo.
```

> [!CONSEJO] Lee el diálogo en voz alta
> Si te cuesta leerlo en voz alta con naturalidad, el diálogo no es natural. Corrige hasta que lo sea.

### Plan de 60 minutos

| Min. | Bloque | Qué hacer |
|---|---|---|
| 0–8 | Activación | Escribe una conversación real que hayas oído y compárala con un diálogo de libro. |
| 8–22 | Lectura guiada | Lee el prompt de diálogo por nivel y la advertencia de leer en voz alta. |
| 22–38 | Práctica | Pide un diálogo con tus restricciones y léelo en voz alta. |
| 38–52 | Aplicación con tu estudiante | Corrige las partes que suenan artificiales y crea las preguntas de comprensión. |
| 52–60 | Cierre | Anota las estructuras que aparecen de forma natural y las que faltan. |

## Adaptación de materiales

> **Objetivo de la lección:** usar la IA para adaptar textos y actividades a otros niveles, edades o necesidades.

```prompt
Adapta el siguiente texto (escrito por mí / con licencia que permite adaptación) para un estudiante de nivel [NIVEL] de [EDAD] años.

Mantén: las ideas principales y el tono.
Cambia: frases largas por frases más cortas, léxico poco frecuente por léxico frecuente (salvo [PALABRAS CLAVE QUE DEBEN MANTENERSE]), y explicita los conectores.
Extensión objetivo: [N] palabras.
Tiempos verbales permitidos: [TIEMPOS].

Después, indica en una tabla los cambios principales que hiciste y por qué.

TEXTO:
[PEGA AQUÍ EL TEXTO]
```

> [!ATENCION] Derechos de autor al adaptar
> Adaptar un texto protegido (un artículo de prensa, un capítulo de un libro) y distribuirlo puede infringir derechos aunque lo haga una IA. Adapta textos propios, de dominio público o con licencias que lo permitan.

**Otras adaptaciones útiles:** convertir una actividad para adultos en un juego para niños de 7 años; crear una versión con más apoyo visual (descripción de imágenes que tú buscarás con licencia); preparar una versión para un estudiante con dificultades de lectura (frases cortas, más espacio, instrucciones de una en una).

### Plan de 60 minutos

| Min. | Bloque | Qué hacer |
|---|---|---|
| 0–8 | Activación | Elige un texto propio y di para qué nivel lo adaptarías. |
| 8–22 | Lectura guiada | Lee el prompt de adaptación y la advertencia sobre derechos de autor. |
| 22–38 | Práctica | Adapta un texto propio con el prompt y la tabla de cambios. |
| 38–52 | Aplicación con tu estudiante | Compara el texto original con el adaptado y comprueba que las ideas se mantienen. |
| 52–60 | Cierre | Escribe qué cambio no aceptarías de la IA. |

## Diseño de evaluaciones

> **Objetivo de la lección:** generar ítems y rúbricas que luego validarás.

```prompt
Diseña una prueba breve de comprensión lectora para nivel [NIVEL] a partir del texto que te doy.

- 3 preguntas de opción múltiple (3 opciones, distractores plausibles que aparezcan en el texto o sean lógicos).
- 3 ítems de verdadero / falso / no se dice.
- 1 pregunta de inferencia con respuesta abierta breve.
- Clave de respuestas con la línea del texto que justifica cada respuesta.

Comprueba que ninguna pregunta se pueda responder sin leer el texto.

TEXTO:
[PEGA AQUÍ EL TEXTO]
```

```prompt
Crea una rúbrica analítica de 4 niveles (inicial, en desarrollo, adecuado, destacado) para evaluar esta tarea oral de nivel [NIVEL]: [DESCRIPCIÓN DE LA TAREA].

Criterios: cumplimiento de la tarea, fluidez, corrección, alcance léxico, coherencia, pronunciación e interacción.
Los descriptores deben ser observables y propios de un nivel [NIVEL] (no de un nativo).
Formato: tabla.
```

### Plan de 60 minutos

| Min. | Bloque | Qué hacer |
|---|---|---|
| 0–8 | Activación | Recuerda la última prueba que escribiste. ¿Tenía distractores plausibles? |
| 8–22 | Lectura guiada | Lee los prompts de prueba de comprensión y de rúbrica analítica. |
| 22–38 | Práctica | Genera una prueba y una rúbrica con la IA a partir de un texto propio. |
| 38–52 | Aplicación con tu estudiante | Resuelve la prueba tú sin mirar la clave y compara con la clave generada. |
| 52–60 | Cierre | Corrige los ítems que tienen más de una respuesta correcta. |

## Revisión de textos

> **Objetivo de la lección:** usar la IA para revisar producciones con un enfoque pedagógico, sin sustituir la corrección del tutor.

```prompt
Eres un profesor de ELE. Revisa el siguiente texto de un estudiante de nivel [NIVEL], hablante de [L1].

No reescribas el texto completo. En su lugar:
1. Haz una tabla con: fragmento original | propuesta de corrección | tipo de error (gramática, léxico, ortografía, cohesión, registro) | explicación breve adecuada al nivel.
2. Señala solo los errores relevantes para el nivel y los que afectan a la comprensión; agrupa los repetidos.
3. Indica 2 fortalezas concretas del texto.
4. Sugiere 2 prioridades de mejora.
5. Si un uso puede ser correcto en alguna variedad del español, indícalo en lugar de marcarlo como error.

TEXTO DEL ESTUDIANTE (anonimizado):
[PEGA AQUÍ]
```

> [!ATENCION] La IA también se equivoca corrigiendo
> Las herramientas de IA pueden marcar como error usos correctos (especialmente regionales), no detectar errores o «corregir» introduciendo un error nuevo. Revisa cada corrección antes de enviarla al estudiante.

### Plan de 60 minutos

| Min. | Bloque | Qué hacer |
|---|---|---|
| 0–8 | Activación | Escribe una corrección que hayas hecho y que no fuese una mejora real. |
| 8–22 | Lectura guiada | Lee el prompt de revisión y la advertencia sobre errores de la IA al corregir. |
| 22–38 | Práctica | Aplica el prompt a un texto de estudiante anonimizado (de tu práctica o simulado). |
| 38–52 | Aplicación con tu estudiante | Verifica cada corrección propuesta y descarta las que no son errores. |
| 52–60 | Cierre | Escribe las dos prioridades de mejora que enviarías al estudiante. |

## Automatización de tareas repetitivas

> **Objetivo de la lección:** identificar tareas administrativas que la IA puede agilizar.

| Tarea | Cómo puede ayudar la IA | Tu control |
|---|---|---|
| Resumen de la clase | A partir de tus notas, redactar el resumen para el estudiante | Revisar y personalizar |
| Mensajes de seguimiento | Borradores a partir de una plantilla | Ajustar el tono y comprobar datos |
| Listas de vocabulario | Generar frases de ejemplo para tarjetas | Verificar naturalidad y nivel |
| Banco de preguntas de conversación | Preguntas graduadas por tema | Seleccionar y ordenar |
| Informes de progreso | Estructurar tus observaciones | Los datos y valoraciones son tuyos |
| Ideas de contenido para redes | Lluvia de ideas | Verificar la exactitud lingüística |

> [!CONSEJO] Notas propias, no grabaciones de estudiantes
> Para automatizar resúmenes, trabaja con tus propias notas anonimizadas. Subir grabaciones o transcripciones de clases a una herramienta de IA puede implicar el tratamiento de datos personales de terceros (ver la lección sobre privacidad).

### Plan de 60 minutos

| Min. | Bloque | Qué hacer |
|---|---|---|
| 0–8 | Activación | Escribe la tarea administrativa que más tiempo te quita. |
| 8–22 | Lectura guiada | Lee la tabla de tareas que la IA puede agilizar y el control humano de cada una. |
| 22–38 | Práctica | Automatiza un mensaje de seguimiento con una plantilla y tu revisión. |
| 38–52 | Aplicación con tu estudiante | Revisa el mensaje con el criterio de tono y datos y envíalo a un estudiante simulado. |
| 52–60 | Cierre | Escribe la tarea que automatizarás la próxima semana. |

## Detectar alucinaciones y errores lingüísticos

> **Objetivo de la lección:** revisar sistemáticamente lo que produce la IA.

Una **alucinación** es una respuesta generada que parece plausible pero es falsa: una cita inventada, un libro que no existe, una regla gramatical incorrecta, un dato cultural erróneo.

### Errores frecuentes de la IA en materiales de ELE

| Tipo | Ejemplo | Cómo detectarlo |
|---|---|---|
| Fuentes inventadas | Cita a un autor con un libro inexistente o una página web que no existe | Busca cada referencia en catálogos y sitios oficiales |
| Reglas simplificadas o falsas | «Después de *cuando* siempre va subjuntivo» | Contrasta con gramáticas de referencia |
| Variedad mezclada | *Vosotros* y *ustedes* en el mismo diálogo para el mismo grupo | Revisión de coherencia |
| Léxico regional erróneo | Atribuir a un país una expresión que no se usa allí | Diccionarios académicos y de americanismos, hablantes de la zona |
| Nivel inadecuado | Un «diálogo A1» con subjuntivo | Comprueba con el inventario del nivel |
| Ejercicios con varias respuestas correctas | Huecos en los que caben dos opciones | Resuelve tú el ejercicio |
| Clave de respuestas incorrecta | La clave no coincide con los ítems | Resuelve el ejercicio antes de ver la clave |
| Datos culturales falsos | Fechas, recetas o costumbres erróneas | Fuentes oficiales y fiables |

### Protocolo de revisión en 5 pasos

1. **Resuelve tú** la actividad completa.
2. **Lee en voz alta** los textos y diálogos.
3. **Verifica** datos, fuentes y usos regionales.
4. **Comprueba el nivel** con las referencias curriculares.
5. **Pasa la [lista de comprobación de calidad](/recursos/lista-calidad-docente/).**

### Plan de 60 minutos

| Min. | Bloque | Qué hacer |
|---|---|---|
| 0–8 | Activación | Pide a una herramienta una referencia bibliográfica y busca si existe. |
| 8–22 | Lectura guiada | Lee la tabla de errores frecuentes de la IA y el protocolo de revisión en cinco pasos. |
| 22–38 | Práctica | Aplica el protocolo a un material generado y anota cada hallazgo. |
| 38–52 | Aplicación con tu estudiante | Corrige el material y registra qué tipo de error fue más frecuente. |
| 52–60 | Cierre | Escribe el paso del protocolo que nunca te puedes saltar. |

## Privacidad y tratamiento de datos

> **Objetivo de la lección:** usar la IA sin exponer datos de los estudiantes.

### Reglas prácticas

- **No introduzcas datos personales** de estudiantes (nombre completo, correo, teléfono, empresa, datos de salud, fotografías) en herramientas de IA, salvo que tengas una base legal clara y el consentimiento del estudiante, y la herramienta ofrezca garantías adecuadas.
- **Anonimiza:** «Estudiante A, 35 años, ingeniero, B1» en lugar del nombre real.
- **Menores:** extrema la precaución; no subas producciones, voces ni imágenes de menores.
- **Lee la política de privacidad** de la herramienta: ¿usa tus datos para entrenar modelos?, ¿puedes desactivarlo?, ¿dónde se almacenan?
- **Informa a tus estudiantes** si usas IA para preparar materiales o corregir (transparencia).

### Ejemplo de anonimización

| Antes (no lo hagas) | Después (anonimizado) |
|---|---|
| «Prepara una clase para María López, enfermera del Hospital X de Toronto, que tiene ansiedad y cuyo correo es…» | «Prepara una clase para una estudiante adulta, profesional de la salud, nivel B1, lengua materna inglés, que se pone nerviosa al hablar por teléfono» |
| Pegar la transcripción completa de una clase con nombres | Pegar tus notas resumidas: «El estudiante A confunde *por/para* en expresiones de finalidad» |

> [!ACTIVIDAD] Revisa tus prompts
> Revisa los últimos prompts que hayas usado con una herramienta de IA. ¿Incluían nombres, empresas, correos, fotografías o datos de salud? Reescribe uno en versión anonimizada.

### Plan de 60 minutos

| Min. | Bloque | Qué hacer |
|---|---|---|
| 0–8 | Activación | Abre el último prompt que usaste y mira si contiene nombres o datos reales. |
| 8–22 | Lectura guiada | Lee las reglas prácticas y el ejemplo de anonimización. |
| 22–38 | Práctica | Reescribe un prompt real en versión anonimizada. |
| 38–52 | Aplicación con tu estudiante | Revisa la política de privacidad de una herramienta que usas: ¿entrena con tus datos? |
| 52–60 | Cierre | Escribe la regla de privacidad que aplicarás siempre. |

## Derechos de autor y revisión humana

> **Objetivo de la lección:** conocer los riesgos legales y éticos del contenido generado con IA.

- **No pidas a la IA que reproduzca** libros, canciones o materiales protegidos.
- **La situación legal** sobre la autoría y la protección de contenidos generados con IA está en evolución y varía por país. Si vas a vender materiales creados con ayuda de IA, infórmate sobre la legislación aplicable y los términos de la herramienta.
- **La revisión y la creación humanas** (seleccionar, modificar, combinar, adaptar a un estudiante) son lo que da valor pedagógico al material.
- **Transparencia:** si publicas materiales en los que la IA ha tenido un papel relevante, considera indicarlo.

> [!NOTA] En Aula Abierta ELE
> Las contribuciones a este proyecto pueden usar herramientas de IA como apoyo, pero deben ser revisadas por una persona que se responsabilice de su exactitud, originalidad y adecuación, como se indica en la [guía de contribución](/contribuir/).

### Plan de 60 minutos

| Min. | Bloque | Qué hacer |
|---|---|---|
| 0–8 | Activación | Escribe si el material generado con IA que usaste tiene alguna fuente identificable. |
| 8–22 | Lectura guiada | Lee los riesgos legales, la revisión humana y la transparencia. |
| 22–38 | Práctica | Decide si indicarías el papel de la IA en un material que vas a publicar, y escribe la nota. |
| 38–52 | Aplicación con tu estudiante | Revisa el contenido para asegurarte de que no reproduce material protegido. |
| 52–60 | Cierre | Escribe la nota de transparencia para tu próximo material. |

## Biblioteca de prompts reutilizables

> **Objetivo de la lección:** construir y mantener tu propia biblioteca de prompts.

### Organización recomendada

Para cada prompt, guarda:

- **Nombre** y **propósito**.
- **Variables** entre corchetes: `[NIVEL]`, `[L1]`, `[VARIEDAD]`, `[OBJETIVO]`, `[EDAD]`…
- **Ejemplo de uso** con las variables rellenas.
- **Criterios de evaluación** del resultado.
- **Notas** sobre qué falló y cómo mejoraste el prompt.

### Prompt para una clase completa

```prompt
Actúa como diseñador/a instruccional especializado/a en ELE.

Diseña un plan de clase online de [DURACIÓN] minutos para:
- Estudiante: [PERFIL: edad, L1, nivel, intereses, objetivo personal]
- Objetivo comunicativo: [OBJETIVO]
- Foco lingüístico: [ESTRUCTURA / LÉXICO]
- Variedad de español: [VARIEDAD]

Estructura obligatoria (con tiempos): activación, presentación contextualizada, foco en la forma (descubrimiento guiado), práctica controlada, producción comunicativa, retroalimentación y cierre.

Para cada fase: instrucciones para el tutor, lo que dice/hace el estudiante, materiales necesarios y respuestas esperadas.
Incluye: criterio de evaluación del objetivo, un plan B si el estudiante no entiende la presentación y una tarea para casa de 15 minutos.
No incluyas materiales con derechos de autor de terceros; si sugieres un recurso externo, descríbelo de forma genérica para que yo lo busque.
```

### Prompt para niños

```prompt
Diseña 4 juegos de 5 minutos para una clase online de español con un niño de [EDAD] años que [no lee / está aprendiendo a leer / lee con fluidez].
Vocabulario objetivo: [6-8 PALABRAS].
Materiales disponibles en casa: [MATERIALES].
Cada juego debe: tener instrucciones de una frase acompañables con gestos; alternar movimiento y calma; permitir responder sin hablar (señalar, mostrar) en el primer juego; aumentar la exigencia de producción progresivamente.
Indica qué hace el adulto acompañante en cada juego, si es necesario.
```

### Criterios para evaluar cualquier resultado

| Criterio | Pregunta |
|---|---|
| Corrección lingüística | ¿Hay errores de gramática, ortografía o léxico? |
| Naturalidad | ¿Lo diría así un hablante real? |
| Coherencia de variedad | ¿Es consistente con la variedad elegida? |
| Adecuación al nivel | ¿El léxico y las estructuras corresponden al nivel? |
| Alineación con el objetivo | ¿Practica realmente lo que dice practicar? |
| Atención al significado | ¿Exige comprender para responder? |
| Veracidad | ¿Los datos y fuentes son reales y verificables? |
| Inclusión y respeto | ¿Evita estereotipos y contenidos inadecuados? |
| Utilidad | ¿Lo usarías con tu estudiante sin grandes cambios? |

Descarga el [banco completo de prompts](/recursos/banco-prompts/).

### Plan de 60 minutos

| Min. | Bloque | Qué hacer |
|---|---|---|
| 0–8 | Activación | Escribe el prompt que más te ha servido y lo que cambiarías de él. |
| 8–22 | Lectura guiada | Lee la organización de la biblioteca, los prompts de clase completa y de niños, y los criterios de evaluación. |
| 22–38 | Práctica | Guarda tres prompts con nombre, propósito, variables, ejemplo y criterios. |
| 38–52 | Aplicación con tu estudiante | Usa uno de ellos para preparar una clase real y anota qué mejorarías. |
| 52–60 | Cierre | Escribe la fecha de la próxima revisión de tu biblioteca. |

## Sesión de 60 minutos: crear y evaluar material con IA {#sesion-60}

> **Objetivo de la sesión:** usar tres prompts de la biblioteca para producir material, evaluarlo con la tabla de criterios y mejorar el prompt.

**Antes de empezar:** reserva la hora completa, ten a mano los materiales de la tabla y, si practicas con un estudiante real o simulado, avisa de que la sesión tiene un objetivo de trabajo. Cronometra cada bloque; si uno se alarga, reduce el siguiente en lugar de saltarte el cierre.

| Min. | Bloque | Qué hacer | Producto |
|---|---|---|---|
| 0–8 | Anonimizar | Preparar un perfil de estudiante sin datos personales (lección 16.9) | Perfil anonimizado |
| 8–22 | Generar | Ejecutar el prompt de plan de clase y el de diálogo por nivel (lección 16.3 y 16.2) | Dos resultados |
| 22–34 | Evaluar | Resolver tú la actividad y leer el diálogo en voz alta (lección 16.7) | Errores anotados |
| 34–46 | Verificar | Comprobar datos, fuentes y variedad con diccionarios y referencias | Datos verificados |
| 46–54 | Mejorar | Reescribir el prompt añadiendo restricciones para corregir los errores | Prompt mejorado |
| 54–60 | Registro | Guardar el prompt en tu biblioteca con variables y criterios | Entrada en la biblioteca |

**Preguntas para cerrar la sesión:** ¿qué bloque se alargó más de lo previsto? ¿Qué parte te resultó más útil para tu práctica? ¿Qué harás de forma distinta la próxima vez?

**Evaluación de la sesión:** el material final tiene errores corregidos por ti, y el prompt mejorado evita al menos uno de los errores encontrados.

## Evaluación y tarea del módulo {#evaluacion}

```quiz
? Una herramienta de IA te sugiere un libro de referencia sobre el subjuntivo que no conoces. ¿Qué haces?
- Lo citas en tus materiales
+ Compruebas que existe en catálogos de bibliotecas o editoriales antes de citarlo
- Lo recomiendas a tus estudiantes
> Las referencias inventadas son una forma frecuente de alucinación.
? ¿Qué información puedes incluir en un prompt para preparar una clase?
- El nombre completo y el correo del estudiante
+ Un perfil anonimizado: edad, nivel, lengua materna, intereses y objetivo
- La grabación de la última clase
> Anonimiza siempre los datos de los estudiantes.
? La IA genera un «diálogo A1» con varias formas del subjuntivo. ¿Qué indica?
+ Que el nivel no es adecuado y hay que revisarlo o regenerarlo con restricciones explícitas
- Que el estudiante debe aprender el subjuntivo ya
- Nada, el nivel no importa
> Comprueba siempre el nivel con referencias curriculares.
? ¿Cuál es el papel del tutor ante un material generado con IA?
- Ninguno, si la herramienta es buena
+ Revisarlo lingüística, didáctica y éticamente, y adaptarlo al estudiante antes de usarlo
- Solo cambiar el formato
> La IA propone; el tutor decide.
```

**Tarea práctica:** elige 3 prompts de la biblioteca, adáptalos a tu estudiante del proyecto final, ejecútalos en una herramienta de IA y evalúa cada resultado con la tabla de criterios. Documenta: errores encontrados, correcciones realizadas y la versión mejorada del prompt.

**Lista de comprobación:**

- [ ] No incluiste datos personales identificables.
- [ ] Resolviste tú las actividades generadas.
- [ ] Verificaste datos culturales y fuentes.
- [ ] Mejoraste cada prompt a partir de los errores observados.

### Plan de 60 minutos

| Min. | Bloque | Qué hacer |
|---|---|---|
| 0–8 | Activación | Revisa tu biblioteca de prompts y elige el peor. |
| 8–22 | Lectura guiada | Lee la tarea práctica y la tabla de criterios de evaluación. |
| 22–38 | Práctica | Responde el cuestionario y revisa las retroalimentaciones. |
| 38–52 | Aplicación con tu estudiante | Ejecuta tres prompts de tu biblioteca con tu estudiante anonimizado y evalúa los resultados. |
| 52–60 | Cierre | Marca la lista y anota la versión mejorada de cada prompt. |

