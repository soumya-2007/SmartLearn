
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import teacherRoutes from "./routes/teacherRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import learningRoutes from "./routes/learningRoutes.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to SmartLearn Backend API",
  });
});


app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SmartLearn backend is running!",
  });
});

app.use("/api/teachers", teacherRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/learning", learningRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// 7. Start server LAST
app.listen(PORT, () => {
  console.log(`SmartLearn backend running at http://localhost:${PORT}`);
});
