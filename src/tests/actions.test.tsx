import {addMessage} from "./../control/actions"
import * as types   from "./../control/actionTypes"

describe
(
	"adding a message",
	()=>
	{
		it
		(
			"should create an action to add a message with id 0",
			()=>
			{
				const message = "Something"

				const action=
				{
					type : types.ADD_MESSAGE,
					id   : 0,
					message
				}
				expect(addMessage(message)).toEqual(action)
			}
		)
	}
)

describe
(
	"adding a second message",
	()=>
	{
		it
		(
			"should create an action to add a message with id 1",
			()=>
			{
				const message = "Something"

				const action=
				{
					type : types.ADD_MESSAGE,
					id   : 1,
					message
				}

				expect(addMessage(message)).toEqual(action)
			}
		)
	}
)
