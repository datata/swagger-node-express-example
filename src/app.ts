import express from "express";
import 'dotenv/config';

// imports swagger
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

export const app = express();

const PORT = process.env.PORT || 4000;

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
app.get("/api/v1/healthy", (__req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`### 🚀 Server is running on PORT: ${PORT} ###`);
});
