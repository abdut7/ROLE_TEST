import express from "express";
let routes = express.Router();
routes.use("/user", require("./user.routes"));
export default routes;