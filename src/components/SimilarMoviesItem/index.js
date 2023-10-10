import {Link} from 'react-router-dom'
import './index.css'

const SimilarMoviesItem = props => {
  const {eachValue} = props
  const {id, posterPath, title} = eachValue

  return (
    <Link to={`/movies/${id}`} className="link">
      <li className="similar-list">
        <img src={posterPath} alt={title} className="img" />
      </li>
    </Link>
  )
}
export default SimilarMoviesItem
