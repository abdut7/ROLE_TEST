import errHandler from '../../core/helpers/errHandler'
export default function deleteUserRoleUsecaseFactory({
    inserOneDB,
    userEntity
}) {
    return async function deleteUserRoleUsecase({
        source,
        body: objUserRoleBodyData
    }) {
        try {
          //check user exists in it
          //delete user role
          //delete all moules of this role
        } catch (error) {
            throw new errHandler(error)
        }
    }
}