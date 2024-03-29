import './index.css'

const NotFound = () => (
  <div className="not-found-con">
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-msg"> Page Not Found </h1>
    <p className="not-found-text">
      {' '}
      We are sorry, the page you requested could not be found.{' '}
    </p>
  </div>
)

export default NotFound
