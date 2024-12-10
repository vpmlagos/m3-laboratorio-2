# Proyecto Clínica Privada

El repositorio contiene la página web desarrollada utilizando HTML, CSS, Bootstrap y el preprocesador SASS.

## Instrucciones de Ejecución

Para visualizar el proyecto, simplemente abre el archivo `index.html` en tu navegador.

### Ejecución en Modo Desarrollo

Para ejecutar el proyecto en modo desarrollo, sigue estos pasos:

1. **Instalar SASS**:

   Si no tienes SASS instalado, primero necesitas instalarlo globalmente usando el siguiente comando:

```
  npm install -g sass
  npm install bootstrap
  sass src/sass/main.scss dist/style.css
```

```
/Proyecto-Hospital-Privado
├── index.html
├── equipo.html
├── contacto.html
├── reservas.html
├── package-lock.json
├── package.json
├── README.md
├── node_modules
│   └── ...
├── src
│   ├── img
│   │   └── ...
│   ├── js
│   │   └── medicos.json
│   │   └── reservas.js
│   ├── sass
│   │   └── abstracts
│   │          └──_mixins.scss
│   │          └──_variables.scss
│   │   └── base
│   │          └──_reset.scss
│   │   └── components
│   │          └──_buttons.scss
│   │          └──_cards.scss
│   │          └──_carousel.scss
│   │   └── layout
│   │          └──_navbar.scss
│   │   └── pages
│   │          └──_home.scss
│   │   └── themes
│   │   └── vendors
│   │          └──_bootstrap.scss
│   │   └── main.scss
│   ├── style
│   │   └── homeStyle.css
├── dist
│   └── style.css
│   └── style.css.map
```


## PROCESO DE RESERVAS

El proceso principal comienza con la página **index.html**, donde aparece destacado el botón RESERVAR CITA, este botón lleva a la página **reserva.html**. Ahí se puede ver una columna con los médicos disponibles y un botón "Reservar cita" este botón gatilla una serie de prompts destinados a recopilar información personal como:

1. Nombre
2. Email 
3. Teléfono
4. Médico

### FUNCIONES

La función ***solicitarDatosUsuario*** muestra una serie de prompts al usuario para recopilar la información requerida. Una vez que el usuario introduce los datos, la función pasa esos valores a la función validarDatosUsuario 


La función ***validarDatosUsuario*** para comprobar si la información es válida. La validación incluye:

    Nombre: Verifica que no esté vacío.
    Email: Verifica que sea un correo electrónico válido (debe contener el símbolo @).
    Teléfono: Verifica que el teléfono tenga una longitud adecuada y sea un número válido.

Si los datos son válidos, la reserva se muestra en la consola; si no lo son, se muestra un mensaje de error y se solicita al usuario que intente de nuevo.

Las variables locales (declaradas dentro de una función) solo están accesibles dentro de esa función. En el caso de esta aplicación, las variables como nombre, email, telefono, y medico son locales a la función solicitarDatosUsuario, y no se pueden acceder fuera de ella.

Las variables globales, como validarDatosUsuario o cualquier otra función definida en el script, están disponibles para todo el documento HTML, ya que no están encapsuladas dentro de ninguna función.

Operador de Comparación (==, ===): Se usa para verificar si dos valores son iguales.

    Ejemplo: email.includes('@') verifica si el email contiene el símbolo @.

Operador Lógico (&&): Se usa para comprobar que varias condiciones sean verdaderas al mismo tiempo.

    Ejemplo: if (typeof email === 'string' && email.includes('@')) verifica que el email sea una cadena de texto y contenga el @.

Operadores de Asignación (=): Usados para asignar valores a las variables.

    Ejemplo: let nombre = prompt("¿Cuál es tu nombre?"); asigna el valor ingresado por el usuario a la variable nombre.


Uso del Debugger

El debugger es una herramienta poderosa para realizar un seguimiento detallado del flujo de ejecución del código. Puedes usar el debugger en tu código JavaScript para pausar la ejecución en un punto específico y examinar el estado de las variables y la pila de llamadas.

Cómo usarlo:

    Inserta debugger; en el lugar donde quieras pausar el código.
    Abre las herramientas de desarrollo del navegador (F12 o Ctrl + Shift + I en la mayoría de los navegadores).
    Ve a la pestaña de "Consola" o "Debugger".
    La ejecución del código se detendrá en el punto donde insertaste debugger, lo que te permitirá inspeccionar las variables y el flujo de ejecución.


    El bloque try/catch se utiliza para manejar errores en el código. El bloque try contiene el código que puede generar un error, mientras que el bloque catch captura el error y permite manejarlo adecuadamente.

Cómo funciona:

    try: Intenta ejecutar el código dentro de este bloque.
    catch: Si ocurre un error dentro del bloque try, el flujo de ejecución se detiene y se pasa al bloque catch, donde se puede manejar el error.
    finally: Se ejecuta independientemente de si ocurrió o no un error, y es útil para tareas de limpieza.



### Actualización Laboratorio 2

Las estructuras utilizadas como base de almacenamiento fueron dos archivos json  ***medicos.json*** y ***citas.json***

Funciones:
1. Obtener Médicos : Mediante la función obtenerMedicos(), los datos de los médicos se cargan desde el archivo medicos.json     usando la API fetch.

2. Mostrar Médicos: Una vez que los datos de los médicos son cargados correctamente, se procesan mediante la función mostrarMedicos(), que crea un listado de médicos en el HTML, mostrando detalles como su nombre, especialidad y horario de atención.


### Carga y Procesamiento de Datos de Citas

1. Obtener Citas: De manera similar a los médicos, las citas se cargan desde el archivo citas.json mediante la función fetchDatos(), que también incluye los datos de los médicos.

2. Combinación de Datos: El sistema realiza una clonación y merge de los datos de citas y médicos. En primer lugar, se clona el arreglo de médicos (doctoresClonados = JSON.parse(JSON.stringify(doctores))) para evitar modificar el arreglo original. Luego, se combinan los datos de las citas con la información adicional de los médicos correspondientes mediante la operación de mapeo:
```
    const citasExtendidas = citas.citas.map((cita) => {
        const doctor = doctores.find((doc) => doc.Id === cita.IdMedico);
        return {
            ...cita,
            nombreMedico: doctor ? doctor.nombre : "Desconocido",
            especialidad: doctor ? doctor.especialidad : "Desconocida"
        };
    });
```
Esto permite asociar cada cita con el nombre y especialidad del médico correspondiente, creando un objeto combinado con la información de las citas y los médicos.

## Algoritmos y Complejidad

Los algoritmos principales utilizados en este proyecto son los siguientes:

    1. Búsqueda de Médico por ID: Para cada cita, se busca el médico correspondiente mediante el método .find() de los arreglos. Este algoritmo tiene una complejidad O(n), donde n es el número de médicos. Dado que este proceso se realiza dentro de un bucle que recorre las citas, la complejidad total para procesar todas las citas es O(m * n), donde m es el número de citas.

    2. Clonación y Merge de Datos: La clonación de objetos mediante JSON.parse(JSON.stringify(...)) tiene una complejidad de O(n), donde n es el tamaño del objeto a clonar. El merge de citas y médicos también se realiza de manera eficiente mediante el uso de .map() y .find(), como se explicó anteriormente.

    3. Recorrido de Arreglos: El uso de forEach() para recorrer y mostrar médicos y citas tiene una complejidad O(n), donde n es el tamaño del arreglo que se está recorriendo.

En términos generales, el sistema realiza operaciones de tiempo lineal respecto al número de médicos y citas, lo cual es eficiente para la mayoría de los casos de uso.
Flujo de Trabajo

1. ***Carga de Datos***: Los datos de médicos y citas se cargan cuando se inicializa la página mediante la función obtenerMedicos() y fetchDatos().
2. ***Interacción del Usuario***: Los usuarios pueden interactuar con el sistema solicitando citas médicas. La validación de datos del usuario (nombre, email y teléfono) se realiza mediante la función validarDatosUsuario(). Si los datos son válidos, se confirma la reserva mediante solicitarDatosUsuario().
3. ***Visualización***: Se muestran las citas disponibles y los médicos en la interfaz utilizando el HTML dinámico generado por el JavaScript.



### Carga y Procesamiento de Datos de Citas:

    Obtener Citas: Similar a los médicos, las citas se cargan desde el archivo citas.json mediante la función fetchDatos(), que también incluye los datos de los médicos.

    Combinación de Datos: El sistema realiza una clonación y combinación de los datos de citas y médicos. Primero, se clona el arreglo de médicos para evitar modificar el arreglo original. Luego, se combinan los datos de las citas con la información adicional de los médicos correspondientes mediante la operación de mapeo:

    const citasExtendidas = citas.citas.map((cita) => {
        const doctor = doctores.find((doc) => doc.Id === cita.IdMedico);
        return {
            ...cita,
            nombreMedico: doctor ? doctor.nombre : "Desconocido",
            especialidad: doctor ? doctor.especialidad : "Desconocida"
        };
    });

Esto permite asociar cada cita con el nombre y especialidad del médico correspondiente, creando un objeto combinado con la información de las citas y los médicos.

### Algoritmos y Complejidad

Los algoritmos principales utilizados en este proyecto son los siguientes:

    Búsqueda de Médico por ID: Para cada cita, se busca el médico correspondiente mediante el método .find() de los arreglos. Este algoritmo tiene una complejidad O(n), donde n es el número de médicos. Dado que este proceso se realiza dentro de un bucle que recorre las citas, la complejidad total para procesar todas las citas es O(m * n), donde m es el número de citas.

    Clonación y Merge de Datos: La clonación de objetos mediante JSON.parse(JSON.stringify(...)) tiene una complejidad de O(n), donde n es el tamaño del objeto a clonar. El merge de citas y médicos también se realiza de manera eficiente mediante el uso de .map() y .find().

    Recorrido de Arreglos: El uso de forEach() para recorrer y mostrar médicos y citas tiene una complejidad O(n), donde n es el tamaño del arreglo que se está recorriendo.

En términos generales, el sistema realiza operaciones de tiempo lineal respecto al número de médicos y citas, lo cual es eficiente para la mayoría de los casos de uso.
Flujo de Trabajo

    Carga de Datos: Los datos de médicos y citas se cargan cuando se inicializa la página mediante la función obtenerMedicos() y fetchDatos().
    Interacción del Usuario: Los usuarios pueden interactuar con el sistema solicitando citas médicas. La validación de datos del usuario (nombre, email y teléfono) se realiza mediante la función validarDatosUsuario(). Si los datos son válidos, se confirma la reserva mediante la función solicitarDatosUsuario().
    Visualización: Los médicos y las citas disponibles se muestran en la interfaz utilizando el HTML dinámico generado por el JavaScript.

### Eventos y Asincronía

En el proyecto se implementan eventos personalizados que simulan la llegada de nuevos pacientes, mostrando una notificación en la página. La asincronía se maneja mediante funciones async/await, simulando llamadas a la API REST para obtener los datos de los doctores. Se utiliza el manejo de errores mediante try/catch para asegurar que las peticiones asíncronas se gestionen correctamente.