import express from "express";
import { connectDB } from "./config/db.js";
import projectRoutes from "./routes/project.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allow to accept json data for req.body

app.use("/api/projects", projectRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
