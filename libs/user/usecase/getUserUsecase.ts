import errHandler from '../../core/helpers/errHandler'
import {
    CLN_USER
} from '../../common/constants'
export default function getUserUsecaseFactory({
    getListDB
}) {
    return async function getUserUsecase({
        source,
        body: objUserBodyData
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
            if (objUserBodyData["strSort"]) {
                let objSort = {
                    $sort: {
                        [objUserBodyData["strSort"]]: objUserBodyData["strSortActive"] == "ASC" ? 1 : -1
                    }
                }
                arrQuery.push(objSort)
            }
            //Pagination
            let intSkip = Number(objUserBodyData["intPageNo"]) * Number((objUserBodyData["intLimit"] && objUserBodyData["intLimit"] != "") ? objUserBodyData["intLimit"] : 20)
            let intLimit = (objUserBodyData["intLimit"] && objUserBodyData["intLimit"] != "") ? objUserBodyData["intLimit"] : 20
            await arrQuery.push({
                $limit: Number(intLimit),
            })
            await arrQuery.push({
                $skip: intSkip || 0
            })

            let arrList = await getListDB({
                strCollection: CLN_USER,
                arrQuery
            })
            return {
                arrList,
                intLimit,
                intPageNo: objUserBodyData["intPageNo"] || 0,
                ...objUserBodyData
            }
        } catch (error) {
            throw new errHandler(error)
        }
    }
}