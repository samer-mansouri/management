import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import TokenService from 'services/token.service'

import { logoutUser } from "../../store/actions"

const Logout = props => {
  useEffect(() => {
    TokenService.removeUser();
    props.logoutUser(props.history)
  })

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
  logoutUser: PropTypes.func
}

export default withRouter(connect(null, { logoutUser })(Logout))
