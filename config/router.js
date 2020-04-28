const router = require('express').Router()
const films = require('../controllers/films')
const users = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.route('/films')
  .get(films.index)
  .post(secureRoute, films.create)

router.route('/films/:id')
  .get(films.show)
  .put(secureRoute, films.update)
  .delete(secureRoute, films.destroy)

router.route('/films/:id/comments')
  .post(secureRoute, films.commentCreate)

router.route('/films/:id/comments/:commentId')
  .delete(secureRoute, films.commentDelete)

router.route('/films/:id/like')
  .get(secureRoute, films.like)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/profile')
  .get(secureRoute, users.profile)

module.exports = router