import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header/index'
import SkillItem from '../SkillItem/index'
import SimilarItems from '../SimilarItems/index'
import './index.css'

const apiConstants = {
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
  initial: 'INITIAL',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    skills: [],
    lifeAtCompany: {},
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.doAPiCall()
  }

  doAPiCall = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {match} = this.props
    const {url} = match
    const apiUrl = `https://apis.ccbp.in${url}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const resp = await response.json()
      console.log(resp)
      this.setState({
        jobDetails: resp.job_details,
        similarJobs: resp.similar_jobs,
        skills: resp.job_details.skills,
        lifeAtCompany: resp.job_details.life_at_company,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  retryPage = () => {
    this.doAPiCall()
  }

  renderViews = () => {
    const {
      apiStatus,
      jobDetails,
      skills,
      lifeAtCompany,
      similarJobs,
    } = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return (
          <>
            <div className="Job-Container">
              <div className="job-header-container">
                <img
                  src={jobDetails.company_logo_url}
                  alt="job details company logo"
                  className="company-logo-image"
                />
                <div className="ratingAndLogoContainer">
                  <h1 className="title">{jobDetails.title}</h1>
                  <div className="rating-logo">
                    <BsFillStarFill className="star-icon" />
                    <p className="rating-para">{jobDetails.rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-type-Pa-container">
                <div className="location-type-container">
                  <MdLocationOn className="icon" />
                  <p className="location-para">{jobDetails.location}</p>
                  <BsFillBriefcaseFill className="icon" />
                  <p>{jobDetails.employment_type}</p>
                </div>
                <p>{jobDetails.package_per_annum}</p>
              </div>
              <hr className="horizontal-rule" />
              <div>
                <div className="heading-link-container">
                  <h1 className="job-details-description-heading">
                    Description
                  </h1>
                  <a href={jobDetails.company_website_url} target="_parent">
                    Visit <BiLinkExternal />
                  </a>
                </div>
                <p className="job-description-para">
                  {jobDetails.job_description}
                </p>
                <h1 className="skill-heading">Skills</h1>
                <ul className="skills-container">
                  {skills.map(each => (
                    <SkillItem key={each.name} detail={each} />
                  ))}
                </ul>
                <h1 className="skill-heading">Life at Company</h1>
                <div className="life-at-company-container">
                  <p className="life-at-company-desc">
                    {lifeAtCompany.description}
                  </p>
                  <img
                    src={lifeAtCompany.image_url}
                    alt="life at company"
                    className="life-at-company-image"
                  />
                </div>
              </div>
            </div>
            <h1 className="similar-heading">Similar Jobs</h1>
            <ul className="similar-items-container">
              {similarJobs.map(each => (
                <SimilarItems key={each.id} detail={each} />
              ))}
            </ul>
          </>
        )
      case apiConstants.loading:
        return (
          <div testid="loader" className="loader-container">
            <Loader color="#64748b" width={60} height={60} type="ThreeDots" />
          </div>
        )
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderFailureView = () => (
    <div className="failure-view-job-item">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failed-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.retryPage}>
        Retry
      </button>
    </div>
  )

  render() {
    const {jobDetails, skills, lifeAtCompany, apiStatus} = this.state

    return (
      <div className="job-details-container">
        <Header />
        {this.renderViews()}
      </div>
    )
  }
}
export default JobDetails
