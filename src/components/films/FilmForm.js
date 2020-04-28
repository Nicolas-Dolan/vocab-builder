import React from 'react'
const FilmForm = ({  data, handleChange, handleSubmit }) => {
  return (
    <div className="columns">
      <form onSubmit={handleSubmit} className="column is-one-half is-offset-one-quarter">
        <h2 className="title">New Film</h2>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input 
              className="input"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Year</label>
          <div className="control">
            <input 
              className="input"
              placeholder="Year"
              name="year"
              onChange={handleChange}
              value={data.year}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <input 
              className="input"
              placeholder="Image URL"
              name="image"
              onChange={handleChange}
              value={data.image}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Actor</label>
          <div className="control">
            <input 
              className="input"
              placeholder="Actor"
              name="actor"
              onChange={handleChange}
              value={data.actor}
            />
          </div>
        </div>
        <div className="field">
          <button type="submit" className="button is-fullwidth is-warning">Add a new film</button>
        </div>
      </form>
    </div>
  )
}
export default FilmForm