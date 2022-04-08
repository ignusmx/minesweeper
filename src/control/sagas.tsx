import { takeEvery } from "redux-saga/effects"
import * as types    from "./actionTypes"

const handleNewMessage = function* handleNewMessage(params : any)
{
	yield takeEvery(types.ADD_MESSAGE, (action : any) =>{params.socket.send(JSON.stringify(action))})
}

export default handleNewMessage
