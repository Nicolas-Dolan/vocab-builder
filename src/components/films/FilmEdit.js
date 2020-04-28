import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import FilmForm from './FilmForm'
class FilmsEdit extends React.Component {
  state = {
    data: {
      name: '',
      actor: '',
      image: '',
      year: ''
    }
  }
  async componentDidMount() {
    const filmId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/films/${filmId}`)
      this.setState({ data: res.data })
    } catch (err) {
      console.log(err)
    }
  }
  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }
  handleSubmit = async e => {
    e.preventDefault()
    const filmId = this.props.match.params.id
    console.log('filmid =', filmId)
    try {
      const { data } = await axios.put(`/api/films/${filmId}`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/films/${filmId}`)
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }
  render() {
    return (
      <section className="section">
        <div className="container">
          <FilmForm
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </section>
    )
  }
}
export default FilmsEdit