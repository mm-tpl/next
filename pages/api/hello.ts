import { readFile } from "fs/promises";
import { cwd } from "process";
import { join } from "path";

// const { readFile } = promises;

export default async function (req, res) {
	res.statusCode = 200;
	const data = await readFile(join(cwd(), "mm.json"), "utf-8");
	res.send(data);
	// res.json({ name: "John Doe" });
}
