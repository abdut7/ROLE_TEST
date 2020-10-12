import errHandler from '../../core/helpers/errHandler'
import {
    CLN_USER_ROLE
} from '../../common/constants'
export default function getUserRoleUsecaseFactory({
    getListDB
}) {
    return async function getUserRoleUsecase({
        source,
        body: objUserRoleBodyData
    }) {
        try {
            //get all role
            let strUserId = source["strUserId"]
            let objMatch = {
                $and: []
            }
            objMatch["$and"].push({
                "chrStatus": "N"
            })
            let arrQuery = []
            arrQuery.push({
                $match: objMatch
            })
            //Sorting
            if (objUserRoleBodyData["strSort"]) {
                let objSort = {
                    $sort: {
                        [objUserRoleBodyData["strSort"]]: objUserRoleBodyData["strSortActive"] == "ASC" ? 1 : -1
                    }
                }
                arrQuery.push(objSort)
            }
            //Pagination
            let intSkip = Number(objUserRoleBodyData["intPageNo"]) * Number((objUserRoleBodyData["intLimit"] && objUserRoleBodyData["intLimit"] != "") ? objUserRoleBodyData["intLimit"] : 20)
            let intLimit = (objUserRoleBodyData["intLimit"] && objUserRoleBodyData["intLimit"] != "") ? objUserRoleBodyData["intLimit"] : 20
            await arrQuery.push({
                $limit: Number(intLimit) || 20,
            })
            await arrQuery.push({
                $skip: intSkip || 0
            })

            let arrList = await getListDB({
                strCollection: CLN_USER_ROLE,
                arrQuery
            })
            return {
                arrList,
                intLimit,
                intPageNo: objUserRoleBodyData["intPageNo"] || 0,
                ...objUserRoleBodyData
            }
        } catch (error) {
            throw new errHandler(error)
        }
    }
}