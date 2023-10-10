import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import HomeTrendingList from '../HomeTrendingList'
import HomeTopRatedList from '../HomeTopRatedList'
import HomeOriginalsList from '../HomeOriginalsList'
import SocialMedia from '../SocialMedia'
import './index.css'

const apiStatusContext = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class HomeRoute extends Component {
  state = {TrendingVideo: [], apiStatus: apiStatusContext.initial}

  componentDidMount() {
    this.getTrending()
  }

  getTrending = async () => {
    this.setState({apiStatus: apiStatusContext.inProgress})

    const api = 'https://apis.ccbp.in/movies-app/originals'
    const jwt = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }

    const response = await fetch(api, options)
    if (response.ok) {
      const data = await response.json()
      const update = data.results.map(eachValue => ({
        backdropPath: eachValue.backdrop_path,
        id: eachValue.id,
        overview: eachValue.overview,
        posterPath: eachValue.poster_path,
        title: eachValue.title,
      }))
      this.setState({
        apiStatus: apiStatusContext.success,
        TrendingVideo: update,
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
    this.getTrending()
  }

  renderFailureView = () => (
    <div className="failure-con">
      <img
        src="https://res.cloudinary.com/dv0wkaiuj/image/upload/v1696237369/alert-triangle_icvhqm.png"
        alt="failure view"
        className="f-img"
      />
      <p className="f-text ">Something went wrong. Please try again</p>
      <button className="f-button" type="button" onClick={this.onClickTryAgain}>
        Try Again
      </button>
    </div>
  )

  renderDisplayView = () => {
    const {TrendingVideo} = this.state
    const lenght = TrendingVideo.length
    console.log(lenght)
    const m = Math.ceil(Math.random() * (lenght - 1))
    const {backdropPath, overview, title} = TrendingVideo[m]
    console.log(m)
    console.log(title)
    return (
      <div
        className="top"
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: 'cover',
          height: '500px',
          width: '100vw',
        }}
      >
        <Header />
        <h1 className="he">{title}</h1>
        <div className="tt">
          <h1 className="over">{overview}</h1>
          <button className="button" type="button">
            Play
          </button>
        </div>
        <div className="mm">.</div>
      </div>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContext.success:
        return this.renderDisplayView()
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
      <div className="home-container">
        {this.renderView()}
        <HomeTrendingList />
        <HomeTopRatedList />
        <HomeOriginalsList />
        <SocialMedia />
      </div>
    )
  }
}
export default HomeRoute
