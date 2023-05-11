import express from "express";
import petsRoutes from "./routes/pets.routes.js";
import indexRoutes from "./routes/index.routes.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", petsRoutes);
app.use("/api", indexRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

//Listener del puerto
app.listen(3001, () => {
  console.log("Server on port 3001");
});
