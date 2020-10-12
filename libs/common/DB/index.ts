import {
    inserManyDBFactory,
    inserOneDBFactory,
    deleteDBFactory,
    getListDBFactory,
    getOneDBFactory,
    updateOneDBFactory,
    deleteManyDBFactory,
    getRolePermissionFactory
} from './commonOperationDB'
let inserManyDB = inserManyDBFactory()
let inserOneDB=inserOneDBFactory()
let getListDB = getListDBFactory()
let getOneDB = getOneDBFactory()
let deleteDB=deleteDBFactory()
let updateOneDB=updateOneDBFactory()
let deleteManyDB=deleteManyDBFactory()
let getRolePermission=getRolePermissionFactory()
export {
    inserManyDB,
    inserOneDB,
    getListDB,
    getOneDB,
    deleteDB,
    updateOneDB,
    getRolePermission,
    deleteManyDB
}