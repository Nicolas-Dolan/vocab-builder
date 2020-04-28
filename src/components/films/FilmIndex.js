import React from 'react'
import axios from 'axios'
import FilmCard from './FilmCard'
class FilmIndex extends React.Component {
  state = { films: [] }
  async componentDidMount()  {
    try {
      const res = await axios.get('/api/films')
      this.setState({ films: res.data })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {this.state.films.map(film =>( 
              <FilmCard key={film._id} {...film}/>
            ))}
          </div>
        </div>
      </section>
    )
  }
}
export default FilmIndex