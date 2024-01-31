import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    coursesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const coursesApiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(coursesApiUrl, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))
      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetryCourses = () => {
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
        onClick={this.onRetryCourses}
      >
        {' '}
        Retry{' '}
      </button>
    </div>
  )

  renderCourses = () => {
    const {coursesList} = this.state
    console.log(coursesList)
    return (
      <ul className="course-list">
        {coursesList.map(course => (
          <CourseItem key={course.id} courseDetails={course} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loading">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderCoursesList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourses()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="course-con">
          <h1 className="heading"> Courses </h1>
          {this.renderCoursesList()}
        </div>
      </div>
    )
  }
}

export default Home
