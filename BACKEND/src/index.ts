import express from "express";
import cors from "cors";

import collegeRoutes from "./routes/collegeRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/colleges", collegeRoutes);

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("College Platform API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});