import React                         from "react"
import * as types                    from "./actionTypes"
import {messageReceived, addMessage} from "./actions"
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'

const setupSocket = (dispatch : any)=>
{
	const socket = new WebSocket("wss://hometask.eg1236.com/game1/")
	const difficultyColors = ["#5bf23d","#f2ef3d","#f2913d","#f2493d"]

	socket.onopen = () =>
	{
		dispatch
		(
			messageReceived
			(
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					style={{ minHeight: '100vh' }}
					>
					<div className="css-3d-text">MINESWEEPER</div>
					<h1>CHOOSE A DIFFICULTY LEVEL</h1>
					<div>
						{
							[1, 2, 3, 4].map
							(
								(level)=>
									<Fab size="large" color="primary" key={"lb" + level} style={{backgroundColor : difficultyColors[level-1], margin:5}} onClick={()=>socket.send("new " + level)}>
											{level}
									</Fab>
							)
						}
					</div>
				</Grid>
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