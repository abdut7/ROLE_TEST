import {
    createUserDb,
    getUserDetailsDb,
} from '../db'
import {
    userEntity
} from '../entity'
import {
    deleteDB,
    getListDB,
    inserOneDB
} from '../../common/DB'
import createUserUsecaseFactory from './createUserUsecase'
import getUserUsecaseFactory from './getUserUsecase'
import logInUserUseCaseFactory from './logInUserUseCase'
import deleteUserUsecaseFactory from './deleteUserUsecase'
let createUserUsecase = createUserUsecaseFactory({
    createUserDb,
    userEntity
})
let getUserUsecase=getUserUsecaseFactory({getListDB})
let logInUserUseCase = logInUserUseCaseFactory({
    getUserDetailsDb
})
let deleteUserUsecase = deleteUserUsecaseFactory({
    deleteDB
})
export {
    createUserUsecase,
    logInUserUseCase,
    getUserUsecase,
    deleteUserUsecase
}