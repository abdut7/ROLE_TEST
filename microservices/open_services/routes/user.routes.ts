import express from "express";
import {
    makeController
} from "../../../libs/core/helpers";
import {
    logInUserController
} from "../../../libs/user/app";

let router = express.Router();
router.post("/login_user", makeController(logInUserController));
module.exports = router;