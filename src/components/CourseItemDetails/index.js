import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    itemDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCoursesList()
  }

  getUpdatedData = data => ({
    id: data.id,
    imageUrl: data.image_url,
    description: data.description,
    name: data.name,
  })

  getCoursesList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const courseDetailsApiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(courseDetailsApiUrl, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updated = this.getUpdatedData(data.course_details)

      this.setState({
        itemDetails: updated,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getRetryDetails = () => {
    this.getCoursesList()
  }

  renderFailureView = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading"> Oops! Something Went Wrong </h1>
      <p className="failure-text">
        {' '}
        We cannot seem to find the page you are looking for.{' '}
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.getRetryDetails}
      >
        {' '}
        Retry{' '}
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loading">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderItemDetails = () => {
    const {itemDetails} = this.state
    return (
      <div className="in-con">
        <img
          src={itemDetails.imageUrl}
          alt={itemDetails.name}
          className="item-image"
        />
        <div className="course-details">
          <h1 className="item-heading"> {itemDetails.name} </h1>
          <p className="item-description"> {itemDetails.description}</p>
        </div>
      </div>
    )
  }

  renderCourseItemList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="details-con">{this.renderCourseItemList()}</div>
  }
}

export default CourseItemDetails
