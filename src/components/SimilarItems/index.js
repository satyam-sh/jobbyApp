import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarItems = props => {
  const {detail} = props
  console.log(detail)

  return (
    <li className="each-similar-items-container">
      <div className="similar-item-logo-rating-container">
        <img
          src={detail.company_logo_url}
          alt="similar job company logo"
          className="similar-item-image"
        />
        <div className="similar-item-title-rating-container">
          <h1 className="title">{detail.title}</h1>
          <div className="star-container">
            <AiFillStar className="icon-s" />
            <p>{detail.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-item-description-heading">Description</h1>
      <p className="similar-item-desc">{detail.job_description}</p>
      <div className="similar-item-job-location-container">
        <MdLocationOn className="lo" />
        <p className="location-text">{detail.location}</p>
        <BsFillBriefcaseFill className="bf" />
        <p>{detail.employment_type}</p>
      </div>
    </li>
  )
}
export default SimilarItems
