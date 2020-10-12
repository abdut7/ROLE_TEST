import errHandler from '../../core/helpers/errHandler'
import {
    CLN_USER
} from '../../common/constants'
export default function createUserUsecaseFactory({
    createUserDb,
    userEntity
}) {
    return async function createUserUsecase({
        source,
        body: objUserBodyData
    }) {
        try {
            let objUserEntity = await userEntity({
                ...objUserBodyData,
                strCreatedTime: source["timReceived"],
                strCreatedUser: source["strUserId"]
            })
            //insert user 
            return createUserDb({
                objUser: objUserEntity["objUser"]
            })
        } catch (error) {
            throw new errHandler(error)
        }
    }
}