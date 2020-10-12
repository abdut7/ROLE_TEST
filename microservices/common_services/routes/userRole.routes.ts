import express from "express";
import {
    makeController
} from "../../../libs/core/helpers";
import {
    getUserRoleController,
    createUserRoleController,
    getUserRoleModuleController,
    updateUserRoleModuleController
} from "../../../libs/userRole/app";
let router = express.Router();
router.post("/get_role", makeController(getUserRoleController))
router.post("/create_role", makeController(createUserRoleController))
router.post("/get_role_module", makeController(getUserRoleModuleController))
router.post("/update_role_module", makeController(updateUserRoleModuleController))
module.exports = router;