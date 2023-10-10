import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {RiPlayListAddFill} from 'react-icons/ri'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import UserDetails from '../../context/UserDetails'
import './index.css'

class Header extends Component {
  state = {mobileClick: false}

  onClickList = () => {
    this.setState({mobileClick: true})
  }

  onCloseClick = () => {
    this.setState({mobileClick: false})
  }

  render() {
    const {mobileClick} = this.state

    return (
      <UserDetails.Consumer>
        {value => {
          const {activeTab, onChangeTab} = value

          const onClickHome = () => {
            onChangeTab('Home')
          }
          const onClickPopular = () => {
            onChangeTab('Popular')
          }
          const onClickAccount = () => {
            onChangeTab('Account')
          }
          const onClickSearch = () => {
            onChangeTab('Search')
          }
          return (
            <nav className="nav-container">
              <div className="desktop-container">
                <Link to="/" className="link">
                  <img
                    src="https://res.cloudinary.com/dv0wkaiuj/image/upload/v1696237436/Group_7399_egstvr.png"
                    alt="website logo"
                    className="website-logo"
                  />
                </Link>
                <div className="desktop-min-container">
                  <ul className="desktop-ul-list">
                    <Link to="/" className="link">
                      <li
                        className={
                          activeTab === 'Home'
                            ? 'desktop-list-select'
                            : 'desktop-list'
                        }
                        onClick={onClickHome}
                      >
                        Home
                      </li>
                    </Link>
                    <Link to="/popular" className="link">
                      <li
                        className={
                          activeTab === 'Popular'
                            ? 'desktop-list-select'
                            : 'desktop-list'
                        }
                        onClick={onClickPopular}
                      >
                        Popular
                      </li>
                    </Link>
                  </ul>
                </div>
                <div className="desktop-right-container">
                  <Link to="/search" className="link">
                    <HiOutlineSearch
                      size={30}
                      color="#ffffff"
                      className={
                        activeTab === 'Search' ? 'icon-select' : 'icon'
                      }
                      onClick={onClickSearch}
                    />
                  </Link>
                  <Link to="/account" className="link">
                    <img
                      src="https://res.cloudinary.com/dv0wkaiuj/image/upload/v1696237401/Avatar_rnsvpf.png"
                      alt="profile"
                      className={
                        activeTab === 'Account'
                          ? 'account-image-image-select'
                          : 'account-image-image '
                      }
                      onClick={onClickAccount}
                    />
                  </Link>
                </div>
              </div>
              <div className="mobile-container">
                <div className="mobile-container-nav">
                  <Link to="/" className="link">
                    <img
                      src="https://res.cloudinary.com/dv0wkaiuj/image/upload/v1696237436/Group_7399_egstvr.png"
                      alt="website logo"
                      className="mobile-logo"
                    />
                  </Link>
                  <div className="mobile-ul-list">
                    <Link to="/search" className="link">
                      <HiOutlineSearch
                        size={25}
                        color="#ffffff"
                        className={
                          activeTab === 'Search' ? 'icon-select' : 'icon'
                        }
                        onClick={onClickSearch}
                      />
                    </Link>
                    <button
                      className="header-button"
                      type="button"
                      onClick={this.onClickList}
                    >
                      <RiPlayListAddFill
                        size={23}
                        color="#ffffff"
                        className="iconValue"
                      />
                    </button>
                  </div>
                </div>
                {mobileClick && (
                  <ul className="mobile-ul-list">
                    <Link to="/" className="link">
                      <li
                        className={
                          activeTab === 'Home'
                            ? 'desktop-list-select'
                            : 'desktop-list'
                        }
                        onClick={onClickHome}
                      >
                        Home
                      </li>
                    </Link>
                    <Link to="/popular" className="link">
                      <li
                        className={
                          activeTab === 'Popular'
                            ? 'desktop-list-select'
                            : 'desktop-list'
                        }
                        onClick={onClickPopular}
                      >
                        Popular
                      </li>
                    </Link>
                    <Link to="/account" className="link">
                      <li
                        className={
                          activeTab === 'Account'
                            ? 'desktop-list-select'
                            : 'desktop-list'
                        }
                        onClick={onClickAccount}
                      >
                        Account
                      </li>
                    </Link>
                    <button
                      className="header-button"
                      type="button"
                      onClick={this.onCloseClick}
                    >
                      <AiOutlineCloseCircle size={27} color="#fff" />
                    </button>
                  </ul>
                )}
              </div>
            </nav>
          )
        }}
      </UserDetails.Consumer>
    )
  }
}
export default Header
