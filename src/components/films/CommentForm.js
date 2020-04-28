import React from 'react'
const CommentForm = ({  newComment, handleChangeC, handleSubmitC }) => {
  return (
    <form onSubmit={handleSubmitC}>
      <input 
        className="input"
        placeholder="Add Comments Here"
        name="comment"
        onChange={handleChangeC}
        value={newComment.text}
      />
      <button type="submit" className="button is-warning">Add a Comment</button>
    </form>
  )
}
export default CommentForm