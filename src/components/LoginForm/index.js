import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import UserDetails from '../../context/UserDetails'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showError: false, msgError: ''}

  onChangeUserInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onFailureForm = error => {
    console.log(error)
    this.setState({showError: true, msgError: error})
  }

  onSuccessForm = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const loginApi = 'https://apis.ccbp.in/login'

    const response = await fetch(loginApi, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSuccessForm(data.jwt_token)
    } else {
      this.onFailureForm(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, msgError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <UserDetails.Consumer>
        {value => {
          const {onEnterUserDetails} = value

          return (
            <div className="login-container">
              <img
                src="https://res.cloudinary.com/dv0wkaiuj/image/upload/v1696237436/Group_7399_egstvr.png"
                alt="login website logo"
                className="website-logo"
              />
              <div className="login-from">
                <h1 className="login">Login</h1>
                <form onSubmit={this.onSubmitForm} className="from-container">
                  <label className="label" htmlFor="username">
                    USERNAME
                  </label>
                  <input
                    className="input"
                    id="username"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={this.onChangeUserInput}
                  />
                  <label className="label" htmlFor="password">
                    PASSWORD
                  </label>
                  <input
                    id="password"
                    className="input"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={this.onChangePasswordInput}
                  />
                  {showError && <p className="error">{msgError}</p>}
                  <button className="login-button" type="submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          )
        }}
      </UserDetails.Consumer>
    )
  }
}
export default LoginForm
