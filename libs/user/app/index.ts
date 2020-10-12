import {
    createUserControllerFactory,
    logInUserControllerFactory,
    getListUserControllerFactory,
    deleteUserControllerFactory,
} from './userCotroller'
import {
    createUserUsecase,
    logInUserUseCase,
    getUserUsecase,
    deleteUserUsecase
} from '../usecase'
let createUserController = createUserControllerFactory({
    createUserUsecase
})
let logInUserController = logInUserControllerFactory({
    logInUserUseCase
})
let deleteUserController = deleteUserControllerFactory({
    deleteUserUsecase
})
let getListUserController=getListUserControllerFactory({getUserUsecase})
export {
    createUserController,
    logInUserController,
    getListUserController,
    deleteUserController
}