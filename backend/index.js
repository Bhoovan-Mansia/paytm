import express from "express";
import cors from "cors";
import { mainRouter } from "./routes/index.js";
import { PORT } from "./config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", mainRouter);

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	}
	console.log(`Server is running on port ${PORT}`);
});
