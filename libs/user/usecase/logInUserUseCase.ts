import {
    compareHashAndText,
    jwtSignIn
} from '../../core/helpers'
import errHandler from '../../core/helpers/errHandler'
import {
    STR_COMMON_DB_TENANT_ID
} from '../../common/constants'
export default function logInUserUseCaseFactory({
    getUserDetailsDb
}) {
    return async function logInUserUseCase({
        source,
        body: objUserBody
    }) {
        if ((objUserBody["strName"] || objUserBody["strMobileNo"]) && !objUserBody["strPassword"]) {
            throw new errHandler("CREDENTIAL_MISSING")
        }
        let objUser = await getUserDetailsDb({
            strName: objUserBody["strName"] || null,
            strMobileNo: objUserBody["strMobileNo"] || null
        })
        let strToken = ""
        if (await compareHashAndText(objUserBody["strPassword"], objUser["strHashPassword"])) {
            strToken = await jwtSignIn({
                "strUserId": objUser["_id"].toString(),
                "strUserRole": objUser["strUserRole"]
            }, {
                issuer: "ABDU",
                subject: "123",
                audience: STR_COMMON_DB_TENANT_ID
            })
            delete objUser["strHashPassword"];
        } else {
            throw new errHandler("CREDENTIAL_INVALID")
        }
        return {
            "strUserToken": strToken,
            ...objUser,
        }
    }
}