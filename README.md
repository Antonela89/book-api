Carrera Back End con NodeJs - 202504
Profesora: Sachetti Sofia

# Actividad Clase Numero 15: TP INTEGRADOR

¡Bienvenidas, chicas! 👩‍💻✨

En este ejercicio integrador vamos a poner en práctica lo que aprendimos sobre endpoints, el objeto `req` y `res`, la notación `:id` para parámetros dinámicos, la desestructuración de objetos en JavaScript, y el uso de `express.json()`. Además vamos a introducir el tema visto hoy: **LOS TOKENS**.

Estos ejercicios les permitirán construir y probar APIs REST básicas utilizando ExpressJS, reforzando los conceptos clave mientras desarrollan habilidades prácticas para crear servidores robustos. 💻

💡 **Recuerden:** Este es un desafío diseñado para que apliquen todo lo que han aprendido hasta ahora y vayan desarrollando habilidades prácticas. Si encuentran dificultades, investiguen, prueben distintas soluciones y no tengan miedo de cometer errores.

**IMPORTANTE:** La ejercitación del día de hoy es de carácter obligatorio, con fecha de entrega el día **lunes 22/12**.

¡Manos a la obra y diviértanse programando! 👋💻

---

## Para comenzar

En tu Escritorio, crea una carpeta nueva llamada 'books-api'. Dentro de este directorio, crea un nuevo proyecto con el comando:
```bash
npm init -y
```
Luego, deberás hacer las instalaciones correspondientes a los módulos que usarás en el proyecto (Express, jsonwebtoken, cors). Utiliza el comando `npm install`.

Puedes utilizar el esquema de archivos o patrón de diseño que creas útil.

---

## Para la API REST

### 1. Crear una API básica
Crea una API REST con un endpoint `/books` que devuelva una lista de libros en formato JSON.
**Método:** GET.

### 2. CRUD simple
Ampliar el ejercicio anterior agregando endpoints para:
*   Crear un libro (POST `/books`).
*   Actualizar un libro existente (PUT `/books/:id`).
*   Eliminar un libro (DELETE `/books/:id`).
Los datos pueden guardarse en un archivo `database.json`.

### 3. Filtrado
Agregar un endpoint `/books?author=nombre` para devolver solo los libros de un autor específico.
**Método:** GET.

### 4. Detalles de un recurso
Crear un endpoint `/books/:id` que devuelva la información de un libro por su id. Si el libro no existe, devuelve un mensaje de error adecuado (404).

### Status codes y mensajes claros
Revisar la API para que devuelva los códigos de estado HTTP correspondientes para cada caso, como 200, 201, 404, y 400.

---

## Para Middlewares

### 1. Middleware global
Crea un middleware global que registre en la consola un mensaje como "Solicitud recibida" para cualquier endpoint.
Comprobar que el mensaje aparece cada vez que accedes a cualquier ruta de tu API.
**Solución:** `app.use()` con un `console.log` que diga por ejemplo “Middleware global: se recibió una solicitud”.

### 2. Middleware integrado de Express
Modificar la API para poder recibir datos JSON en el cuerpo de las solicitudes.
**Solución:** usar el middleware integrado `express.json()`.

### 3. Middleware de terceros
Configurar `cors` como middleware global para permitir solicitudes desde cualquier origen.
Comprobar que funcione accediendo desde Postman.
**Solución:** instalar `cors` y aplicarlo `app.use(cors())`.

### 4. Middleware de Autenticación
Crear un middleware que compruebe que el valor del token sea igual a un valor predefinido. Ej: "123456".
Si el token es válido, permite el acceso a la siguiente ruta.
Si no es válido o no está, responde con un mensaje de error.

### 5. Middleware para manejo de errores
Implementar un middleware global para manejar errores.
Si ocurre un error en cualquier endpoint, devuelve un mensaje JSON con el estado y el mensaje del error.
