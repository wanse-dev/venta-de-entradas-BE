import express, { type Request, type Response } from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { connectDB } from "./database.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("API working properly!");
});

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
