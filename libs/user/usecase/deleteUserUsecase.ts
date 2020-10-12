import {
    CLN_USER,
    STR_COMMON_DB_TENANT_ID
} from './../../common/constants';
import errHandler from '../../core/helpers/errHandler'
import {
    ObjectID
} from 'mongodb'
export default function deleteUserUsecaseFactory({
    deleteDB
}) {
    return async function deleteUserUsecase({
        source,
        body: objUserBodyData
    }) {
        try {
            let arrDeleteId = []
            objUserBodyData["arrDeleteId"].forEach(strId => {
                arrDeleteId.push(new ObjectID(strId))
            });
            await deleteDB({
                arrDeleteId,
                strCollection: CLN_USER,
                strModifiedTime: source["timReceived"],
                strModifiedUser: source["strUserId"]
            })
            return {
                "strMessage": "DELETE_SUCCESS"
            }
        } catch (error) {
            throw new errHandler(error)
        }
    }
}