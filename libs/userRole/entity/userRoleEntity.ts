import errHandler from '../../core/helpers/errHandler'
import {
    getOneDB
} from '../../common/DB'
import {
    ObjectID
} from 'mongodb'
export function userRoleEntityFactory() {
    return async function userRoleEntity({
        strRoleName,
        strCreatedTime,
        strCreatedUser
    }) {
        try {
            let objErrorHandler = new errHandler();
            //TODO check Already Exists
            if (!strRoleName)
                objErrorHandler.add("NAME_LENGTH_LESS")
            if (objErrorHandler.isError) throw objErrorHandler;
            else {
                return {
                    strRoleName,
                    objUserRole: {
                        strRoleName,
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