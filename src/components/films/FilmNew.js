import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import FilmForm from './FilmForm'
class FilmNew extends React.Component {
  state = {
    data: {
      name: '',
      actor: '',
      image: '',
      year: ''
    }
  }
  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }
  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/films', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` } // * we include our users token in the request header to authenticate them
      })
      this.props.history.push(`/films/${res.data._id}`) // * we re-direct our user to their newly created film show page, we get the id of that new film from the succesful POST request response
    } catch (err) {
      console.log(err.response)
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
export default FilmNew