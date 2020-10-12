import {
    CLN_ROLE_PERMISSION
} from './../../common/constants';
import errHandler from '../../core/helpers/errHandler'
export default function getUserRoleModuleUsecaseFactory({
    getListDB
}) {
    return async function getUserRoleModuleUsecase({
        source,
        body: objUserRoleBodyData
    }) {
        try {
            //check user role name empty
            if (!objUserRoleBodyData["strRoleName"])
                throw new errHandler("INVALID USER MODULE")
            else {
                let objMatch = {
                    $and: []
                }
                objMatch["$and"].push({
                    "chrStatus": "N"
                })
                objMatch["$and"].push({
                    strRoleName: objUserRoleBodyData["strRoleName"]
                })
                let arrQuery = []
                arrQuery.push({
                    $match: objMatch
                })
                //get all rolemodules
                let arrList = await getListDB({
                    strCollection: CLN_ROLE_PERMISSION,
                    arrQuery
                })
                return {
                    ...objUserRoleBodyData,
                    arrList
                }
            }
        } catch (error) {
            throw new errHandler(error)
        }
    }
}