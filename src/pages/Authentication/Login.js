import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import React from "react"
import AuthService from '../../services/auth.service';

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link, Redirect } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError } from "../../store/actions"

// import images
import logoLightPng from "../../assets/images/logo-light.png"
import logoDark from "../../assets/images/logo-dark.png"

const Login = props => {
  // handleValidSubmit
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loggedIn, setLoggedIn] = React.useState(false)

  const handleSubmit = (event, values) => {
    event.preventDefault()
    console.log(values)
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    AuthService.login(formData)
      .then(res => {
        console.log(res)
        props.loginUser(values, props.history)
        setLoggedIn(true)
      })
      .catch(err => {
        console.log(err)
        //props.apiError(err)
      })
  }

  const handleValidSubmit = (event, values) => {
    props.loginUser(values, props.history)
  }

  if (loggedIn) {
    return <Redirect to="/dashboard" />
  } else {
    return (
      <React.Fragment>
        <MetaTags>
          <title>Login | Lexa - Responsive Bootstrap 5 Admin Dashboard</title>
        </MetaTags>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <CardBody className="pt-0">
                    <h3 className="text-center mt-5 mb-4">
                      <Link to="/" className="d-block auth-logo">
                        <img src={logoDark} alt="" height="30" className="auth-logo-dark" />
                        <img src={logoLightPng} alt="" height="30" className="auth-logo-light" />
                      </Link>
                    </h3>
                    <div className="p-3">
                      <h4 className="text-muted font-size-18 mb-1 text-center">Welcome Back !</h4>
                      <p className="text-muted text-center">Sign in to continue to Lexa.</p>
                      <AvForm
                        className="form-horizontal mt-4"
                        onValidSubmit={(e, v) => {
                          handleSubmit(e, v)
                        }}
                      >
                        {props.error && typeof props.error === "string" ? (
                          <Alert color="danger">{props.error}</Alert>
                        ) : null}
  
                        <div className="mb-3">
                          <AvField
                            name="email"
                            label="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                          />
                        </div>
  
                        <div className="mb-3">
                          <AvField
                            name="password"
                            label="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            required
                            placeholder="Enter Password"
                          />
                        </div>
  
                        <div className="mb-3 row mt-4">
                          <div className="col-6">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customControlInline"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>
                          <div className="col-6 text-end">
                            <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
                          </div>
                        </div>
                        <div className="form-group mb-0 row">
                          <div className="col-12 mt-4">
                            <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock"></i> Forgot your password?</Link>
                          </div>
                        </div>
  
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )}
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
}