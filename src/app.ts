import express from "express";
import 'dotenv/config';

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (__req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.listen(PORT, () => {
  console.log(`### 🚀 Server is running on PORT: ${PORT} ###`);
});
