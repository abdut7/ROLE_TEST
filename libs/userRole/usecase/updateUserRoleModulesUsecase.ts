import {
    CLN_ROLE_PERMISSION
} from './../../common/constants';
import errHandler from '../../core/helpers/errHandler'
export default function updateUserRoleModuleUsecaseFactory({
    deleteManyDB,
    inserManyDB
}) {
    return async function updateUserRoleModuleUsecase({
        source,
        body: objUserRoleBodyData
    }) {
        try {
            if (!objUserRoleBodyData["strRoleName"])
                throw new errHandler("ROLE NAME INVALID")
            else if (objUserRoleBodyData["strRoleName"] == "ADMIN")
                throw new errHandler("CAN'T UPDATE ADMIN ROLE")
            if (!objUserRoleBodyData["arrModule"])
                throw new errHandler("MODULE LIST INVALID")
            //delete all old modules of role
            await deleteManyDB({
                strCollection: CLN_ROLE_PERMISSION,
                objQuery: {
                    strRoleName: objUserRoleBodyData["strRoleName"]
                }
            })
            //insert new modules list
            await inserManyDB({
                strCollection: CLN_ROLE_PERMISSION,
                arrInsertDocuments: objUserRoleBodyData["arrModule"]
            })
            return {
                strMessage: "Success"
            }
        } catch (error) {
            throw new errHandler(error)
        }
    }
}