import React        from "react"
import PropTypes    from "prop-types"
import Message      from "./message"
import {addMessage} from "./../control/actions"

const Board = ({messages} : any)=>
{
	console.log(messages);

	return <section id="display">
		<Message{...messages[messages.length - 1]}/>
	</section>
}

Board.propTypes=
{
	messages : PropTypes.arrayOf
	(
		PropTypes.shape
		({
			id       : PropTypes.number.isRequired,
			message  : PropTypes.any,
		}).isRequired
	).isRequired
}

export default Board
