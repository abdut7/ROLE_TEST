import {
    createUserDbFactory,
    getListUserDBFactory,
    updateUserDbFactory,
    getUserDetailsDbFactory
} from './userDB'
let createUserDb = createUserDbFactory()
let getUserDetailsDb = getUserDetailsDbFactory()
let getListUserDB = getListUserDBFactory()
let updateUserDb=updateUserDbFactory()
export {
    createUserDb,
    updateUserDb,
    getUserDetailsDb,
    getListUserDB
}