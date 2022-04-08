import {connect}      from "react-redux"
import BoardComponent from "./board"

export const Board = connect(state => ({messages: state.messages}), {})(BoardComponent)
