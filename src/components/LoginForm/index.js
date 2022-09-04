import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errMsg: ''}

  onSubmitForm = event => {
    event.preventDefault()
    this.doApiCall()
  }

  doApiCall = async () => {
    const {username, password} = this.state
    const User = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(User),
    }
    const response = await fetch(url, options)
    const responseJson = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', responseJson.jwt_token, {expires: 30})
      const {history} = this.props

      history.replace('/')
    } else {
      this.setState({errMsg: responseJson.error_msg})
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtTOken = Cookies.get('jwt_token')
    if (jwtTOken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, errMsg} = this.state
    return (
      <div className="Login-Form-Container">
        <form onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="inputAndLabelContainer">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="login-input"
              onChange={this.onChangeUserName}
              value={username}
            />
          </div>
          <div className="inputAndLabelContainer">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="login-input"
              onChange={this.onChangePassword}
              value={password}
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
          {errMsg !== '' && <p className="error-message-para">*{errMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
