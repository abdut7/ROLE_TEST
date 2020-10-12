import errHandler from "../../core/helpers/errHandler";
import {
    getRolePermission
} from '../../common/DB'
export function createUserRoleControllerFactory({
    createUserRoleUsecase
}) {
    return async function createUserRoleController({
        body: objUserBody,
        ...source
    }) {
        try {
            let objPermission = await getRolePermission({
                strModule: "ROLE",
                strRoleName: source["strUserRole"]
            })
            if (objPermission && objPermission["blnCreate"]) {
                return {
                    body: await createUserRoleUsecase({
                        source,
                        body: objUserBody
                    })
                };
            } else {
                throw new errHandler("YOU HAVE NO PERMISSION")
            }
        } catch (error) {
            let objError = new errHandler(error);
            return objError.send();
        }
    }
}


export function getUserRoleControllerFactory({
    getUserRoleUsecase
}) {
    return async function getUserRoleController({
        body: objUserBody,
        ...source
    }) {
        try {
            let objPermission = await getRolePermission({
                strModule: "ROLE",
                strRoleName: source["strUserRole"]
            })
            if (objPermission && objPermission["blnListView"]) {
                return {
                    body: await getUserRoleUsecase({
                        source,
                        body: objUserBody
                    })
                };
            } else {
                throw new errHandler("YOU HAVE NO PERMISSION")
            }
        } catch (error) {
            let objError = new errHandler(error);
            return objError.send();
        }
    }
}

export function getUserRoleModuleControllerFactory({
    getUserRoleModuleUsecase
}) {
    return async function getUserRoleModuleController({
        body: objUserBody,
        ...source
    }) {
        try {
            let objPermission = await getRolePermission({
                strModule: "ROLE",
                strRoleName: source["strUserRole"]
            })
            if (objPermission && objPermission["blnListView"]) {
                return {
                    body: await getUserRoleModuleUsecase({
                        source,
                        body: objUserBody
                    })
                };
            } else {
                throw new errHandler("YOU HAVE NO PERMISSION")
            }
        } catch (error) {
            let objError = new errHandler(error);
            return objError.send();
        }
    }
}

export function updateUserRoleModuleControllerFactory({
    updateUserRoleModuleUsecase
}) {
    return async function updateUserRoleModuleController({
        body: objUserBody,
        ...source
    }) {
        try {
            let objPermission = await getRolePermission({
                strModule: "ROLE",
                strRoleName: source["strUserRole"]
            })
            if (objPermission && objPermission["blnUpdate"]) {
                return {
                    body: await updateUserRoleModuleUsecase({
                        source,
                        body: objUserBody
                    })
                };
            } else {
                throw new errHandler("YOU HAVE NO PERMISSION")
            }
        } catch (error) {
            let objError = new errHandler(error);
            return objError.send();
        }
    }
}