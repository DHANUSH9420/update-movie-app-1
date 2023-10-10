import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MoreMovieDetails from '../MoreMovieDetails'
import './index.css'

const apiStatusContext = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class MovieDetailsRoute extends Component {
  state = {
    apiStatus: apiStatusContext.initial,
    movieDetails: [],
    similarMovies: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  formatted = data => ({
    adult: data.adult,
    backdropPath: data.backdrop_path,
    budget: data.budget,
    genres: data.genres.map(each => ({
      id: each.id,
      name: each.name,
    })),
    id: data.id,
    overview: data.overview,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    runtime: data.runtime,
    title: data.title,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
    spokenLanguages: data.spoken_languages.map(each => ({
      id: each.id,
      englishName: each.english_name,
    })),
    similarMovies: data.similar_movies.map(eachSim => ({
      id: eachSim.id,
      backdropPath: eachSim.backdrop_path,
      overview: eachSim.overview,
      posterPath: eachSim.poster_path,
      title: eachSim.title,
    })),
  })

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusContext.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updateMovie = this.formatted(data.movie_details)
      console.log(updateMovie)
      this.setState({
        apiStatus: apiStatusContext.success,
        movieDetails: updateMovie,
        similarMovies: updateMovie.similarMovies,
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
    this.getMovieDetails()
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

  renderMovieDetailsView = () => {
    const {movieDetails, similarMovies} = this.state
    const {
      backdropPath,
      title,
      overview,
      releaseDate,
      runtime,
      adult,
    } = movieDetails
    const certificate = adult ? 'A' : 'U/A'
    const date = new Date(releaseDate)
    const hours = Math.floor(runtime / 60)
    const forMinutes = Math.floor(runtime % 60)
    console.log(hours, forMinutes, date.getFullYear())
    console.log(date.getMonth())

    return (
      <div className="movie-container" testid="movieItem">
        <div
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: 'cover',
            width: '100vw',
            height: '480px',
          }}
          className="col"
        >
          <Header />
          <div className="movie-text-container">
            <h1 className="movie-heading">{title}</h1>
            <div className="movie-row-container">
              <p className="movie-hour ">
                {hours}h {forMinutes}min
              </p>
              <p className="movie-U-a">{certificate}</p>
              <p className="movie-year">{date.getFullYear()}</p>
            </div>
            <p className="movie-description">{overview}</p>
            <div className="blur-bg">
              <button className="button" type="button">
                Play
              </button>
            </div>
          </div>
        </div>
        <MoreMovieDetails
          similarMovies={similarMovies}
          movieDetails={movieDetails}
        />
      </div>
    )
  }

  renderDisplay = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContext.inProgress:
        return this.renderLoadingView()
      case apiStatusContext.failure:
        return this.renderFailureView()
      case apiStatusContext.success:
        return this.renderMovieDetailsView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderDisplay()}</>
  }
}
export default MovieDetailsRoute
