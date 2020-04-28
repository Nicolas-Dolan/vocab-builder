import React from 'react'
import axios from 'axios'
import FilmCard from './FilmCard'
class Profile extends React.Component {
  state = {
    likedFilms: [],
    createdFilms: [],
    username: ''
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/profile')
      this.setState({ createdFilms: res.data.createdFilms })
      this.setState({ likedFilms: res.data.likedFilms })
      this.setState({ username: res.data.username })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    console.log('Profile returned!')
    return (
      <section className="section">
        <h1>Profile of {this.state.username}</h1>
        <div className="container">
          <h2>Created Films</h2>
          <div className="columns is-mobile is-multiline">
            {this.state.createdFilms.map(film => (
              <FilmCard key={film._id} {...film} />
            ))}
          </div>
          <h2>Liked Films</h2>
          <div className="columns is-mobile is-multiline">
            {this.state.likedFilms.map(film => (
              <FilmCard key={film._id} {...film} />
            ))}
          </div>
        </div>
      </section>
    )
  }
}
export default Profile