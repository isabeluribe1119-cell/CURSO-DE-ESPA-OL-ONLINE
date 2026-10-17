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

### Por qué un prompt vago produce actividades inútiles

Si pides «hazme ejercicios de ser y estar», la herramienta responderá con ejercicios correctos en apariencia, pero casi siempre genéricos: frases sueltas, un hueco por oración y ningún vínculo con la vida de tu estudiante. El modelo no sabe si tu alumno es un adulto que trabaja en un hospital o una niña que quiere hablar de su gato, ni si ya distingue los dos verbos y solo necesita practicar los usos emocionales. Cada dato que omites obliga a la herramienta a adivinar, y lo que adivina suele ser el ejemplo más frecuente de los manuales, no el más útil para tu estudiante.

Conviene, por tanto, tratar el prompt como una instrucción de trabajo: quién hace qué, para quién, con qué meta y en qué formato. Las seis partes de la anatomía anterior sirven precisamente para eso. Si una de ellas falta, anótala y comprueba después si el resultado la echa de menos.

### Cómo revisar un borrador antes de usarlo

Antes de enviar cualquier actividad generada, lee la actividad como la leería tu estudiante. Esta secuencia breve evita la mayoría de los fallos:

1. Haz la actividad completa tú, sin mirar la clave. Anota cuánto tardas y en qué ítems dudas.
2. Comprueba que cada ítem exige entender algo. Si la respuesta se adivina por la forma de la frase o por la opción más larga, el ítem no practica el significado.
3. Revisa la coherencia de la variedad: ¿aparecen «vosotros» y «ustedes» para el mismo interlocutor? ¿Hay léxico de otra región sin justificar?
4. Verifica la clave ítem a ítem. Una clave equivocada resta más confianza al estudiante que cualquier error de redacción.
5. Escribe en el propio prompt la corrección que hayas hecho, para que la siguiente versión ya la incluya.

Este último paso es el que convierte una actividad suelta en una mejora duradera de tu biblioteca.

### Ejemplo trabajado

Partimos de una petición inicial: «Dame una actividad de pretérito indefinido para un alumno de A2».

El resultado típico son diez frases del tipo «Ayer ___ (comer) una pizza», sin contexto ni tarea final. La mejora consiste en añadir perfil, objetivo y criterios. Supongamos un estudiante de 32 años, lengua materna francesa, nivel A2, interesado en la cocina, cuyo objetivo es contar anécdotas breves de fin de semana. Con esos datos, la práctica controlada puede consistir en ordenar una historia usando marcadores temporales (primero, después, al final), y la tarea final en que el estudiante cuente a su tutor qué hizo el sábado anterior mientras el tutor anota tres errores para revisar después.

Observa lo que cambia: cada ítem tiene un sentido, el léxico se puede contrastar con el inventario del nivel y la tarea final mide algo concreto. Tu trabajo consiste en comprobar que la versión mejorada lo hace de verdad, no en dar por bueno que sea más larga.

### Errores frecuentes y cómo corregirlos

- **Demasiados ítems.** Pedir veinte preguntas produce relleno. Limita la cantidad y exige calidad.
- **Claves sin justificación.** Pide que cada respuesta vaya acompañada de una frase con la razón gramatical o léxica.
- **Tareas finales que no son tareas.** «Habla sobre tus vacaciones» no define una situación. Añade un rol, un destinatario y un resultado visible.
- **Léxico fuera de nivel.** Facilita una lista de palabras permitidas o pide que las excepciones aparezcan marcadas.
- **Temas delicados.** Excluye de forma explícita la religión, la política, la enfermedad o cualquier tema que no quieras tratar con ese estudiante.

### Adaptar el prompt a cada estudiante

Un mismo prompt sirve para distintos perfiles si lo tratas como plantilla. Guarda las variables entre corchetes y rellénalas en cada uso. Un adulto que aprende por motivos laborales necesita situaciones de trabajo, correos y reuniones; un adolescente, conversaciones sobre música, redes o deportes; un niño, juegos y vocabulario concreto y visible. Ajusta también el tono de las instrucciones: para un estudiante que empieza, frases cortas y un ejemplo resuelto; para uno avanzado, consignas mínimas que exijan más autonomía.

Recuerda, además, que una actividad generada no es neutral. Si los personajes aparecen siempre en los mismos roles o con los mismos rasgos, revisa el texto y corrige ese sesgo antes de usarlo.

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

### Qué hace que un diálogo suene natural

Un diálogo de libro suele ser correcto pero tieso: cada intervención es una oración completa, todas miden lo mismo y nadie se interrumpe. En una conversación real aparecen elipsis («¿Café?», «Vale, pues nada»), respuestas de apoyo («ajá», «claro», «qué bien»), vacilaciones, reparaciones («perdón, quería decir…») y cambios de tema. Si tu diálogo no contiene ninguno de estos rasgos, probablemente no suene a conversación.

Dicho esto, la naturalidad no equivale a meter muchos marcadores en cada frase. Un estudiante de A1 que escucha «bueno, pues oye, la verdad es que…» en cada línea no aprende nada útil. Usa los recursos con moderación y de forma que el estudiante pueda reconocerlos: como máximo un marcador por intervención en los niveles bajos, y siempre con un significado claro.

### Ajustar el diálogo al nivel sin perder naturalidad

El nivel se controla sobre todo con tres variables: la longitud de las intervenciones, el repertorio de estructuras y el léxico. En A1 y A2 conviene que cada intervención tenga pocas subordinadas y que los verbos aparezcan en presente, pretérito indefinido o futuro inmediato. En B1 y B2 puedes introducir conectores más complejos, condicionales o subjuntivo, siempre que el contexto haga comprensible el significado.

Lo que no cambia con el nivel es la pragmática: las fórmulas de saludo y despedida, la forma de pedir algo con cortesía y la manera de mostrar acuerdo o desacuerdo. Un diálogo de A1 puede ser natural si el saludo es el que usaría un hablante real y la despedida no es un «adiós» seco al final de cada intercambio.

### Ejemplo trabajado: una compra en una panadería

Supongamos un diálogo para estudiantes de A2, en español neutro, para practicar la petición cortés con «me pone», «quisiera» y las fórmulas de elección.

- Buenos días. ¿Me pone una barra de pan integral, por favor?
- Claro. ¿Algo más? Hoy tenemos croissants recién hechos.
- Mmm, ¿cuánto es cada uno?
- Lo tiene en el cartel. Son [PRECIO].
- Pues deme uno. Ah, y... espere, mejor dos, que mi hijo también los quiere.
- Perfecto. ¿Quiere una bolsa?
- No, gracias, la llevo en la mochila.

El diálogo tiene un giro pequeño (la clienta cambia de idea), mantiene el trato de usted entre desconocidos, incluye dos marcadores de conversación y conserva intervenciones cortas. Fíjate también en lo que no hace: no fuerza la estructura objetivo en cada línea ni introduce vocabulario que el estudiante no pueda deducir del contexto. Antes de dárselo, léelo en voz alta, comprueba que el precio está resuelto en la clase y, si el diálogo es para un estudiante concreto, sustituye la compra por algo de su vida diaria.

### Errores frecuentes y cómo corregirlos

- **Intervenciones todas iguales.** Si cada turno tiene la misma longitud, el diálogo parece un guion. Mezcla frases de una palabra con turnos un poco más largos.
- **Formalidad uniforme.** Los desconocidos usan usted y los amigos tú, y eso debe mantenerse en todo el diálogo. Revisa que la IA no cambie de registro a mitad.
- **Mezcla de variedades.** Un diálogo que alterna «vosotros» y «ustedes» confunde al estudiante. Fija la variedad en el prompt y compruébala al leer.
- **Léxico por encima del nivel.** Si aparecen más de tres palabras desconocidas en un diálogo de A2, reduce el vocabulario o añade un glosario breve.
- **Preguntas de comprensión que se responden con sentido común.** Comprueba que las respuestas están en el texto o que dependen de entender algo concreto del diálogo.

### Adaptaciones por edad y contexto

Con adultos, los diálogos funcionan bien cuando reflejan situaciones de trabajo, trámites o viajes. Con adolescentes, conviene que los temas sean cercanos (planes, música, deporte, estudios) y que el registro sea informal sin caer en jergas que cambian rápido. Con niños, el diálogo debe apoyarse en acciones y objetos visibles, con turnos muy breves, y puede convertirse en una escena de juego con roles, por ejemplo tienda, médico o colegio. En todos los casos, comprueba que el diálogo no refuerza estereotipos sobre personas, lugares o profesiones: un personaje que siempre hace de cocinero por su origen no es una buena elección.

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

### Qué se adapta y qué debe mantenerse

Adaptar un texto significa cambiar su dificultad sin cambiar su sentido. Puedes modificar la longitud de las frases, la complejidad de las subordinadas, el número de palabras poco frecuentes o la densidad de información. Lo que debe mantenerse es la idea principal, el tono (informativo, narrativo, humorístico) y los elementos culturales que dan sentido al texto. Si la adaptación elimina el motivo de la historia, el estudiante no entenderá qué se quería transmitir y la actividad pierde valor.

Un error frecuente es creer que simplificar es lo mismo que empobrecer. Un texto de A2 puede tener contenido rico si las frases son claras, los conectores están explícitos y las ideas aparecen en un orden lógico.

### Criterios para elegir el nivel de la adaptación

Un texto adaptado resulta más útil cuando contiene algunas estructuras nuevas rodeadas de elementos conocidos. La idea de un input comprensible, asociada a Stephen Krashen, sugiere que el estudiante aprende mejor cuando entiende casi todo y deduce lo nuevo por el contexto. Por eso no conviene que la adaptación contenga solo estructuras de un nivel inferior al del estudiante: al eliminar todo lo nuevo, desaparece la oportunidad de aprender. Puedes consultar esta teoría en la bibliografía del repositorio.

Como criterio práctico, comprueba que el texto adaptado tenga una proporción reducida de léxico desconocido. Si el estudiante necesita consultar cada tercera palabra, el texto está demasiado alto; si no encuentra nada que deducir, está demasiado bajo.

### Paso a paso con el prompt

1. Decide primero el objetivo: comprensión global, comprensión de detalle, léxico o una estructura concreta.
2. Pega el texto solo si es tuyo, de dominio público o tiene una licencia que permita adaptarlo.
3. Indica las palabras clave que no deben cambiar (nombres propios, términos del tema).
4. Fija el número de palabras y los tiempos verbales permitidos.
5. Pide la tabla de cambios y revísala con el texto original delante.
6. Lee el resultado en voz alta y comprueba que el estudiante podría hacer la tarea prevista sin ayuda externa más allá de un diccionario.

La tabla de cambios es, en realidad, la parte más valiosa de la respuesta, porque te permite juzgar cada decisión en lugar de aceptar un texto opaco.

### Ejemplo trabajado: de B2 a A2

Texto original (de elaboración propia): «Aunque el mercado estaba cerrado por la lluvia, la vendedora, que llevaba años en el barrio, decidió abrir su puesto para los vecinos que la esperaban.»

Adaptación a A2: «Llovía mucho y el mercado estaba cerrado. Pero la vendedora abrió su puesto. Ella lleva muchos años en el barrio. Los vecinos la esperaban.»

Cambios principales: la subordinada con «aunque» se convierte en dos frases con «pero», lo que hace explícita la oposición; la oración de relativo pasa a una frase independiente; el orden de las ideas sigue la cronología. Sin embargo, la adaptación pierde el matiz de la concesión, que es precisamente lo que un estudiante de B2 debería aprender. Si el objetivo es enseñar ese conector, la versión correcta no es esta, sino una en la que «aunque» aparezca como palabra clave que se mantiene. Esta comparación muestra por qué la tabla de cambios es imprescindible.

### Adaptaciones para apoyo visual y dificultades de lectura

Para un estudiante con dificultades de lectura, además de frases cortas, conviene dar una instrucción por paso, aumentar el espacio entre líneas y evitar bloques de texto largos. Si necesitas apoyo visual, pide a la herramienta que describa la escena que quieres mostrar y busca tú la imagen en un banco con licencia adecuada; no utilices imágenes sin comprobar sus condiciones de uso. En ambos casos, revisa el resultado con el estudiante delante, porque lo que a ti te parece claro puede no serlo para él.

### Errores frecuentes

- **Eliminar el conector.** Sin «aunque», «porque» o «sin embargo», la relación entre ideas se pierde. Mantenlos o explícalos.
- **Cambiar el tiempo verbal sin motivo.** Pasar un texto del pasado al presente altera la lectura y puede confundir.
- **Introducir información nueva.** La IA a veces añade datos para completar el texto. Compara cada frase con el original.
- **Adaptar sin revisar la coherencia.** Una frase simplificada puede contradecir otra que no se tocó.

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

### Qué debe medir una prueba

Antes de generar ningún ítem, decide qué quieres medir. Una prueba de comprensión lectora no mide lo mismo que una de gramática, y ninguna de las dos mide bien la expresión oral. Un error habitual es pedirle a la IA «un examen de nivel B1» y recibir una mezcla de preguntas de léxico, gramática y lectura sin una finalidad clara. Define primero el objetivo de aprendizaje, el tipo de evaluación (formativa, para orientar la siguiente clase, o sumativa, para certificar un avance) y el tiempo disponible.

En la evaluación formativa, los ítems sirven para ajustar la enseñanza, así que conviene que sean breves y que el error sea informativo. En la sumativa, la fiabilidad importa más: cada ítem debe tener una única respuesta defendible y la prueba debe poder compararse entre estudiantes o entre momentos.

### Ítems de opción múltiple con distractores plausibles

Un buen distractor es una respuesta que un estudiante con un error concreto elegiría. Si el distractor es absurdo, el ítem mide muy poco. Para construirlos, piensa en los errores previsibles de tu estudiante según su lengua materna y en las confusiones típicas del nivel (ser y estar, por y para, pretérito imperfecto e indefinido). Después, comprueba que solo una opción sea correcta según el texto.

Una regla práctica: la respuesta correcta no debe ser siempre la más larga ni la única que repite palabras del enunciado. Varía la posición de la clave y revisa que no haya un patrón reconocible.

### Verdadero, falso o no se dice

El formato «verdadero, falso o no se dice» sirve para comprobar la comprensión de detalle, pero exige una redacción muy cuidadosa. Las afirmaciones falsas deben contradecir el texto de forma clara, y las de «no se dice» deben referirse a algo plausible que el texto no menciona. Si una afirmación podría ser verdadera o falsa según la interpretación, descártala: el estudiante acertará o fallará por motivos ajenos a la lectura.

### Validar la prueba antes de usarla

Ninguna prueba generada debe llegar al estudiante sin validación. Te propongo cuatro comprobaciones:

1. Resuélvela tú sin mirar la clave y anota el tiempo.
2. Comprueba que ningún ítem se responde sin leer el texto, por conocimiento general o por lógica de la frase.
3. Verifica que cada ítem evalúa un único aspecto; si una pregunta mezcla vocabulario y gramática, sepárala en dos.
4. Revisa que la clave coincide con el texto y con tus propias respuestas. Si hay discrepancias, la prueba todavía no está lista.

Si puedes, prueba la prueba con un colega o con un estudiante simulado y observa dónde duda.

### Rúbricas con descriptores observables

Una rúbrica analítica divide la tarea en criterios y describe cada nivel de desempeño. Los descriptores deben ser observables: «hace pausas largas para buscar palabras» es evaluable; «habla bien» no lo es. En una tarea oral, cada criterio debe poder juzgarse escuchando una grabación o tomando notas durante la conversación.

Ten cuidado con los descriptores que dependen de comparar con un hablante nativo. En los niveles intermedios, un estudiante puede ser claro y eficaz sin sonar como un nativo, y la rúbrica debe reconocerlo. Usa como referencia las descripciones del Marco común europeo de referencia para las lenguas, y pide a la IA que la propuesta sea propia de tu nivel y no de un hablante competente.

### Ejemplo trabajado: un ítem mejorable

Versión inicial generada: «¿Dónde estaba Ana cuando llamó su madre? a) En casa. b) En el trabajo. c) Estaba cansada.»

Problemas: la opción c no responde a la pregunta, así que es un distractor absurdo; y la pregunta puede responderse sin leer el texto si el lector imagina la situación. Versión mejorada: «Según el texto, ¿dónde estaba Ana cuando llamó su madre? a) En casa, con los niños. b) En el supermercado, esperando su turno. c) En el trabajo, reunida con su jefe.» Las tres opciones son del mismo tipo, la respuesta exige localizar un dato del texto y los distractores corresponden a lugares que el texto podría mencionar en otro párrafo. Compara esta reescritura con la clave original y verifica que coincide con el texto.

### Equidad y accesibilidad

Una prueba también mide lo que no quieres medir si está mal diseñada. Evita textos que requieran conocimiento cultural específico que el estudiante puede no tener, como referencias a programas de televisión locales sin contexto. Ajusta el tiempo a la diversidad de tus estudiantes y ofrece formatos alternativos cuando un estudiante tenga dificultades de lectura o de visión. Si una pregunta depende de un audio, un enlace o una función que no funcionará en tu plataforma, sustitúyela antes de la prueba y no durante ella.

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

### Qué corregir primero

No todos los errores pesan igual. Si un texto tiene doce fallos, corregirlos todos de golpe desanima al estudiante y diluye la atención. Prioriza en este orden: primero, los errores que impiden comprender el mensaje; después, los que afectan a la cohesión (conectores, referencias, orden de las ideas); luego, el léxico inadecuado para la intención; y al final, la gramática fina y la ortografía, salvo que sean el objetivo de la tarea.

Si la tarea trabaja un punto concreto, por ejemplo el pretérito imperfecto, corrige ese punto con más profundidad y señala los demás de forma selectiva o déjalos para otra ronda.

### Cómo dar retroalimentación que el estudiante use

Una corrección solo sirve si el estudiante la entiende y la aplica. Por eso conviene agrupar los errores por tipo, no por orden de aparición, y explicarlos con una frase breve y un ejemplo. «Usa el pretérito indefinido para acciones terminadas en un momento concreto: ayer fui» es más útil que una lista de tachaduras. Pide además que el estudiante reescriba la frase corregida, porque la reformulación activa lo que la lectura pasiva no fija.

Incluye siempre algo positivo y concreto. Decir «muy bien» no orienta; decir «has usado bien los conectores de causa, como “porque” y “por eso”» sí indica qué repetir.

### Errores de la IA al corregir

La IA corrige con seguridad, y ese tono es precisamente el riesgo. Hay tres fallos típicos. El primero es marcar como error un uso correcto en alguna variedad, por ejemplo el voseo en un texto escrito en una variedad que lo usa de forma normal. El segundo es no detectar un error real porque el resto del texto distrae, como un «Me gusta las frutas» que debería ser «Me gustan las frutas» en un texto con otros errores más visibles. El tercero es introducir un error nuevo al corregir, sobre todo en la acentuación y en los usos de «por qué», «porqué», «por que» y «porque».

Por eso la revisión humana no es opcional. Compara cada propuesta con una referencia y decide tú si la consideras un error para ese estudiante y ese nivel.

### Ejemplo trabajado con un texto de A2

Texto de un estudiante (anonimizado): «Ayer yo fue al supermercado y compré muchas cosas. Me gusta mucho las frutas, pero el pan estaba caro. Después, yo vuelvo a casa.»

Revisión propuesta:

| Fragmento | Corrección | Tipo | Explicación |
|---|---|---|---|
| Ayer yo fue | Ayer fui | gramática | El pretérito indefinido de «ir» es «fui». El pronombre no es necesario. |
| Me gusta mucho las frutas | Me gustan mucho las frutas | gramática | «Gustar» concuerda con lo que gusta: «las frutas». |
| Después, yo vuelvo a casa | Después, volví a casa | gramática | Si el texto narra en pasado, el verbo debe ir en pretérito. |

Esta revisión detecta tres errores de morfología verbal y concordancia, que son los más relevantes para este nivel. Hay una frase correcta («el pan estaba caro»), que no debe marcarse. Si la IA hubiera señalado esa frase como error, la corrección estaría mal. Por eso hay que leer cada propuesta antes de enviarla.

### Protocolo de envío al estudiante

Antes de enviar la corrección, anonimiza el texto si lo vas a comentar fuera de la clase y asegúrate de que el estudiante sabe que su producción puede servir para revisar materiales. En la clase, comenta primero la prioridad de mejora, después las correcciones agrupadas y, por último, la tarea de reescritura. Guarda una copia de la versión corregida para comparar en la siguiente producción.

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

### Qué tareas merecen automatizarse

Una tarea es buena candidata a la automatización cuando se repite con frecuencia, sigue una estructura predecible y no exige un juicio pedagógico fino. Un mensaje de recordatorio de clase cumple las tres condiciones; la valoración del progreso de un estudiante, no. Antes de delegar algo, pregúntate cuánto tiempo te cuesta cada vez, cuántas veces lo haces al mes y qué pasaría si el borrador tuviera un error. Si el error sería grave, automatiza solo la parte mecánica.

### Tareas que no conviene delegar

Hay decisiones que no se pueden externalizar sin perder calidad: qué necesita un estudiante concreto, si su progreso es suficiente, qué corregir primero en su texto o cómo comunicar una noticia difícil a su familia. Tampoco conviene delegar el vínculo. Un mensaje genérico puede hacer que el estudiante se sienta un expediente. La IA puede redactar la base; el tono, los datos y la decisión son tuyos.

### Plantilla de mensaje de seguimiento

Una plantilla reutilizable tiene partes fijas y partes variables. Por ejemplo:

«Hola, [NOMBRE]. Te escribo para resumir lo que trabajamos hoy: [PUNTO 1], [PUNTO 2] y [PUNTO 3]. Para la próxima sesión, te propongo practicar [TAREA], unos quince minutos al día. Si tienes alguna duda, escríbeme antes del [FECHA].»

La IA puede ayudarte a crear la versión base y a variar el tono (más cercano o más formal). Tú rellenas las variables a mano, con datos verificados, y revisas que el mensaje no contenga información de otro estudiante. El nombre se añade al enviar, nunca en la herramienta de IA: así no introduces datos personales en ningún sistema externo.

### Medir si la automatización compensa

No todo lo que parece ahorrar tiempo lo hace. Durante una semana, anota cuánto tardas en cada tarea antes y después de usar la IA, incluidos los minutos de revisión. Una tarea que tarda diez minutos en escribirse y veinte en revisarse no se ha automatizado; se ha redistribuido. Si el resultado no compensa, mantén el proceso manual o simplifica la plantilla.

### Errores frecuentes

- **Automatizar sin plantilla fija.** Cada petición distinta produce un texto distinto, y revisarlo cuesta más.
- **Confiar en datos generados.** Fechas, horarios y precios deben venir de tu agenda, nunca de la memoria de la herramienta.
- **Enviar sin releer.** Un mensaje con un nombre equivocado o con datos de otro estudiante daña la confianza.
- **Usar notas con datos personales.** Trabaja con notas anonimizadas, como se indica en la lección de privacidad.

### Automatizar sin perder el vínculo

Algunas prácticas ayudan a mantener la calidad: reserva un momento fijo cada semana para preparar los mensajes, guarda las versiones que te han funcionado y añade a cada envío una frase personal sobre algo concreto que el estudiante hizo bien. Ese detalle es lo que ningún borrador puede aportar por sí solo.

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

### Por qué la IA alucina

Un modelo de lenguaje genera la continuación más probable de un texto. Esa probabilidad no garantiza que lo que dice sea verdad: una referencia bibliográfica puede tener la forma correcta de una cita sin corresponder a ningún libro real. Por eso las alucinaciones aparecen sobre todo en los detalles específicos (fechas, páginas, nombres propios, cifras, reglas gramaticales muy concretas), donde la herramienta tiende a rellenar huecos con algo verosímil. Cuanto más exacta es la petición y menos contexto tiene la herramienta, más probable es que invente.

### Señales de alarma

Algunas señales deben activar tu revisión de inmediato:

- Cifras precisas sin fuente identificable.
- Citas textuales de autores con páginas concretas que no puedes localizar.
- Reglas gramaticales expresadas con «siempre» o «nunca» sin excepciones.
- Afirmaciones culturales demasiado generales sobre un país o una comunidad.
- Respuestas muy seguras a preguntas que dependen de la variedad o de una zona concreta.
- Ejemplos demasiado perfectos para ser naturales.

La seguridad del tono no es un indicador de exactitud. Una alucinación se escribe igual de bien que un dato verdadero.

### Cómo verificar una referencia paso a paso

Si la herramienta te da una referencia, sigue este procedimiento: busca el título y el autor en un catálogo de biblioteca o en la ficha de una editorial; comprueba que la edición y el año coinciden; si es un artículo, busca la revista y el número; y si nada aparece, considera la referencia inexistente hasta que se demuestre lo contrario. Cuando la fuente es una web, abre la página oficial de la institución que la publica, no un resultado que la herramienta te haya dado como enlace.

La bibliografía del repositorio (content/paginas/bibliografia.md) reúne fuentes de referencia para el curso; úsala como primer punto de contraste antes de buscar fuera.

### Ejemplo trabajado: una regla sobre «cuando»

Una herramienta responde: «Después de cuando siempre va subjuntivo.» Es una regla falsa, porque simplifica un uso que depende del significado. Con referencia futura o hipotética, la conjunción «cuando» va con subjuntivo: «Cuando llegue, te llamo». Con valor habitual, va con indicativo: «Cuando llego a casa, siempre pongo música». Para comprobarlo, consulta una gramática de referencia y busca ejemplos reales en textos de autor. Después, reformula la regla de forma que el estudiante pueda aplicarla: «Usa subjuntivo cuando hablas de algo que todavía no ha pasado; usa indicativo cuando describes algo que pasa siempre».

### Registro de errores

Lleva una tabla sencilla donde anotes cada alucinación detectada: fecha, herramienta, tipo de error, cómo lo detectaste y si llegó a un estudiante. Con el tiempo verás qué tipos de error se repiten y podrás añadir una comprobación específica a tu protocolo. Esta práctica convierte cada fallo en una mejora del proceso y te permite explicar a tus estudiantes, si preguntan, por qué no te fías de todo lo que dice la IA.

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

### Qué se considera dato personal

En tu trabajo, un dato personal es cualquier información que permita identificar a un estudiante, directa o indirectamente. Incluye el nombre y los apellidos, el correo, el teléfono, la dirección, la imagen, la voz, las grabaciones y, en muchos casos, los datos de salud o de aprendizaje asociados a una persona. Incluso sin nombre, una combinación de profesión, ciudad, edad y lugar de trabajo puede identificar a alguien. Por eso la anonimización real no consiste solo en quitar el nombre, sino en retirar todo lo que permita reconocer a la persona.

En la Unión Europea, el Reglamento General de Protección de Datos establece principios como el de minimización de datos: usar solo lo necesario para el fin. Si trabajas en otro país, consulta la normativa local, porque las obligaciones cambian.

### Lista de comprobación antes de usar una herramienta

Antes de introducir cualquier información en una herramienta de IA, comprueba:

- Qué condiciones de uso y política de privacidad tiene, y si la versión que usas es de cuenta personal o profesional.
- Si puedes desactivar el uso de tus conversaciones para entrenar modelos, y cómo hacerlo.
- Dónde se almacenan los datos y durante cuánto tiempo, según la política publicada.
- Si puedes borrar el historial de conversaciones y de qué manera.
- Si la herramienta ofrece un acuerdo de tratamiento de datos cuando lo necesitas.

Esta información cambia con frecuencia. Revísala cada vez que la herramienta anuncie cambios y anota la fecha de tu última comprobación en tu biblioteca de prompts.

### Qué hacer si has introducido datos por error

Si has pegado por error el nombre o los datos de un estudiante en una herramienta, actúa con calma y de forma ordenada. Borra la conversación si la herramienta lo permite y desactiva el historial mientras revisas la configuración. Anota qué datos fueron, cuándo y en qué herramienta. Si el incidente afecta a datos de un menor o de un estudiante que no ha dado su consentimiento para ese uso, consulta a la persona responsable de protección de datos de tu centro o a un asesor legal, y aplica la normativa que corresponda. No improvises plazos ni decisiones jurídicas por tu cuenta.

### Consentimiento y comunicación con el estudiante

Si usas IA para preparar materiales o para corregir, infórmalo. Puedes incluir una breve nota en la presentación inicial: qué herramientas usas, con qué fin, qué datos nunca introduces y cómo puede preguntar el estudiante por ello. Con menores, la información debe llegar también a la familia, y el consentimiento debe ser claro y, según la normativa aplicable, constar por escrito.

### Errores frecuentes de anonimización

- **Quitar solo el nombre.** «Estudiante A, de la clínica de Ruiz, en la ciudad X» sigue identificando a alguien.
- **Olvidar los metadatos.** Las fotos y los documentos pueden contener fecha, ubicación o autor. Elimínalos antes de subirlos.
- **Capturas con datos visibles.** Una pantalla puede mostrar el nombre de usuario, el correo o una notificación. Recórtala.
- **Grabaciones de voz.** La voz es un dato personal. Si necesitas trabajar con audio, hazlo sin subirlo a herramientas que no hayas evaluado.

### Ejemplo de flujo seguro

Tienes las notas de una clase: «María, de Lisboa, enfermera, B1, se confunde con ser y estar al hablar de su trabajo». La versión segura sería: «Estudiante adulta, profesional sanitaria, nivel B1, lengua materna portuguesa; confunde ser y estar al describir estados temporales.» Se ha retirado el nombre y la ciudad concreta, pero se ha conservado lo pedagógicamente útil. Esa es la regla: retira lo que identifica y conserva lo que enseña.

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

### Qué contenidos no debes pedir

La herramienta no debe ser un atajo para copiar. No pidas que reproduzca capítulos de libros, letras de canciones, artículos de prensa completos ni materiales de editoriales, aunque el uso te parezca inocente. Tampoco es buena idea pedir un resumen extenso de una obra protegida y distribuirlo como si fuera tuyo: un resumen puede reproducir la estructura, los diálogos o los ejemplos originales. Lo seguro es preguntar por las características generales de una obra, no por su contenido literal, y trabajar después con materiales propios.

### Cómo comprobar si un material puede usarse

Antes de adaptar o publicar un texto, busca su licencia o su condición de uso. Un texto de dominio público, es decir, cuyos derechos de explotación han expirado, puede usarse con más libertad, aunque conviene comprobar la situación en tu país porque los plazos varían. Un material con una licencia abierta, como algunas licencias Creative Commons, permite usos según las condiciones que indique, y debes respetarlas, incluida la atribución. Si no encuentras información, asume que el material está protegido y pide permiso o busca otro.

### Imágenes, audio y otros formatos

Las mismas reglas valen para imágenes y audios. Una imagen generada por IA puede parecerse demasiado a una obra existente, y una voz sintética puede imitar a una persona real. Revisa las condiciones de uso de la herramienta, evita pedir estilos o voces de artistas identificables y no uses ningún recurso sin saber de dónde procede. Si necesitas apoyo visual, describe la escena con tus palabras y busca el recurso en un banco con licencia clara.

### Ejemplo trabajado: un texto que suena conocido

Pides a la herramienta un texto breve sobre la rutina de un pueblo costero y el resultado incluye una frase muy característica que reconoces de una obra famosa. Lo primero es no publicarla. Después, compruebas si es una cita breve y correctamente atribuida o si es una reproducción. Si es lo segundo, la sustituyes por una frase tuya y la verificas. Por último, anotas el incidente para pedir en el futuro textos originales y para revisar el material antes de publicarlo. Ese procedimiento sirve para cualquier material generado.

### Documentar la revisión humana

Si un material tiene un papel relevante de la IA, guarda un registro sencillo: qué herramienta y qué versión usaste, qué prompt, qué partes generó la IA y qué partes cambiaste tú. Esa documentación sirve para responder preguntas, para revisar el material en el futuro y para demostrar que hubo una contribución humana sustancial. No necesitas un formulario complicado; una hoja de cálculo o un documento con fecha bastan.

### Autoría y honestidad con tus estudiantes

Si tus estudiantes realizan trabajos o tareas, sigue las normas de tu centro o de la institución que los evalúa sobre el uso de IA. Muchas instituciones lo regulan de forma distinta según el nivel y el tipo de tarea. Como tutor, comunica qué se permite y qué no, y pregunta cuando tengas dudas sobre el trabajo de un estudiante. Lo mismo vale para tu propio trabajo: no presentes como original algo que es sustancialmente generado por una herramienta si el contexto espera una autoría personal.

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

### Una ficha reutilizable

Una buena ficha de prompt cabe en pocas líneas y permite que cualquiera (tú dentro de seis meses, o un colega) entienda para qué sirve. Puedes organizarla con estos campos:

- **Nombre:** corto y descriptivo, por ejemplo «Diálogo A2 en una panadería».
- **Propósito:** qué material produce y para qué tipo de clase.
- **Texto del prompt:** con las variables entre corchetes.
- **Variables:** lista de los campos que hay que rellenar, con un ejemplo de valor.
- **Criterios de evaluación:** tres o cuatro preguntas de la tabla de criterios que aplicas al resultado.
- **Historial:** fecha de creación, fecha de la última revisión y cambios importantes.

### Cómo nombrar y etiquetar

Un sistema de etiquetas sencillo te permite encontrar el prompt adecuado en segundos. Las etiquetas más útiles son el nivel (de A1 a C2, según el Marco común europeo de referencia), la destreza (comprensión lectora, expresión oral, léxico, gramática), el tipo de material (diálogo, actividad, rúbrica, plan de clase) y la edad del público. Usa nombres en español y evita abreviaturas que solo tú entiendas. Si la biblioteca crece, un índice al principio del documento vale más que cien prompts sin orden.

### Versionar las mejoras

Cuando cambies un prompt, no sobrescribas la versión anterior sin dejar rastro. Añade una línea al historial que explique qué falló y qué añadiste, por ejemplo: «v2: el diálogo usaba vosotros; añadida restricción de variedad». Así puedes volver atrás si la nueva versión empeora y entiendes por qué la modificaste. Esta práctica es, en realidad, la forma más rápida de aprender a escribir mejores prompts.

### Ejemplo de ficha completa

- **Nombre:** actividad de práctica controlada, A2, pretérito indefinido.
- **Propósito:** ordenar una historia breve con marcadores temporales en una clase individual con adultos.
- **Variables:** [EDAD], [L1], [INTERESES], [VARIEDAD], [ESTRUCTURA].
- **Criterios:** el ítem exige entender la secuencia; la clave tiene justificación; no hay vosotros y ustedes mezclados.
- **Historial:** creado en la primera revisión del módulo; v2 con restricción de léxico y tareas finales más concretas.

### Qué no guardar en la biblioteca

La biblioteca es un archivo de trabajo, no un registro de estudiantes. No guardes en ella nombres, datos de contacto, producciones identificables ni notas que permitan reconocer a una persona. Si un prompt funcionó con un estudiante concreto, guarda el perfil genérico que lo describe, no el caso real. Revisa la biblioteca con esta regla al menos una vez al trimestre.

### Mantenimiento y colaboración

Dedica un momento cada cierto tiempo a revisar la biblioteca: elimina los prompts que ya no usas, actualiza los que dependen de herramientas que han cambiado y comprueba que las etiquetas siguen siendo útiles. Si compartes prompts con colegas, adapta las referencias a tu contexto y explica cuáles son las variables. Un prompt bien documentado vale más que varios que solo funcionan para su autor.

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

### Preparación antes de empezar

La sesión funciona mejor si llegas con todo listo. Antes de empezar, define el perfil del estudiante, real o simulado, con tres datos: nivel, objetivo y una característica relevante (por ejemplo, que se bloquea cuando tiene que hablar sin preparación). Ten a mano las herramientas que vas a usar, la tabla de criterios del módulo y un cronómetro visible. Si trabajas con un estudiante real, avísale de que la sesión tiene un objetivo de trabajo y de que vas a revisar materiales generados con IA, para que el tiempo de revisión no le resulte extraño.

### Guía de cada bloque

El bloque de anonimización dura ocho minutos y es el más fácil de saltarse. Hazlo igualmente: redacta el perfil en tres líneas y comprueba que no aparece ningún dato identificable.

En la generación, lanza primero el prompt de plan de clase y luego el de diálogo. No intentes ajustar nada todavía; lo importante es ver el resultado tal como sale.

En la evaluación, resuelve tú la actividad antes de mirar la clave y lee el diálogo en voz alta. Anota cada error en una columna aparte, distinguiendo si es de lengua, de nivel, de variedad o de sentido. Esa clasificación te dirá qué corregir en el prompt.

En la verificación, busca al menos un dato cultural y una palabra de variedad en un diccionario o en una referencia académica. Si no puedes verificarlos, márcalos como pendientes y no los uses.

En la mejora, reescribe el prompt con una restricción por cada error grave. Por ejemplo, si el diálogo mezcló vosotros y ustedes, añade «usa solo ustedes, variedad de Colombia». Limita las restricciones a las necesarias: un prompt con veinte condiciones contradictorias produce resultados peores.

En el registro, guarda la versión mejorada con sus variables y sus criterios. Si no lo haces ahora, la sesión habrá servido de poco.

### Cómo decidir qué cambiar

Cuando un resultado tiene varios errores, pregúntate cuál aparecería con más frecuencia si usaras el prompt con otros estudiantes. Corrige primero esos, porque el prompt se usará muchas veces. Un error aislado, que depende solo de ese caso concreto, puede corregirse a mano sin tocar el prompt. Esta distinción evita que la biblioteca se llene de condiciones que solo sirven para una situación.

### Ejemplo de registro de sesión

Un registro breve podría tener esta forma:

- Perfil: adulto, B1, objetivo de hablar sobre planes de viaje.
- Resultado 1 (plan de clase): bien estructurado, pero la presentación usaba léxico de C1 sin glosa.
- Resultado 2 (diálogo): natural, con dos intervenciones demasiado largas y una mezcla de registros.
- Errores clasificados: nivel (1), variedad (1), sentido (0).
- Cambio en el prompt: añadir «léxico máximo B1, glosar las palabras nuevas» y «frases de máximo quince palabras».
- Entrada en la biblioteca: versión 2, con la fecha de hoy.

Este formato ocupa poco tiempo y permite comparar sesiones distintas.

### Cuándo alargar o recortar

Si un bloque se alarga, reduce el siguiente sin saltarte el cierre, como indica la sesión. Si la generación tarda demasiado, aprovecha el tiempo para preparar la verificación. Si la evaluación revela muchos errores, prioriza el registro del prompt sobre la corrección completa del material: lo que aprendas sobre el prompt servirá en todas las sesiones futuras. Lo que nunca conviene es terminar la sesión sin registrar nada.

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

### Cómo enfocar la tarea práctica

La tarea pide tres prompts de tu biblioteca adaptados a tu estudiante del proyecto final. Un enfoque ordenado consiste en elegir primero los prompts que más te importan, por ejemplo uno de planificación, otro de materiales y otro de evaluación, para cubrir las fases principales de una clase. Después, adáptalos: sustituye las variables por datos anonimizados de tu estudiante, ajusta el nivel y el objetivo, y fija la variedad de español que usas.

Ejecuta cada prompt sin modificarlo al principio. Así podrás documentar el resultado inicial y, después, la mejora. Evalúa cada resultado con la tabla de criterios del módulo, anotando en cada criterio si se cumple, se cumple a medias o falla, y por qué.

### Qué debe incluir la documentación

La documentación no necesita ser larga, pero sí precisa. Para cada prompt, incluye:

- El prompt original y el prompt mejorado, con sus variables.
- Los errores encontrados, clasificados por tipo (lingüístico, de nivel, de variedad, de datos o de sentido).
- Las correcciones que realizaste tú, con su motivo.
- Una valoración final de si el material puede usarse con tu estudiante y con qué cambios.

Esa última valoración es la que demuestra que has aplicado el criterio pedagógico, que es el objetivo central del módulo.

### Ejemplo de documentación

- **Prompt:** diálogo por nivel, B1, en una tienda de ropa.
- **Errores:** la IA usó «vosotros» en un diálogo para estudiantes de Colombia (corregido a «ustedes»); una intervención tenía una estructura de C1 (simplificada); la clave de las preguntas de comprensión era correcta en tres de cuatro casos (corregida la cuarta).
- **Mejora:** añadida una restricción de variedad, un límite de longitud por intervención y la instrucción de glosar las palabras nuevas.
- **Valoración:** utilizable tras la revisión; el diálogo suena natural al leerlo en voz alta.

### Errores habituales al entregar

- **Documentar solo el resultado final.** Sin el prompt original y los errores no se ve el proceso.
- **Mejorar sin justificar.** Cada cambio en el prompt debe responder a un error observado.
- **Confiar en la clave generada.** Si no resolviste la actividad tú primero, no la has evaluado.
- **Olvidar los datos del estudiante.** La tarea debe contener el perfil anonimizado, nunca el nombre real.

### Preguntas para reflexionar

Antes de entregar, responde por escrito: ¿qué prompt mejoró más tras la revisión?, ¿qué tipo de error apareció con más frecuencia?, ¿qué criterio de la tabla te resultó más difícil de aplicar y por qué? Tus respuestas te dirán en qué debes concentrarte en la próxima revisión de tu biblioteca.

### Cómo adaptar los prompts a tu estudiante del proyecto final

Antes de ejecutar nada, define el perfil de tu estudiante con datos anonimizados. Por ejemplo: adulto de 45 años, lengua materna italiana, nivel B2, interesado en la gastronomía, que necesita atender a clientes en español en un restaurante. Con ese perfil, el prompt de planificación cambia su objetivo a «atender a un cliente que pregunta por los platos del día»; el de materiales pide un diálogo de ocho intervenciones con esa situación; y el de evaluación construye una rúbrica para una tarea oral de ese mismo contexto.

Comprueba que cada variable del prompt tiene un valor concreto antes de enviarlo. Un corchete sin rellenar produce resultados genéricos o, peor, inventa un dato que no existe. Si al adaptar un prompt tienes que cambiar su estructura, no lo estás adaptando sino escribiendo otro; guárdalo como versión nueva en tu biblioteca.

### Qué significa una valoración honesta

Un prompt que funciona bien siempre, sin ninguna corrección, debería despertar sospechas: o el material es muy sencillo, o no lo has evaluado con el rigor suficiente. Reconocer errores forma parte del aprendizaje del módulo. La tarea no pide un resultado perfecto, sino un proceso bien documentado en el que quede claro qué comprobaste, qué encontraste y qué decidiste cambiar.

### Plan de 60 minutos

| Min. | Bloque | Qué hacer |
|---|---|---|
| 0–8 | Activación | Revisa tu biblioteca de prompts y elige el peor. |
| 8–22 | Lectura guiada | Lee la tarea práctica y la tabla de criterios de evaluación. |
| 22–38 | Práctica | Responde el cuestionario y revisa las retroalimentaciones. |
| 38–52 | Aplicación con tu estudiante | Ejecuta tres prompts de tu biblioteca con tu estudiante anonimizado y evalúa los resultados. |
| 52–60 | Cierre | Marca la lista y anota la versión mejorada de cada prompt. |

