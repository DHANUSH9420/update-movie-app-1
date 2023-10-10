import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginRoute from './components/LoginForm'
import HomeRoute from './components/HomeRoute'
import PopularRoute from './components/PopularRoute'
import SearchRoute from './components/SearchRoute'
import AccountRoute from './components/AccountRoute'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import MovieDetailsRoute from './components/MovieDetailsRoute'
import './App.css'
import UserDetails from './context/UserDetails'

class App extends Component {
  state = {userEmails: 'rahul', activeTab: 'Home'}

  onEnterUserDetails = name => {
    this.setState({userEmails: name})
  }

  onChangeTab = tab => {
    this.setState({activeTab: tab})
  }

  render() {
    const {userEmails, activeTab} = this.state
    return (
      <UserDetails.Provider
        value={{
          userEmails,
          activeTab,
          onEnterUserDetails: this.onEnterUserDetails,
          onChangeTab: this.onChangeTab,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/popular" component={PopularRoute} />
          <ProtectedRoute path="/movies/:id" component={MovieDetailsRoute} />
          <ProtectedRoute exact path="/search" component={SearchRoute} />
          <ProtectedRoute exact path="/account" component={AccountRoute} />
          <Route path="random path" component={NotFound} />
          <NotFound />
        </Switch>
      </UserDetails.Provider>
    )
  }
}

export default App
