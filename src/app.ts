import express from "express";
import 'dotenv/config';

// imports swagger
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

export const app = express();

const PORT = process.env.PORT || 4000;

app.get("/api/v1/healthy", (__req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.post("/api/v1/auth/register", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
);

app.post("/api/v1/auth/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
);

app.put("/api/v1/users", (req, res) => {
  try {
    const { name, email } = req.body;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.delete("/api/v1/users/:id", (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`### 🚀 Server is running on PORT: ${PORT} ###`);
});
