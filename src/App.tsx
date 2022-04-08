import React   from "react"
import {Board} from "./board/board.container"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./App.css"

const App = ()=>
(
	<section id="main">
		<Board />
	</section>
)

export default App