const Film = require('../models/film') 

function index(req, res) { 
  Film 
    .find() 
    .populate('user')
    .then(foundFilms => res.status(200).json(foundFilms))
    .catch(err => console.log(err))
}

function create(req, res) {
  req.body.user = req.currentUser 
  Film
    .create(req.body)
    .then(createdFilm => res.status(201).json(createdFilm)) 
    .catch(err => console.log(err))
}

function show(req, res) {
  Film
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(film => res.status(202).json(film))
    .catch(err => console.log(err))
}

function update(req, res, next) {
  Film
    .findById(req.params.id)
    .then(film => {
      if (!film) return res.status(404).json({ message: 'Not Found' })
      if (!film.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      Object.assign(film, req.body)
      film.save() 
    })
    .then(film => res.status(202).json(film))
    .catch(next)
}


function destroy(req, res) {
  Film
    .findById(req.params.id)
    .then(film => {
      if (!film) return res.status(404).json({ message: 'Not Found' })
      if (!film.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      else film.remove()
    })
    // .findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json(err))
}

function commentCreate(req, res, next) { 
  console.log('current user =', req.currentUser)
  req.body.user = req.currentUser
  console.log('user =', req.body.user)
  Film
    .findById(req.params.id)
    .then(film => {
      if (!film) return res.status(404).json({ message: 'Not Found' })
      console.log('body =', req.body)
      film.comments.push(req.body)
      return film.save()
    })
    .then(film => res.status(201).json(film))
    .catch(next)
}

function commentDelete(req, res) { 
  Film
    .findById(req.params.id)
    .then(film => {
      if (!film) return res.status(404).json({ message: 'Not Found' })
      const comment = film.comments.id(req.params.commentId)
      if (!comment.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      comment.remove()
      return film.save()
      // if (!comment.user.equals(req.currentUser._id)) {
      //   return res.status(401).json({ message: 'Unauthorized' })
      // } else {
      //   return film.save().then(() => res.sendStatus(204))
      // }
    })
    .catch(err => res.json(err))
}

function like(req, res) {
  Film
    .findById(req.params.id)
    .then(film => {
      if (!film) return res.status(404).json({ message: 'Not Found ' })
      if (film.likes.some(like => like.user.equals(req.currentUser._id))) return film
      film.likes.push({ user: req.currentUser })
      console.log('like was called')
      return film.save()
    })
    .then(film => res.status(202).json(film))
    .catch(err => res.json(err))
}

// function displayUser(req, res, next) { 
//   console.log('user =', req.body.user)
//   return req.currentUser
// }

module.exports = { index, create, show, update, destroy, commentCreate, commentDelete, like }
