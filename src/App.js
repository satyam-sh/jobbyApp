import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm/index'
import Home from './components/Home/index'
import Jobs from './components/Jobs/index'
import JobDetails from './components/JobDetails/index'
import NotFound from './components/NotFound/index'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route component={NotFound} />
    <Redirect to="/bad-path/" component={NotFound} />
  </Switch>
)

export default App
