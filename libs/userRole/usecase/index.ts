import {
    userRoleEntity
} from '../entity'
import {
    inserOneDB,
    inserManyDB,
    getListDB,
    deleteManyDB
} from '../../common/DB'
import createUserRoleUsecaseFactory from './createUserRoleUsecase'
import getUserRoleUsecaseFactory from './getUserRolesUsecase'
import getUserRoleModuleUsecaseFactory from './getUserRoleModulesUsecase'
import updateUserRoleModuleUsecaseFactory from './updateUserRoleModulesUsecase'
let getUserRoleUsecase = getUserRoleUsecaseFactory({
    getListDB
})
let getUserRoleModuleUsecase = getUserRoleModuleUsecaseFactory({
    getListDB
})
let createUserRoleUsecase = createUserRoleUsecaseFactory({
    userRoleEntity,
    inserManyDB,
    inserOneDB
})
let updateUserRoleModuleUsecase = updateUserRoleModuleUsecaseFactory({
    deleteManyDB,
    inserManyDB
})
export {
    createUserRoleUsecase,
    getUserRoleModuleUsecase,
    getUserRoleUsecase,
    updateUserRoleModuleUsecase
}