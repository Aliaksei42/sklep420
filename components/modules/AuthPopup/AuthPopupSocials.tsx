import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faGoogle,
  faLinkedin,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons'

const AuthPopupSocials = ({
  handleSignupWithOAuth,
}: {
  handleSignupWithOAuth: VoidFunction
}) => (
  <div className='cart-body__socials'>
    <button
      className='btn-reset socials__btn gh-color'
      onClick={handleSignupWithOAuth}
    >
      <FontAwesomeIcon icon={faGithub} beat />
    </button>
    <button
      className='btn-reset socials__btn fb-color'
      onClick={handleSignupWithOAuth}
    >
      <FontAwesomeIcon icon={faFacebook} shake />
    </button>
    <button
      className='btn-reset socials__btn g-color'
      onClick={handleSignupWithOAuth}
    >
      <FontAwesomeIcon icon={faGoogle} bounce />
    </button>
    <button
      className='btn-reset socials__btn li-color'
      onClick={handleSignupWithOAuth}
    >
      <FontAwesomeIcon icon={faLinkedin} shake />
    </button>
  </div>
)

export default AuthPopupSocials
