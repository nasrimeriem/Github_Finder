import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
export class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    Alert: null
  };

  // async componentDidMount() {
  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: res.data, loading: false });
  //   console.log(res.data);
  // }
  clearUsers = () => this.setState({ users: [], loading: false });
  //Get Single Github user
  getUser = async username => {
    this.setState({ loading: true });
    // &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET }
    const res = await axios.get(
      `https://api.github.com/users/${username}
     
     `
    );
    this.setState({ user: res.data, loading: false });
    console.log('Hello', res.data);
  };
  //Search Github users
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
    console.log(res.data.items);
  };
  setAlert = (msg, type) => {
    this.setState({ Alert: { msg, type } });
    setTimeout(() => {
      this.setState({ Alert: null });
    }, 5000);
  };

  render() {
    const { users, user, loading } = this.state;
    return (
      <Router>
        <div className='app'>
          <Navbar />

          <div className='container'>
            <Alert Alert={this.state.Alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    user={user}
                    getUser={this.getUser}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
