import format from 'date-fns/format'
import SocialMedia from '../SocialMedia'
import SimilarMoviesItem from '../SimilarMoviesItem'
import './index.css'

const MoreMovieDetails = props => {
  const {similarMovies, movieDetails} = props
  const {
    genres,
    budget,
    releaseDate,
    spokenLanguages,
    voteCount,
    voteAverage,
  } = movieDetails
  const date = format(new Date(releaseDate), 'do-MMM-yyy')
  console.log(date)

  return (
    <div className="more-movie-container">
      <div className="more-con">
        <div className="column">
          <h1 className="movie-heading">genres</h1>
          <div className="ul-list">
            {genres.map(each => (
              <p className="text-value" key={each.id}>
                {each.name}
              </p>
            ))}
          </div>
        </div>
        <div className="column">
          <h1 className="movie-heading">Audio Available</h1>
          <div className="ul-list">
            {spokenLanguages.map(each => (
              <p className="text-value" key={each.id}>
                {each.englishName}
              </p>
            ))}
          </div>
        </div>
        <div className="column">
          <h1 className="movie-heading">Rating Count</h1>
          <p className="text-value">{voteCount}</p>
          <h1 className="movie-heading">Rating Average</h1>
          <p className="text-value">{voteAverage}</p>
        </div>
        <div className="column">
          <h1 className="movie-heading">Budget</h1>
          <p className="text-value">{budget}</p>
          <h1 className="movie-heading">Release Date</h1>
          <p className="text-value">{releaseDate}</p>
        </div>
      </div>
      <h1 className="heading-more-heading">More like this</h1>
      <ul className="similar-movie">
        {similarMovies.map(eachValue => (
          <SimilarMoviesItem eachValue={eachValue} key={eachValue.id} />
        ))}
      </ul>
      <SocialMedia />
    </div>
  )
}
export default MoreMovieDetails
