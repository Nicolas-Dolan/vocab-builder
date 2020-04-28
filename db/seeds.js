const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Film = require('../models/film')
const User = require('./../models/user')
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return User.create([
        {
          username: 'person1',
          email: 'person1@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        },
        {
          username: 'person2',
          email: 'person2@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        }
      ])
    })
    .then(createdUsers => {
      console.log(`${'👩‍🚒'.repeat(createdUsers.length)} users created`)
      return Film.create([
        {
          name: 'Dr No',
          actor: 'Sean Connery',
          year: 1962,
          image: 'https://vignette.wikia.nocookie.net/total-movies/images/a/a1/Dr._No.jpg/revision/latest?cb=20151029190721',
          user: createdUsers[0]
        }, {
          name: 'GoldenEye',
          actor: 'Pierce Brosnan',
          year: 1995,
          image: 'https://static.metacritic.com/images/products/movies/6/75e8dbe5dbf592654b0c068d90b2efe2.jpg',
          user: createdUsers[1]
        }, {
          name: 'Skyfall',
          actor: 'Daniel Craig',
          year: 2012,
          image: 'https://supposedlyfunblog.files.wordpress.com/2015/04/skyfall.jpg?w=640',
          user: createdUsers[0]
        }
      ])
    })
    .then(createdFilms => console.log(`${createdFilms.length} films created `))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})