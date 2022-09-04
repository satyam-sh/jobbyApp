import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {TiHomeOutline} from 'react-icons/ti'
import {BsBriefcase} from 'react-icons/bs'
import {BiExit} from 'react-icons/bi'
import './index.css'

const Header = props => {
  const LogoutUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav>
      <ul className="header-list-container">
        <Link to="/" className="header-logo-link">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo-header"
            />
          </li>
        </Link>
        <li className="sm-devices-icons-container">
          <Link to="/">
            <TiHomeOutline className="icons-sm" />
          </Link>
          <Link to="/jobs">
            <BsBriefcase className="icons-sm" />
          </Link>
        </li>

        <li className="exit-logo">
          <BiExit className="icons-sm" onClick={LogoutUser} />
        </li>

        <li>
          <div className="lg-devices">
            <Link to="/" className="link-item">
              <p>Home</p>
            </Link>
            <Link to="/jobs" className="link-item">
              <p>Jobs</p>
            </Link>
          </div>
        </li>
        <li>
          <button type="button" className="lg-device-btn" onClick={LogoutUser}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
