import express from "express";
import cors from "cors";
import cartItemsRouter from "./routes/cartItemsRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", cartItemsRouter);

const port = 3001;
app.listen(port, () => console.log(`listen on port: ${port}`));
