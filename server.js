import express from "express";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(morgan("dev"));

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(join(__dirname, "index.html"));
});

const server = app.listen(8080, () => {
	console.log(`Express listening on port http://localhost:${server.address().port}.`);
});
