
import errHandler from '../../core/helpers/errHandler'
export default function updateUserUsecaseFactory({
    inserOneDB,
    userEntity
}) {
    return async function updateUserUsecase({
        source,
        body: objUserBodyData
    }) {
        try {
          //insert user 
        } catch (error) {
            throw new errHandler(error)
        }
    }
}