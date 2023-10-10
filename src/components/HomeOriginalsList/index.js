import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusContext = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class HomeOriginalsList extends Component {
  state = {TrendingVideo: [], apiStatus: apiStatusContext.initial}

  componentDidMount() {
    this.getTopRated()
  }

  getTopRated = async () => {
    this.setState({apiStatus: apiStatusContext.inProgress})

    const api = 'https://apis.ccbp.in/movies-app/originals'
    const cookies = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${cookies}`,
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
    <div className="lod" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.getTopRated()
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

    return (
      <div className="center">
        <Slider {...settings}>
          {TrendingVideo.map(eachLogo => {
            const {id, title, posterPath} = eachLogo

            return (
              <Link to={`/movies/${id}`} key={eachLogo.id} className="link">
                <div className="slick-item">
                  <img src={posterPath} alt="name" className="nav-image" />
                </div>
              </Link>
            )
          })}
        </Slider>
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
      <div className="top-container">
        <h1 className="text">Originals </h1>
        <div className="main-container">{this.renderView()}</div>
      </div>
    )
  }
}
export default HomeOriginalsList
