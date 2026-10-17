# Configuración del enlace de donación (PayPal)

## Estado actual

El sitio muestra el botón **«Apoyar el proyecto con PayPal»** en la página de inicio, en el pie de todas las páginas y en `/colaborar/`. La configuración está en `site.config.json`:

```json
"paypal": {
  "hostedButtonId": "",
  "businessEmail": "isabeluribe1119@gmail.com",
  "currency": "USD",
  "itemName": "Apoyo voluntario a Aula Abierta ELE"
}
```

Con `hostedButtonId` vacío, el enlace se construye con el **correo de la cuenta**:

```
https://www.paypal.com/donate?business=isabeluribe1119%40gmail.com&item_name=Apoyo+voluntario+a+Aula+Abierta+ELE&currency_code=USD
```

### Qué está verificado y qué no

- ✅ **Formato documentado por PayPal.** La documentación de PayPal (archivada) de *PayPal Payments Standard* describe los enlaces de donación con el formato `https://www.paypal.com/donate?business=…&item_name=…&currency_code=…`, y el *Donate SDK* indica que las cuentas personales se identifican con el valor `business` y las cuentas empresariales con `hosted_button_id`.
- ⚠️ **PayPal marca esa integración como heredada** y recomienda, para integraciones nuevas, los botones alojados (*hosted buttons*) / *Payment Links and Buttons*. También advierte de que los enlaces no alojados pueden ser modificados por terceros.
- ⚠️ **No se ha podido comprobar en vivo** que la cuenta asociada al correo pueda recibir donaciones con este formato (depende del tipo de cuenta y del país). **Debe verificarlo la titular** abriendo el enlace.
- ℹ️ El correo queda visible en el código del sitio y en el enlace. Si prefieres no mostrarlo, usa un botón alojado (abajo).

## Recomendado: crear un botón alojado

1. Inicia sesión en PayPal con la cuenta del proyecto y abre **https://www.paypal.com/donate/buttons** (si tu cuenta puede iniciar este flujo, puede crear botones de donación).
2. Crea un botón de donación (moneda, importes sugeridos opcionales, texto «Apoyo voluntario a Aula Abierta ELE»).
3. Al final, PayPal muestra un código con un valor `hosted_button_id` (y/o un enlace del tipo `https://www.paypal.com/donate/?hosted_button_id=XXXXXXXX`).
4. Copia **solo** ese identificador en `site.config.json` → `"hostedButtonId": "XXXXXXXX"`. Si lo deseas, deja `businessEmail` vacío.
5. Haz *commit* y publica. El botón usará `https://www.paypal.com/donate/?hosted_button_id=XXXXXXXX`.

El identificador del botón **no es un secreto** (es público por diseño), pero **nunca** pongas en el repositorio contraseñas, claves de API, *client secrets* ni datos bancarios.

## Comprobación

1. Abre el sitio publicado y pulsa «Apoyar el proyecto con PayPal».
2. Debe abrirse `www.paypal.com` con el nombre de la cuenta del proyecto.
3. No completes un pago de prueba con dinero real si no lo deseas; basta con comprobar que la página de PayPal reconoce al destinatario.
4. Si PayPal muestra un error, crea el botón alojado (pasos anteriores).

## Textos y transparencia

Los textos del sitio indican que las donaciones son voluntarias, que el contenido seguirá siendo gratuito, que no dan acceso a contenidos adicionales y que no constituyen la compra de certificados. Si en el futuro el proyecto se constituye como entidad sin ánimo de lucro, actualiza `content/paginas/colaborar.md`.

Fuentes: [PayPal Donate SDK](https://developer.paypal.com/sdk/donate/) · [Ejemplo HTML de botón de donación (documentación archivada)](https://developer.paypal.com/archive/paypal-payments-standard/integration-guide/html-example-donate)
