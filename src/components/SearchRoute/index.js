import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {RiPlayListAddFill} from 'react-icons/ri'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import UserDetails from '../../context/UserDetails'
import SearchInput from '../SearchInput'
import SimilarMoviesItem from '../SimilarMoviesItem'
import './index.css'

const apiStatusContext = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class SearchRoute extends Component {
  state = {
    mobileClick: false,
    searchValue: '',
    apiStatus: apiStatusContext.initial,
    searchDetails: [],
  }

  componentDidMount() {
    this.searchDisplay()
  }

  onClickList = () => {
    this.setState({mobileClick: true})
  }

  onCloseClick = () => {
    this.setState({mobileClick: false})
  }

  onSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  searchDisplay = async () => {
    const {searchValue} = this.state
    this.setState({apiStatus: apiStatusContext.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    console.log(searchValue)
    const api = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken} `,
      },
      method: 'GET',
    }

    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok) {
      const updateData = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      console.log(updateData)
      this.setState({
        apiStatus: apiStatusContext.success,
        searchDetails: updateData,
      })
    } else {
      this.setState({apiStatus: apiStatusContext.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.searchDisplay()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dv0wkaiuj/image/upload/v1696237417/Background-Complete_nug9sz.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        className="failure-button "
        type="button"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderSearchView = () => {
    const {searchDetails, searchValue} = this.state
    console.log(searchDetails)
    const len = searchDetails.length
    console.log(len)

    return (
      <>
        {len === 0 ? (
          <div className="no-video-container">
            <img
              src="https://res.cloudinary.com/dv0wkaiuj/image/upload/v1696237417/Background-Complete_nug9sz.png"
              alt="no movies"
              className="no-video-img"
            />
            <p className="no-video-text">
              Your search for {searchValue} did not find any matches.
            </p>
          </div>
        ) : (
          <ul className="search-video-list">
            {searchDetails.map(each => (
              <SimilarMoviesItem eachValue={each} key={each.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderViewDisplay = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContext.success:
        return this.renderSearchView()
      case apiStatusContext.failure:
        return this.renderFailureView()
      case apiStatusContext.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <UserDetails.Consumer>
        {value => {
          const {activeTab, onChangeTab} = value
          const {mobileClick, searchValue} = this.state

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
            <div className="searclcon" testid="search">
              <nav className="nav-container">
                <div className="desktop-container">
                  <div className="desktop-min-container">
                    <Link to="/" className="link">
                      <img
                        src="https://res.cloudinary.com/dv0wkaiuj/image/upload/v1696237436/Group_7399_egstvr.png"
                        alt="website logo"
                        className="website-logo"
                      />
                    </Link>
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
                  <div className="desktop-right-containe">
                    <div className="input-container">
                      <input
                        type="text"
                        placeholder="search"
                        onChange={this.onSearch}
                        value={searchValue}
                        className="input-1"
                      />
                      <button
                        type="button"
                        testid="searchButton"
                        onClick={this.searchDisplay}
                        className="btn"
                      >
                        <HiOutlineSearch
                          size={30}
                          color="#ffffff"
                          className="search"
                        />
                      </button>
                    </div>
                    <Link to="/account" className="link">
                      <img
                        src="https://res.cloudinary.com/dv0wkaiuj/image/upload/v1696237401/Avatar_rnsvpf.png"
                        alt="account"
                        className={
                          activeTab === 'Account'
                            ? 'account-image-image-select'
                            : 'account-image-image'
                        }
                        onClick={onClickAccount}
                      />
                    </Link>
                  </div>
                </div>
                <div className="mobile-container">
                  <div className="mobile-container-nav ">
                    <Link to="/" className="link">
                      <img
                        src="https://res.cloudinary.com/dv0wkaiuj/image/upload/v1696237436/Group_7399_egstvr.png"
                        alt="website logo"
                        className="mobile-logo"
                      />
                    </Link>
                    <div className="input-container-mobile">
                      <input
                        type="text"
                        placeholder="search"
                        onChange={this.onSearch}
                        value={searchValue}
                        className="input-1-mobile"
                      />
                      <button
                        type="button"
                        testid="searchButton"
                        onClick={this.searchDisplay}
                        className="btn-mobile"
                      >
                        <HiOutlineSearch
                          size={15}
                          color="#ffffff"
                          className="search"
                        />
                      </button>
                    </div>
                    <button
                      className="header-button"
                      type="button"
                      onClick={this.onClickList}
                    >
                      <RiPlayListAddFill size={27} color="#fff" />
                    </button>
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
                        <AiOutlineCloseCircle size={27} color="#ffff" />
                      </button>
                    </ul>
                  )}
                </div>
              </nav>
              {this.renderViewDisplay()}
            </div>
          )
        }}
      </UserDetails.Consumer>
    )
  }
}
export default SearchRoute
