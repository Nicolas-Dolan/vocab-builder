import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
// import CommentForm from '../films/CommentForm'
class FilmShow extends React.Component {
  state = {
    film: null,
    newComment: {
      text: ''
    },
    likesCount: ''
    // comments: []
  }
  async componentDidMount() {
    const filmId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/films/${filmId}`)
      this.setState({ film: res.data })
    } catch (err) {
      console.log(err)
      this.props.history.push('/notfound')
    }
  }
  handleDelete = async () => {
    const filmId = this.props.match.params.id
    try {
      await axios.delete(`/api/films/${filmId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/films')
    } catch (err) {
      console.log(err.response)
    }
  }
  isOwner = () => Auth.getPayload().sub === this.state.film.user._id

  isOwnerC = (user) => Auth.getPayload().sub === user



  handleChangeC = e => {
    const newComment = { ...this.state.newComment, text: e.target.value }
    this.setState({ newComment })
    // console.log('new comment =', this.state.newComment)
  }
  handleSubmitC = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(`/api/films/${this.state.film._id}/comments`, this.state.newComment, {

        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.componentDidMount()
      // this.state.history.push(`/api/film/${res.data._id}`)
    } catch (err) {
      // console.log(err.response)
    }
  }

  handleDeleteC = async e => {
    const filmId = this.props.match.params.id
    console.log('target =', e.target.id)
    try {
      await axios.delete(`/api/films/${filmId}/comments/${e.target.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.componentDidMount()

      // this.props.history.push(`/films/${filmId}`)

    } catch (err) {
      console.log(err.response)
    }
  }
  handleSubmitL = async e => {
    // e.preventDefault()
    try {
      const res = await axios.get(`/api/films/${this.state.film._id}/like`, {

        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      console.log('liked!', this.state.likesCount, this.state.film.likes.length)
      this.componentDidMount()
    } catch (err) {
      // console.log(err.response)
    }
  }

  render() {
    const { film } = this.state
    if (!film) return null
    console.log(film)
    return (
      <section className="section">
        <div className="container">
          <h2 className="title">{film.name}</h2>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <figure className="image">
                <img src={film.image} alt={film.name} />
              </figure>
              <p>Created by: {film.user.username}</p>
            </div>
            <div className="column is-half">
              <h4 className="title is-4">Year</h4>
              <p>{film.year}</p>
              <hr />
              <h4 className="title is-4">Actor</h4>
              <hr />
              <p>{film.actor}</p>
              <hr />
              <h4 className="title is-4">Comments</h4>
              <hr />
              {film.comments.map(comment => <p key={comment._id} className="padding flex"><span><span className="bold">{comment.user.username}:</span> {comment.text}</span>{this.isOwnerC(comment.user._id) && <button className="button is-danger is-small" onClick={this.handleDeleteC} id={comment._id}>Delete Comment</button>}</p>)}
              {/* <hr /> */}
              <div className="spacer"></div><div className="spacer"></div>
              {/* <div className="flex"></div> */}
              <form onSubmit={this.handleSubmitC} className="flex">
                <input
                  className="input"
                  placeholder="Write Comments Here"
                  name="comment"
                  onChange={this.handleChangeC}
                  value={this.newComment}
                />
                <div className="spacer"></div>
                <button type="submit" className="button is-info">Submit Comment</button>
              </form>
              <hr />
              
              <div className="flex"><button onClick={this.handleSubmitL} className="button is-success">Like 👍</button><p><span className="bold">Like Count:</span> {film.likes.length}</p></div>
              <hr />
              {this.isOwner() &&
                <>
                  <div className="flex">
                    <Link to={`/films/${film._id}/edit`} className="button is-warning">Edit Film</Link>
                    {/* <hr /> */}
                    <button onClick={this.handleDelete} className="button is-danger">Delete Film ☠️</button>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default FilmShow