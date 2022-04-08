import React                         from "react"
import * as types                    from "./actionTypes"
import {messageReceived, addMessage} from "./actions"

const setupSocket = (dispatch : any)=>
{
	const socket = new WebSocket("wss://hometask.eg1236.com/game1/")

	socket.onopen = () =>
	{
		dispatch
		(
			messageReceived
			(
				<div>
					<span>
						Difficulty Level
					</span>
					<div>
						{
							[1, 2, 3, 4].map
							(
								(level)=>
									<button key={"lb" + level} style={{width : 100,height : 100}} onClick={()=>socket.send("new " + level)}>
										<h1>
											{level}
										</h1>
									</button>
							)
						}
					</div>
				</div>
			)
		)
	}

	socket.onmessage = (event) =>
	{
		console.log(event);

		if(event.data == "new: OK" || event.data.indexOf("open") == 0)
		{
			socket.send("map");
		}
		else
		{
			if(event.data.indexOf("map:") == 0)
			{
				let gameOver = event.data.indexOf("*") >= 0;

				let rows = event.data.split("\n");

				rows.shift();

				let map                 = [];
				let atLeastOneUntouched = false;

				for(let i = 0; i < rows.length; i++)
				{
					let row = [];

					for(let j = 0; j < rows[i].length; j++)
					{
						if(!atLeastOneUntouched && rows[i].charAt(j) == "□")
						{
							atLeastOneUntouched = true;
						}

						row.push
						(
							<td key={"c" + i + "_" + j}>
								{
									rows[i].charAt(j) == "□"
											?
										<button style={{width : 25, height : 25}} onClick={()=>socket.send("open "+ j + " " + i)}
										  disabled={gameOver}
										>
										</button>
											:
										<div style={{width : 25, height : 25}}>
											{rows[i].charAt(j)}
										</div>
								}
							</td>
						);
					}

					map.push(<tr key={"r" + i}>{row}</tr>);
				}

				dispatch
				(
					messageReceived
					(
						<div>
							<table>
								<tbody>
									{map}
								</tbody>
							</table>
							{gameOver && <div>You lose</div>}
						</div>
					)
				)
			}
		}
	  }

	  return socket
}

export default setupSocket
