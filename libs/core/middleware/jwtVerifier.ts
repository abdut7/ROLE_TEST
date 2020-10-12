import {
    jwtVerify,
    getRedisData,
    decryptString
} from "../helpers";
import {
    STR_COMMON_DB_TENANT_ID
} from '../../common/constants'
import errHandler from "../helpers/errHandler";
export async function jwtTokenChecking(req, res, next) {
    let objResponceType = {
        "Content-Type": "application/json",
        "Last-Modified":  new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
    };
    try {
        // Express headers are auto converted to lowercase
        let strEncryptedToken = await req.headers["x-access-token"] || req.headers["authorization"];
        //Decrypt Token
        if (strEncryptedToken) {
            let strToken = strEncryptedToken
            req["strToken"] = strToken
                let objOption = {
                    issuer: "ABDU",
                    subject: "123",
                    audience: STR_COMMON_DB_TENANT_ID
                }
                //Verify token
                let objTokenDecoded = await jwtVerify(strToken, objOption)
                req["strUserId"] = objTokenDecoded["strUserId"]
                req["strUserRole"] = objTokenDecoded["strUserRole"];
                next()
        } else {
            return res
                .status(401)
                .set(objResponceType)
                .send(
                    new errHandler("AUTHORIZATION_TOKEN_HEADER_IS_MISSING").send().body
                );
        }
    } catch (error) {
        return res
            .status(401)
            .set(objResponceType)
            .send(new errHandler(error).send().body);
    }
}