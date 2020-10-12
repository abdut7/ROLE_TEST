import {
    getMongoDbConnection
} from '../../core/helpers'
import errHandler from '../../core/helpers/errHandler'

import {
    STR_COMMON_DB_TENANT_ID,
    CLN_USER
} from '../../common/constants'
import {
    ObjectID
} from 'mongodb'

export function createUserDbFactory() {
    return async function createUserDb({
        objUser
    }) {
        let objConnection = await getMongoDbConnection()
        try {
            await objConnection.collection(CLN_USER).insertOne(objUser)
            return {
                "strMessage": "Success"
            }
        } catch (error) {
            let objErrorFormate = {
                "strName": "USER NAME ALREADY EXIST",
                "strMobileNo": "MOBILE NUMBER ALREADY EXIST"
            }
            let objError = new errHandler()
            if (error["name"] == "MongoError") {
                if (error["code"] == "11000") {
                    if (error["keyValue"]["strName"])
                        objError.add(objErrorFormate["strName"])
                    if (error["keyValue"]["strMobileNo"])
                        objError.add(objErrorFormate["strMobileNo"])
                    if (objError.isError) throw objError;
                }
            }
            throw new errHandler(error)
        }
    }
}


export function updateUserDbFactory() {
    return async function updateUserDb({
        objQuery,
        objSetUser,
        strTenantId
    }) {
        let objConnection = await getMongoDbConnection()
        try {
            let objResult = await objConnection.collection(CLN_USER).findOneAndUpdate(objQuery, objSetUser)
            return objResult["value"]
        } catch (error) {
            let objErrorFormate = {
                "strName": "USER NAME ALREADY EXIST",
                "strMobileNo": "MOBILE NUMBER ALREADY EXIST",
                "strEmail": "EMAIL ALREADY EXIST"
            }
            let objError = new errHandler()
            if (error["name"] == "MongoError") {
                if (error["code"] == "11000") {
                    if (error["keyValue"]["strName"])
                        objError.add(objErrorFormate["strName"])
                    if (error["keyValue"]["strMobileNo"])
                        objError.add(objErrorFormate["strMobileNo"])
                    if (error["keyValue"]["strEmail"])
                        objError.add(objErrorFormate["strEmail"])
                    if (objError.isError) throw objError;
                }
            }
            throw new errHandler(error)
        }
    }
}
export function getListUserDBFactory() {
    return async function getListUserDB({
        strTenantId,
        arrQuery,
        strType
    }) {
        let objConnection = await getMongoDbConnection()
        try {
            let arrList = await objConnection.collection(CLN_USER).aggregate(arrQuery).toArray()
            //Remove Limit condition 
            if (!arrList.length) {
                return {
                    arrList,
                    objCount: [{
                        "intTotalCount": 0
                    }]
                }
            }
            arrQuery.pop()
            arrQuery.pop()
            arrQuery.push({
                $count: "intTotalCount"
            })
            let objCount = await objConnection.collection(CLN_USER).aggregate(arrQuery).toArray()
            return {
                arrList,
                objCount
            }
        } catch (error) {
            throw new errHandler(error)
        }
    }
}


export function getUserDetailsDbFactory() {
    return async function getUserDetailsDb({
        strName = null,
        strMobileNo = null,
        strUserPK = null
    }) {
        let objConnection = await getMongoDbConnection()
        try {
            let objQuery = {
                "chrStatus": "N"
            }
            if (strName)
                objQuery["strName"] = strName
            else if (strMobileNo)
                objQuery["strMobileNo"] = strMobileNo
            else if (strUserPK)
                objQuery["_id"] = new ObjectID(strUserPK)
            let objUser = {}
            objUser = await objConnection.collection(CLN_USER).findOne(objQuery)
            if (!objUser)
                throw new errHandler("INVALID_USER_NAME")
            return objUser
        } catch (error) {
            throw new errHandler(error)
        }
    }
}