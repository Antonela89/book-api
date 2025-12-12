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

-   Crear un libro (POST `/books`).
-   Actualizar un libro existente (PUT `/books/:id`).
-   Eliminar un libro (DELETE `/books/:id`).
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

---

¡Claro que sí! Es una excelente idea documentar tu proyecto. Un buen `README.md` no solo muestra que cumpliste con la tarea, sino que demuestra profesionalismo y ayuda a quien revise tu código a entender tus decisiones técnicas.

Aquí tienes una propuesta para agregar al final de tu archivo. He incluido secciones sobre las tecnologías usadas, la arquitectura, cómo instalarlo y, muy importante, cómo usar la API (incluyendo las credenciales de prueba).

Copia y pega el siguiente contenido debajo de la línea de guiones `---` final de tus consignas:

---

# 📚 Documentación de la Solución

A continuación se detalla cómo se resolvió el desafío técnico, las tecnologías implementadas y cómo ejecutar el proyecto localmente.

## 🛠 Tecnologías y Herramientas

Para la resolución de este proyecto se decidió utilizar un entorno de desarrollo robusto basado en **TypeScript** para asegurar la calidad del código y prevenir errores comunes en tiempo de desarrollo.

-   **Lenguaje:** TypeScript (Configuración estricta).
-   **Runtime:** Node.js.
-   **Framework:** Express.js (v4).
-   **Seguridad:** `jsonwebtoken` (JWT) para autenticación basada en tokens.
-   **Manejo de Datos:** Persistencia en archivo JSON (`src/database/book.json`) simulando una base de datos.
-   **Variables de Entorno:** `dotenv`.
-   **Middlewares:** `cors`, validaciones personalizadas y manejo de errores.

## 📂 Arquitectura del Proyecto

Se implementó el patrón de diseño **MVC (Modelo-Vista-Controlador)** para separar responsabilidades y mantener el código ordenado y escalable:

-   **`/src/models`**: Contiene la lógica de negocio y el acceso directo a los datos (Lectura/Escritura del JSON).
-   **`/src/controllers`**: Maneja la lógica de las peticiones HTTP, conecta el modelo con las respuestas al cliente.
-   **`/src/routes`**: Define los endpoints y aplica los middlewares correspondientes.
-   **`/src/middlewares`**:
    -   `authentication.ts`: Valida el token JWT en rutas protegidas.
    -   `validatedID.ts`: Asegura que los IDs recibidos sean numéricos.
    -   `validation.ts`: Valida que el cuerpo (Body) de las peticiones POST y PUT sea correcto.
    -   `error.ts`: Middleware global para atrapar errores no controlados.

## 🚀 Instalación y Ejecución

1.  **Clonar o descargar el proyecto.**
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Configurar Variables de Entorno:**
    El proyecto incluye un archivo de ejemplo con las variables necesarias. Copia el archivo .env.example, renómbralo a .env y define los valores (o usa los sugeridos).

    ```bash
    # En terminal linux/mac
    cp .env.example .env
    ```

    ```bash
    # En Windows (o hazlo manualmente desde el explorador de archivos)
    copy .env.example .env
    ```

4.  **Iniciar el servidor en modo desarrollo:**
    ```bash
    npm run dev
    ```

## 🔌 Endpoints de la API

### 🔐 Autenticación

Para acceder a las rutas de creación, edición y eliminación, primero debes obtener un token.

-   **POST** `/auth/login`
    -   **Body (JSON):**
        ```json
        {
        	"username": "admin",
        	"password": "1234"
        }
        ```
    -   **Respuesta:** Recibirás un `token` que debes usar en los Headers de las siguientes peticiones (`Authorization: Bearer <token>`).

### 📚 Libros (Público)

-   **GET** `/books`
    -   Obtiene todos los libros.
-   **GET** `/books?author=nombre`
    -   Filtra los libros por autor (coincidencia parcial).
-   **GET** `/books/:id`
    -   Obtiene el detalle de un libro específico.

### 📚 Libros (Privado / Requiere Token)

Asegúrate de incluir el token en el Header `Authorization`.

-   **POST** `/books`
    -   Crea un nuevo libro. El ID se autogenera.
    -   **Validación:** Todos los campos son obligatorios y tipados.
-   **PUT** `/books/:id`
    -   Actualiza un libro existente.
    -   **Validación:** Acepta actualizaciones parciales (ej: solo stock).
-   **DELETE** `/books/:id`
    -   Elimina un libro por su ID.

## ✨ Características Adicionales Implementadas

-   **Validación de Tipos:** Se implementaron validaciones para asegurar que los IDs sean números y que los datos del cuerpo (Body) coincidan con la interfaz `Book` esperada.
-   **Manejo de IDs:** Lógica para autoincrementar IDs basada en el último ID existente, evitando duplicados al borrar elementos intermedios.
-   **Middleware Global:** Se registra en consola el método y la URL de cada petición entrante (`console.log`).
-   **Seguridad:** Se utilizó JWT con tiempo de expiración (1 hora) en lugar de una comparación de texto simple, simulando un entorno profesional real.

## 🧪 Pruebas (Testing)

Se ha creado una colección de Postman completa para probar todos los endpoints de la API (tanto los públicos como los que requieren autenticación).

Puedes acceder a la colección y ejecutar las pruebas haciendo clic en el siguiente botón:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://martian-eclipse-514495.postman.co/workspace/Team-Workspace~f2d65b89-0cb6-4194-8df8-5f8f94fde9ff/folder/27770697-61011c88-c094-44c8-b8b4-095176c387bc?action=share&source=copy-link&creator=27770697&ctx=documentation)

### Pasos para probar:
1.  Importa la colección en tu Postman.
2.  Asegúrate de que tu servidor local esté corriendo (`npm run dev`).
3.  Ejecuta primero la petición de **Login** para obtener el token.
4.  Si usas variables de entorno en Postman, guarda el token en la variable `token` o pégalo manualmente en la pestaña *Authorization* de las otras peticiones.
