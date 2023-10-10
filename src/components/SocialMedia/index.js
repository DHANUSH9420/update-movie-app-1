import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const SocialMedia = () => (
  <footer className="footer-container ">
    <div className="icon-container-footer">
      <button type="button" className="footer-button ">
        <FaGoogle size={27} color="#ffff" />
      </button>
      <button type="button" className="footer-button ">
        <FaTwitter size={27} color="#ffff" />
      </button>
      <button type="button" className="footer-button ">
        <FaInstagram size={27} color="#ffff" />
      </button>
      <button type="button" className="footer-button ">
        <FaYoutube size={27} color="#ffff" />
      </button>
    </div>
    <p className="footer-contact">Contact us</p>
  </footer>
)
export default SocialMedia
