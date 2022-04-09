import React           from "react"
import PropTypes       from "prop-types"
import Message         from "./message"
import Fab             from "@mui/material/Fab"
import Grid            from "@mui/material/Grid"
import CoronavirusIcon from '@mui/icons-material/Coronavirus';

const Board = ({messages} : any)=>
{
	const lastOne          = messages.length -1;
	const mapped           = messages.length -2;
	const difficultyColors = ["#5bf23d","#f2ef3d","#f2913d","#f2493d"]
	const numberColors     = ["#000000","#0000FF", "#448a0f", "#FF0000"];

	if(lastOne < 0)
	{
		return <br />
	}
	else
	{
		console.log(messages);

		const lastMessage = messages[lastOne].message

		if(lastMessage.content == "start")
		{
			return <div>
					<Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{minHeight : "100vh"}}>
						<div className="css-3d-text">
							MINESWEEPER
						</div>
						<h1>
							CHOOSE A DIFFICULTY LEVEL
						</h1>
						<div>
							{
								[1, 2, 3, 4].map
								(
									(level)=>
										<Fab size="large" color="primary" key={"lb" + level}
										  style={{backgroundColor : difficultyColors[level-1], margin:5}}
										  onClick={() => lastMessage.interaction.send("new " + level)}
										>
												{level}
										</Fab>
								)
							}
						</div>
					</Grid>
				</div>
		}
		else
		{
			const mappedMessage = messages[mapped].message;

			if(lastMessage.content.indexOf("map:") == 0)
			{
				let gameOver = mappedMessage.content != "open: OK";
				let endText  = mappedMessage.content.split("open: ")[1];
				let rows     = lastMessage.content.split("\n");

				rows.shift();

				let map                 = [];

				for(let i = 0; i < rows.length; i++)
				{
					let row = [];

					for(let j = 0; j < rows[i].length; j++)
					{
						row.push
						(
							<td key={"c" + i + "_" + j}>
								{
									rows[i].charAt(j) == "□"
											?
										<button className="cellButton" onClick={()=>lastMessage.interaction.send("open "+ j + " " + i)}
										  disabled={gameOver}
										>
										</button>
											:
										<button className="pickedCell" style={{color:numberColors[rows[i].charAt(j)]}}>
											<strong>{rows[i].charAt(j) == 0 ? "" : (rows[i].charAt(j) == "*" ? <CoronavirusIcon /> : rows[i].charAt(j))}</strong>
										</button>
								}
							</td>
						);
					}

					map.push(<tr key={"r" + i}>{row}</tr>);
				}

				return <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center"
						  style={{ minHeight: '100vh' }}
						>
							<table className="mineTable">
								<tbody>
									{map}
								</tbody>
							</table>
							{
								gameOver &&
								<div style={{position : "absolute", background : "rgba(0, 0, 0, 0.5)", textAlign : "center", width :"100%", height : "100%"}}>
									<div style={{position : "relative", top: "calc(50vh - 79px)"}}>
										<div style={{color : "#FFFFFF"}}>
											{endText}
										</div>
										<h1 style={{color : "#FFFFFF"}}>
											START OVER
										</h1>
										<div>
											{
												[1, 2, 3, 4].map
												(
													(level)=>
														<Fab size="large" color="primary" key={"lb" + level}
														  style={{backgroundColor : difficultyColors[level-1], margin:5}}
														  onClick={() => lastMessage.interaction.send("new " + level)}
														>
																{level}
														</Fab>
												)
											}
										</div>
									</div>
								</div>
							}
						</Grid>
			}
			else
			{
				let gameOver = mappedMessage.content.indexOf("*") >= 0;
				let rows     = mappedMessage.content.split("\n");

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
										<button className="cellButton" onClick={()=>mappedMessage.interaction.send("open "+ j + " " + i)}
										  disabled={gameOver}
										>
										</button>
											:
										<button className="pickedCell" style={{color:numberColors[rows[i].charAt(j)]}}>
											<strong>{rows[i].charAt(j) == 0 ? "" : (rows[i].charAt(j) == "*" ? <CoronavirusIcon /> : rows[i].charAt(j))}</strong>
										</button>
								}
							</td>
						);
					}

					map.push(<tr key={"r" + i}>{row}</tr>);
				}

				return <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center"
						  style={{ minHeight: '100vh' }}
						>
							<table className="mineTable">
								<tbody>
									{map}
								</tbody>
							</table>
							{gameOver && <div>You lose</div>}
						</Grid>
			}
		}
	}
}

export default Board
