import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import UserDetails from '../../context/UserDetails'
import Header from '../Header'
import SocialMedia from '../SocialMedia'

import './index.css'

const AccountRoute = props => (
  <UserDetails>
    {value => {
      const {userEmails} = value

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }
      return (
        <div className="account-container" testid="account">
          <Header />
          <div className="account-details-container">
            <h1 className="account-heading">Account</h1>
            <hr className="hr-line" />
            <div className="account-row">
              <p className="member-ship">Member ship </p>
              <div className="account-col-container">
                <p className="email">${userEmails}@gmail.com</p>
                <p className="password">PASSWORD: **********</p>
              </div>
            </div>
            <hr className="hr-line" />
            <div className="account-row">
              <p className="member-ship">Plan details </p>
              <p className="priam">Premium </p>
              <p className="hd">Ultra HD</p>
            </div>
            <button className="logout" type="button" onClick={onClickLogout}>
              Logout
            </button>
          </div>
          <SocialMedia />
        </div>
      )
    }}
  </UserDetails>
)
export default withRouter(AccountRoute)
