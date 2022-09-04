import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import JobListItem from '../JobListItem/index'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    profile: {},
    jobList: [],
    searchValue: '',

    typeQ: [],
    searchQ: '',
    Spackage: '',
    apiStatus: apiConstants.initial,
    apiStatusProfile: apiConstants.initial,
  }

  componentDidMount() {
    this.doApiCallProfile()
    this.doApiCall()
  }

  searchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  filterResults = () => {
    const {searchValue} = this.state
    this.setState({searchQ: searchValue}, this.doApiCall)
  }

  doApiCall = async () => {
    this.setState({apiStatus: apiConstants.loading})

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const {searchQ, Spackage, typeQ} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${typeQ.join()}&minimum_package=${Spackage}&search=${searchQ}`
    console.log(typeQ.join())
    const response = await fetch(url, options)
    const jsonResponse = await response.json()

    if (response.ok) {
      this.setState({
        jobList: jsonResponse.jobs,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  doApiCallProfile = async () => {
    this.setState({apiStatusProfile: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = 'https://apis.ccbp.in/profile'
    const response = await fetch(url, options)
    const profile = await response.json()
    console.log(profile)
    if (response.ok) {
      this.setState({
        profile: profile.profile_details,
        apiStatusProfile: apiConstants.success,
      })
    } else {
      this.setState({apiStatusProfile: apiConstants.failure})
    }
  }

  retryJobDetails = () => {
    this.doApiCall()
  }

  failureView = () => (
    <div className="job-page-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureImage"
      />
      <h1 className="not-found-heading">Oops! Something Went Wrong</h1>
      <p className="not-found-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.retryJobDetails}
        className="find-jobs-btn"
      >
        Retry
      </button>
    </div>
  )

  retryProfile = () => {
    this.doApiCallProfile()
  }

  failureViewProfile = () => (
    <div className="profile-failure-view">
      <button type="button" onClick={this.retryProfile}>
        Retry
      </button>
    </div>
  )

  noView = () => (
    <div className="noViewDisplay">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-job-heading">No Jobs Found</h1>
      <p className="no-job-desc">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderViews = () => {
    const {apiStatus, jobList} = this.state

    switch (apiStatus) {
      case apiConstants.loading:
        return (
          <div testid="loader" className="loader">
            <Loader type="ThreeDots" color=" #cbd5e1" width={80} height={80} />
          </div>
        )
      case apiConstants.success:
        if (jobList.length === 0) {
          return this.noView()
        }
        return (
          <ul className="jobListItemContainer">
            {jobList.map(each => (
              <JobListItem detail={each} key={each.id} />
            ))}
          </ul>
        )

      case apiConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  renderProfile = () => {
    const {apiStatusProfile, profile} = this.state

    switch (apiStatusProfile) {
      case apiConstants.loading:
        return (
          <div testid="loader" className="profile-loader-container">
            <Loader type="ThreeDots" color=" #cbd5e1" width={50} height={50} />
          </div>
        )
      case apiConstants.success:
        return (
          <div className="profile-container">
            <img src={profile.profile_image_url} alt="profile" />
            <h1 className="profile-name">{profile.name}</h1>
            <p className="profile-role">{profile.short_bio}</p>
          </div>
        )

      case apiConstants.failure:
        return this.failureViewProfile()

      default:
        return null
    }
  }

  selectEmploymentType = event => {
    if (event.target.checked) {
      this.setState(
        prev => ({
          typeQ: [...prev.typeQ, event.target.value],
        }),
        this.doApiCall,
      )
    } else {
      this.setState(
        prev => ({
          typeQ: prev.typeQ.filter(each => each !== event.target.value),
        }),
        this.doApiCall,
      )
    }
  }

  radioInput = event => {
    this.setState({Spackage: event.target.value}, this.doApiCall)
  }

  render() {
    const {searchValue} = this.state

    return (
      <div className="Job-Container-main">
        <Header />
        <div className="job-profile-container">
          <div className="profile-section-container">
            {this.renderProfile()}
            <div>
              <hr />
              <h1 className="type-of-employment-heading">Type of Employment</h1>
              <ul className="type-of-employment-list-container">
                {employmentTypesList.map(each => (
                  <li
                    className="each-li-employment-type"
                    key={each.employmentTypeId}
                  >
                    <input
                      type="checkbox"
                      id={each.label}
                      value={each.employmentTypeId}
                      onClick={this.selectEmploymentType}
                    />
                    <label htmlFor={each.label}>{each.label}</label>
                  </li>
                ))}
              </ul>
              <hr />
              <h1 className="type-of-employment-heading">Salary Range</h1>
              <ul className="type-of-employment-list-container">
                {salaryRangesList.map(each => (
                  <li
                    className="each-li-employment-type"
                    key={each.salaryRangeId}
                  >
                    <input
                      type="radio"
                      id={each.label}
                      value={each.salaryRangeId}
                      name="radio"
                      onChange={this.radioInput}
                    />
                    <label htmlFor={each.label}>{each.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="job-item-list-section-container">
            <div className="search-bar">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.searchInput}
                value={searchValue}
              />
              <button
                type="button"
                onClick={this.filterResults}
                className="search-btn"
                testid="searchButton"
              >
                <BsSearch className="search-input-icon" />
              </button>
            </div>
            {this.renderViews()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
