import React           from "react"
import PropTypes       from "prop-types"
import Message         from "./message"
import Fab             from "@mui/material/Fab"
import Grid            from "@mui/material/Grid"
import CoronavirusIcon from "@mui/icons-material/Coronavirus"

const Board = ({messages} : any)=>
{
	const lastOne          = messages.length -1
	const mapped           = messages.length -2
	const difficultyColors = ["#5BF23d","#F2EF3D", "#F2913D", "#F2493D"]
	const numberColors     = ["#000000","#0000FF", "#448a0f", "#FF0000"]

	if(lastOne < 0)
	{
		return <br />
	}
	else
	{
		console.log(messages);

		const lastMessage     = messages[lastOne].message
		const difficultySelect=
		<div>
			<h1>
				CHOOSE A DIFFICULTY LEVEL
			</h1>
			<div style={{textAlign : "center"}}>
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

		if(lastMessage.content == "start")
		{
			return <div>
					<Grid spacing={0} direction="column" alignItems="center" justifyContent="center" style={{minHeight : "100vh"}}
					  container
					>
						<div className="css-3d-text">
							MINESWEEPER
						</div>
						{difficultySelect}
					</Grid>
				</div>
		}
		else
		{
			const mappedMessage = messages[mapped].message;
			let   rows;
			let   gameOver;
			let   endText;

			if(lastMessage.content.indexOf("map:") == 0)
			{
				gameOver = mappedMessage.content != "open: OK" && mappedMessage.content != "new: OK";
				endText  = mappedMessage.content.split("open: ")[1];
				rows     = lastMessage.content.split("\n");
			}
			else
			{
				gameOver = false;
				endText  = "";
				rows     = mappedMessage.content.split("\n");
			}

			rows.shift();

			let map = [];

			for(let i = 0; i < rows.length; i++)
			{
				let row = [];
				let buttonClass
				let buttonClick
				let buttonSymbol
				let buttonStyle

				for(let j = 0; j < rows[i].length; j++)
				{
					if(rows[i].charAt(j) == "□")
					{
						buttonClass  = "cellButton"
						buttonClick  = () => lastMessage.interaction.send("open "+ j + " " + i)
					}
					else
					{
						buttonClass  = "bold pickedCell"
						buttonClick  = () => false
					}

					switch(rows[i].charAt(j))
					{
						case "□": case "0":
							buttonSymbol = ""
							buttonStyle  = {}
						break
						case "*":
							buttonSymbol = <CoronavirusIcon />
							buttonStyle  = {}
						break 
						default:
							buttonSymbol = rows[i].charAt(j)
							buttonStyle  = {color : numberColors[rows[i].charAt(j)]}
						break
					}

					row.push
					(
						<td key={"c" + i + "_" + j}>
							{
								<button className={buttonClass} onClick={buttonClick} disabled={gameOver} style={buttonStyle}>
									{buttonSymbol}
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
							<div style={{position : "fixed", zIndex : 1, background : "rgba(0, 0, 0, 0.5)", textAlign : "center", width :"100%", height : "100%", top : 0}}>
								<div style={{position : "relative", top: "calc(50vh - 106px)", color : "#FFFFFF"}}>
									<div>
										{endText}
									</div>
									<h1>
										START OVER?
									</h1>
									{difficultySelect}
								</div>
							</div>
						}
					</Grid>
		}
	}
}

export default Board
