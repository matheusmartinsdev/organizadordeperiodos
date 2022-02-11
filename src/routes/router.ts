import express from "express";
const router = express.Router();
const server = require("../server/server");

router.use(express.json());

router.get("/", async (req, res) => {
	await res.json({ message: "Hello World" });
});

export = router;
