import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Loader from 'react-loader-spinner'
import SimilarMoviesItem from '../SimilarMoviesItem'

const apiStatusContext = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class SearchInput extends Component {
  state = {searchDetails: [], apiStatus: apiStatusContext.initial}

  componentDidMount() {
    this.getSearch()
  }

  getSearch = async () => {
    this.setState({apiStatus: apiStatusContext.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {search} = this.props
    console.log(search)
    const api = `https://apis.ccbp.in/movies-app/movies-search?search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
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
    this.getSearch()
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
    const {searchDetails} = this.state
    console.log(searchDetails)
    const {search} = this.props
    const len = 1

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
              Your search for ${search} did not find any matches.
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
    return <>{this.renderViewDisplay()}</>
  }
}

export default SearchInput
