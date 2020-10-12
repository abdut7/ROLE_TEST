import errHandler from "../../core/helpers/errHandler";
import {
    getRolePermission
} from '../../common/DB'
export function createUserControllerFactory({
    createUserUsecase
}) {
    return async function createUserController({
        body: objUserBody,
        ...source
    }) {
        try {
            let objPermission = await getRolePermission({
                strModule: "USER",
                strRoleName: source["strUserRole"]
            })
            if (objPermission && objPermission["blnCreate"]) {
                return {
                    body: await createUserUsecase({
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


export function getListUserControllerFactory({
    getUserUsecase
}) {
    return async function getListUserController({
        body: objUserBody,
        ...source
    }) {
        try {
            let objPermission = await getRolePermission({
                strModule: "USER",
                strRoleName: source["strUserRole"]
            })
            if (objPermission && objPermission["blnListView"]) {
                return {
                    body: await getUserUsecase({
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

export function logInUserControllerFactory({
    logInUserUseCase
}) {
    return async function logInUserController({
        body: objUserBody,
        ...source
    }) {
        try {
            return {
                body: await logInUserUseCase({
                    source,
                    body: objUserBody
                })
            };
        } catch (error) {
            let objError = new errHandler(error);
            return objError.send();
        }
    }
}

export function deleteUserControllerFactory({
    deleteUserUsecase
}) {
    return async function deleteUserController({
        body: objUserBody,
        ...source
    }) {
        try {
            let objPermission = await getRolePermission({
                strModule: "USER",
                strRoleName: source["strUserRole"]
            })
            if (objPermission && objPermission["blnDelete"]) {
                return {
                    body: await deleteUserUsecase({
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