![Swagger](./img/swaggerImage.png)

### Introducción

Swagger es una herramienta de software de código abierto que ayuda a los desarrolladores a diseñar, construir, documentar y consumir servicios web RESTful. Swagger es ampliamente utilizado para describir APIs y también proporciona herramientas para generar código cliente, generar documentación y garantizar que las APIs sigan el estándar OpenAPI.

Aquí hay algunas cosas que puedes hacer con Swagger:

1. **Diseño y especificación de API**: Puedes usar Swagger para diseñar tu API y describir todos los aspectos de tu API, como las rutas, los parámetros, las respuestas, etc.

2. **Documentación de API**: Swagger genera una documentación interactiva y fácil de usar para tu API. Esta documentación permite a los usuarios probar las operaciones de la API directamente desde la interfaz de usuario.

3. **Generación de código**: Swagger puede generar código en varios lenguajes de programación a partir de la especificación de tu API.

4. **Validación de API**: Swagger puede ayudarte a asegurarte de que tu API esté siguiendo el estándar OpenAPI.

En resumen, Swagger es una herramienta esencial para cualquier desarrollador que trabaje con APIs RESTful.

### Primeros Pasos

Partiendo del proyecto Express en funcionamiento de este repositorio.

El proyecto para este ejemplo está corriendo en el puerto 4000.


### Instalación de Dependencias

Para generar la documentación, se utilizan dos dependencias:

- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

---

**0.Estructura básica node express**
``` ts
import express from "express";
import 'dotenv/config';

export const app = express();

const PORT = process.env.PORT || 4000;

app.get("/api/v1/healthy", (req, res) => {
res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.listen(PORT, () => {
  console.log(`### 🚀 Server is running on PORT: ${PORT} ###`);
});

````

  **1.Instalamos las dependecias**

```bash
$ npm i swagger-jsdoc
$ npm i swagger-ui-express
````

Instalamos los types

```bash
$ npm i @types/swagger-jsdoc
$ npm i @types/swagger-ui-express
```

**2.Configuramos el archivo swagger.ts**
Configuración:

- Creamos fichero api.docs.ts

```js
/**
 * @swagger
 * /api/v1/healthy:
 *   get:
 *     tags:
 *      - Health
 *     summary: Check the health of the server.
 *     responses:
 *       200:
 *         description: The server is healthy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               message: "Server is healthy"
 */
```

La configuración de Swagger se realiza en el archivo swagger.js, ubicado en ./swagger.ts.

```ts
import swaggerJSDoc from "swagger-jsdoc";
import path from "node:path";

const swaggerOptions: swaggerJSDoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Express API with Swagger",
			version: "1.0.0",
			description:
				"This is a simple CRUD API application made with Express and documented with Swagger",
			contact: {
				name: "datata",
				email: "",
			},
		},
	},
	apis: [path.resolve(__dirname, "./api.docs.*")],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
```

⚠️ Especial atención a la propiedad `apis`, donde deberemos indicar dónde se encuentra el fichero/s para mostrar en la UI.

**3. Importamos y montamos las funciones de middleware de swagger mediante app.use**

```ts
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

...

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

...
```

**3. Interfaz de Documentación**

Para acceder La interfaz de documentación se sirve en:

http://localhost:4000/api-docs/.

**4. Ejemplo documentación**

```ts
/**
 * @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 * security:
 *  - BearerAuth: []
 */

// HEALTHY
/**
 * @swagger
 * /api/v1/healthy:
 *   get:
 *     tags:
 *      - Health
 *     summary: Check the health of the server.
 *     responses:
 *       200:
 *         description: The server is healthy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               message: "Server is healthy"
 */

// AUTH
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               message: "User created successfully"
 *       400:
 *         description: Missing email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: false
 *               message: "Missing email or password"
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log in a user.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to log in.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *             example:
 *               success: true
 *               message: "User logged in successfully"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTYyMzUwNjMzN30.7"
 *       400:
 *         description: Missing email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: false
 *               message: "Missing email or password"
 */

// USERS
/**
 * @swagger
 * /api/v1/users:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user.
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user data to update.
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               message: "User updated successfully"
 *       400:
 *         description: Missing user data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: false
 *               message: "Missing user data"
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user.
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the user to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               message: "User deleted successfully"
 *       400:
 *         description: Invalid user ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: false
 *               message: "Invalid user ID"
 */
```
