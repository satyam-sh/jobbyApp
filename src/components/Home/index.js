import {Link} from 'react-router-dom'

import Header from '../Header/index'
import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="home-page-details-container">
      <h1 className="home-page-heading">Find The Job That Fits Your Life</h1>
      <p className="home-page-description">
        Millions of people are searching for jobs, salary, information, company
        reviews. Find the job that fits your abilities and potential{' '}
      </p>
      <Link to="/jobs">
        <button className="find-jobs-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
