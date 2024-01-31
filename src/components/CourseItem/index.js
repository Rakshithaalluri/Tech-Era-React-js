import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, logoUrl, name} = courseDetails

  return (
    <Link to={`/courses/${id}`} className="nav-link">
      <li className="list-item">
        <img src={logoUrl} alt={name} className="course-image" />
        <p className="course-name"> {name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
