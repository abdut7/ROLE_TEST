import express from "express";
let routes = express.Router();
routes.use("/user", require("./user.routes"));
routes.use("/role", require("./userRole.routes"));
export default routes;