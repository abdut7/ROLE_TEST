import {
    CLN_ROLE_PERMISSION
} from './../constants/objCollections';
import {
    getMongoDbConnection
} from '../../core/helpers'
import errHandler from '../../core/helpers/errHandler'
import {
    ObjectID
} from 'mongodb'
export function getListDBFactory() {
    return async function getListDB({
        strCollection,
        arrQuery
    }) {
        try {
            let objConnection = await getMongoDbConnection()
            return objConnection.collection(strCollection).aggregate(arrQuery).toArray()
        } catch (error) {
            throw new errHandler(error)
        }
    }
}
export function getOneDBFactory() {
    return async function getOneDB({
        strCollection,
        objSet = null,
        objQuery
    }) {
        try {
            let objConnection = await getMongoDbConnection()
            if (objSet) {
                let objResut = await objConnection.collection(strCollection).findOneAndUpdate(objQuery, {
                    $set: objSet
                })
                return objResut["value"]
            } else
                return objConnection.collection(strCollection).findOne(objQuery)
        } catch (error) {
            throw new errHandler(error)
        }
    }
}
export function inserManyDBFactory() {
    return async function inserManyDB({
        strCollection,
        arrInsertDocuments
    }) {
        try {
            let objConnection = await getMongoDbConnection()
            await objConnection.collection(strCollection).insertMany(arrInsertDocuments)
            return {
                "strMessage": "Success"
            }
        } catch (error) {
            throw new errHandler(error)
        }
    }
}
export function inserOneDBFactory() {
    return async function inserOneDB({
        strCollection,
        objDocument
    }) {
        try {
            let objConnection = await getMongoDbConnection()
            return objConnection.collection(strCollection).insertOne(objDocument)
        } catch (error) {
            throw new errHandler(error)
        }
    }
}

export function updateOneDBFactory() {
    return async function updateOneDB({
        strCollection,
        objQuery,
        objDocument
    }) {
        try {
            let objConnection = await getMongoDbConnection()
            await objConnection.collection(strCollection).updateOne(objQuery, {
                $set: objDocument
            })
            return {
                "strMessage": "UPDATE_SUCCESS"
            }
        } catch (error) {
            throw new errHandler(error)
        }
    }
}

export function deleteManyDBFactory() {
    return async function deleteManyDB({
        strCollection,
        objQuery
    }) {
        try {
            let objConnection = await getMongoDbConnection()
            await objConnection.collection(strCollection).deleteMany(objQuery)
            return {
                "strMessage": "UPDATE_SUCCESS"
            }
        } catch (error) {
            throw new errHandler(error)
        }
    }
}

export function getRolePermissionFactory() {
    return async function getRolePermission({
        strRoleName,
        strModule
    }) {
        try {
            let objConnection = await getMongoDbConnection()
            return objConnection.collection(CLN_ROLE_PERMISSION).findOne({
                "chrStatus": "N",
                strRoleName,
                "strName": strModule,
            })
        } catch (error) {
            throw new errHandler(error)
        }
    }
}

export function deleteDBFactory() {
    return async function deleteDB({
        strCollection,
        arrDeleteId,
        strModifiedTime,
        strModifiedUser
    }) {
        let objConnection = await getMongoDbConnection()
        try {
            let arrOldItem = await objConnection.collection(strCollection).find({
                "_id": {
                    $in: arrDeleteId
                }
            }).toArray()
            if (arrOldItem.length != arrDeleteId.length) {
                throw new errHandler("ITEM_MISMACTH")
            }
            // await objConnection.collection(strCollection).insertMany(arrOldItem)
            await objConnection.collection(strCollection).updateMany({
                "_id": {
                    $in: arrDeleteId
                }
            }, {
                $set: {
                    "chrStatus": "D",
                    strModifiedTime,
                    strModifiedUser
                }
            })
            return {}
        } catch (error) {
            throw new errHandler(error)
        }
    }
}