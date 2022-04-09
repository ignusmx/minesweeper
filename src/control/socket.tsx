import React                         from "react"
import * as types                    from "./actionTypes"
import {messageReceived, addMessage} from "./actions"
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'

const setupSocket = (dispatch : any)=>
{
	const socket = new WebSocket("wss://hometask.eg1236.com/game1/")
	const difficultyColors = ["#5bf23d","#f2ef3d","#f2913d","#f2493d"]
	const numberColors = ["#000000","#0000FF", "#448a0f", "#FF0000"];

	socket.onopen = () =>
	{
		dispatch
		(
			messageReceived
			(
				{
					content     : "start",
					interaction : socket
				}
			)
		)
	}

	socket.onmessage = (event) =>
	{
		dispatch
		(
			messageReceived
			(
				{
					content     : event.data,
					interaction : socket
				}
			)
		)

		if(event.data == "new: OK" || event.data.indexOf("open") == 0)
		{
			socket.send("map");
		}
	}

	return socket
}

export default setupSocket