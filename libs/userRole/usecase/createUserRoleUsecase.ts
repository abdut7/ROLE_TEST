import errHandler from '../../core/helpers/errHandler'
import {
    CLN_USER_ROLE,
    CLN_ROLE_PERMISSION,
    arrModule
} from '../../common/constants'
export default function createUserRoleUsecaseFactory({
    inserOneDB,
    inserManyDB,
    userRoleEntity
}) {
    return async function createUserRoleUsecase({
        source,
        body: objUserRoleBodyData
    }) {
        try { //Create Role entity
            let objRoleEntity =await userRoleEntity({
                ...objUserRoleBodyData,
                strCreatedTime: source["timReceived"],
                strCreatedUser: source["strUserId"]
            })
            //insert user role
            await inserOneDB({
                objDocument: objRoleEntity["objUserRole"],
                strCollection: CLN_USER_ROLE
            })
            let arrRoleModules = []
            arrModule.forEach(objModule => {
                arrRoleModules.push({
                    strRoleName: objRoleEntity["strRoleName"],
                    ...objModule,
                    strCreatedTime: source["timReceived"],
                    strCreatedUser: source["strUserId"]
                })
            })
            //insert modules for user
            await inserManyDB({
                strCollection: CLN_ROLE_PERMISSION,
                arrInsertDocuments: arrRoleModules
            })
            return {
                strMessage: "Success"
            }
        } catch (error) {
            throw new errHandler(error)
        }
    }
}