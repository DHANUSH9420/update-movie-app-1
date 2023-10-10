import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimilarMoviesItem from '../SimilarMoviesItem'
import './index.css'
import Header from '../Header'
import SocialMedia from '../SocialMedia'

const apiStatusContext = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class PopularRoute extends Component {
  state = {popularList: [], apiStatus: apiStatusContext.initial}

  componentDidMount() {
    this.getPopular()
  }

  getPopular = async () => {
    this.setState({apiStatus: apiStatusContext.inProgress})

    const api = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken} `,
      },
      method: 'GET',
    }

    const response = await fetch(api, options)
    if (response.ok) {
      const data = await response.json()
      const updateData = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({
        apiStatus: apiStatusContext.success,
        popularList: updateData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusContext.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.getPopular()
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

  renderPopularView = () => {
    const {popularList} = this.state
    return (
      <ul className="popular-ul-list">
        {popularList.map(each => (
          <SimilarMoviesItem eachValue={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderDisplayView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContext.success:
        return this.renderPopularView()
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
      <div className="popular-container" testid="popular">
        <Header />
        {this.renderDisplayView()}
        <SocialMedia />
      </div>
    )
  }
}
export default PopularRoute
