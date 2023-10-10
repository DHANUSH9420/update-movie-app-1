import {Link} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const onClickHomeButton = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dv0wkaiuj/image/upload/v1696237520/snow-removal-machine-working-high-ski-slope-snowstorm_454047-2149_1_mzo9xp.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Lost Your Way?</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/" className="link">
        <button
          className="not-found-button"
          type="button"
          onClick={onClickHomeButton}
        >
          Go to Home
        </button>
      </Link>
    </div>
  )
}
export default NotFound
