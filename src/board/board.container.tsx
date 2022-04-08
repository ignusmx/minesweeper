import {connect}      from "react-redux"
import BoardComponent from "./board"
import {addMessage}   from "./../control/actions"

const mapDispatchToProps = (dispatch : any) =>
({
	dispatch : (message : any) => {dispatch(addMessage(message))}
})

export const Board = connect((state : any) => ({messages : state.messages}), mapDispatchToProps)(BoardComponent)
