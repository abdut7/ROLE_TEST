import express from "express";
import {
    makeController
} from "../../../libs/core/helpers";
import {
    deleteUserController,
    getListUserController,
    createUserController
} from "../../../libs/user/app";
let router = express.Router();
router.post("/create_user", makeController(createUserController))
router.post("/delete_user", makeController(deleteUserController))
router.post("/get_user", makeController(getListUserController))
module.exports = router;