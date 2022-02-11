import express from "express";

const app = express();

app.use("/", require("../routes/router"));

app.listen(3000);
