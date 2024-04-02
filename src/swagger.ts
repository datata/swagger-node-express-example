import swaggerJSDoc from "swagger-jsdoc";
import path from "node:path";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "This is a simple CRUD API application made with Express and documented with Swagger",
      contact: {
        name: "datata",
        email: ""
      }
    },
  },
  apis: [path.resolve(__dirname, './api.docs.*')]
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;