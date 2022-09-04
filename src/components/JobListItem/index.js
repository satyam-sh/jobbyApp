import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobListItem = props => {
  const {detail} = props

  return (
    <Link to={`/jobs/${detail.id}`} className="link-item-jobs">
      <li className="each-job-item-container">
        <div className="avatar-container">
          <img
            src={detail.company_logo_url}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="title">{detail.title}</h1>
            <div className="star-icon-rating-container">
              <BsFillStarFill className="star-icons" />
              <p className="rating-para">{detail.rating}</p>
            </div>
          </div>
        </div>
        <div className="about-job-container">
          <div className="location-container">
            <MdLocationOn className="location-icon" />
            <p className="location-para">{detail.location}</p>
            <BsFillBriefcaseFill className="location-icon" />
            <p className="emp-type-para">{detail.employment_type}</p>
          </div>

          <p className="package-PA-para">{detail.package_per_annum}</p>
        </div>
        <hr className="horizontal-rule" />
        <h1 className="description-para">Description</h1>
        <p className="job-descp-para">{detail.job_description}</p>
      </li>
    </Link>
  )
}
export default JobListItem
