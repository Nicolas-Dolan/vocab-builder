
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
import axios from 'axios'
class Navbar extends React.Component {
  state = { navbarOpen: false, username: null }
  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }
  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/')
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ username: res.data.username })
    } catch (err) {
      console.log(err)
    }
  }


  async componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
      try {
        const res = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        this.setState({ username: res.data.username })
      } catch (err) {
        console.log(err)
      }
    }
  }
  render() {
    const { navbarOpen } = this.state
    console.log(Auth.getPayload().sub)
    // console.log(currentUser)
    return (
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">James Bond Films</Link>
            <a className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              <Link className="navbar-item" to="/films">See all Films</Link>
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/films/new">Add a new Film</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/profile">Profile</Link>}
              {Auth.isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item">Logout {this.state.username}</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
export default withRouter(Navbar)