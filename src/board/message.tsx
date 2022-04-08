import React     from "react"
import PropTypes from "prop-types"

const Message = (message : any) => (<div>{message}</div>)

Message.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

export default Message
