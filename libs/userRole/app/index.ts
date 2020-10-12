import {
    createUserRoleUsecase,
    getUserRoleModuleUsecase,
    getUserRoleUsecase,
    updateUserRoleModuleUsecase
} from '../usecase'
import {
    getUserRoleControllerFactory,
    createUserRoleControllerFactory,
    getUserRoleModuleControllerFactory,
    updateUserRoleModuleControllerFactory
} from './userRoleController'

let getUserRoleController = getUserRoleControllerFactory({
    getUserRoleUsecase
})
let createUserRoleController = createUserRoleControllerFactory({
    createUserRoleUsecase
})
let getUserRoleModuleController = getUserRoleModuleControllerFactory({
    getUserRoleModuleUsecase
})
let updateUserRoleModuleController = updateUserRoleModuleControllerFactory({
    updateUserRoleModuleUsecase
})
export {
    getUserRoleController,
    createUserRoleController,
    getUserRoleModuleController,
    updateUserRoleModuleController
}