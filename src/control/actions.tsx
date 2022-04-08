	import * as types from "./actionTypes"

let nextMessageId = 0

export const addMessage = (message : any)=>
({
	type : types.ADD_MESSAGE,
	id   : nextMessageId++,
	message
})

export const messageReceived = (message : any)=>
({
	type : types.MESSAGE_RECEIVED,
	id   : nextMessageId++,
	message
})
