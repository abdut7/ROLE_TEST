import errHandler from '../../core/helpers/errHandler'
import {
    getOneDB
} from '../../common/DB'
import {
    hashString
} from '../../core/helpers'
import {
    ObjectID
} from 'mongodb'

export function userEntityFactory() {
    return async function userEntity({
        strName,
        strMobileNo,
        strPassword,
        strUserRole,
        strCreatedTime,
        strCreatedUser
    }) {
        try {
            let objErrorHandler = new errHandler();
            if (!strName )
                objErrorHandler.add("NAME_EMPTY")
            if (!strPassword)
                objErrorHandler.add("PASSWORD_ERROR")
            if (objErrorHandler.isError) throw objErrorHandler;
            //validate user role exists
            else {
                if (objErrorHandler.isError) throw objErrorHandler;
                let strHashPassword = await hashString(strPassword.trim())
                return {
                    objUser: {
                        strName,
                        strMobileNo,
                        strHashPassword,
                        strUserRole,
                        "chrStatus": "N",
                        strCreatedTime: strCreatedTime || null,
                        strCreatedUser: new ObjectID(strCreatedUser) || null,
                    }
                }
            }
        } catch (error) {
            throw new errHandler(error)
        }
    }
}


export function userUpdateEntityFactory() {
    return async function userUpdateEntity({
        strName,
        strMobileNo,
        strPassword,
        strUserRole,
        strCreatedTime,
        strCreatedUser
    }) {
        try {
            let objErrorHandler = new errHandler();
            if (!strName )
                objErrorHandler.add("NAME_EMPTY")
            if (!strPassword)
                objErrorHandler.add("PASSWORD_ERROR")
            if (objErrorHandler.isError) throw objErrorHandler;
            //validate user role exists
            else {
                if (objErrorHandler.isError) throw objErrorHandler;
                let strHashPassword = await hashString(strPassword.trim())
                return {
                    objUser: {
                        strName,
                        strMobileNo,
                        strHashPassword,
                        strUserRole,
                        "chrStatus": "N",
                        strCreatedTime: strCreatedTime || null,
                        strCreatedUser: new ObjectID(strCreatedUser) || null,
                    }
                }
            }
        } catch (error) {
            throw new errHandler(error)
        }
    }
}

