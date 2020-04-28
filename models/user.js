const mongoose = require('mongoose')
const bycrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
}, {
  timestamps: true
})

userSchema.virtual('createdFilms', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'user'
})

userSchema.virtual('likedFilms', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'likes.user'
})

userSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.password
    return json
  }
})

userSchema.methods.validatePassword = function validatePassword(password) {
  return bycrypt.compareSync(password, this.password)
}

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })




userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function hashPassword(next) {
    if (this.isModified('password')) {
      this.password = bycrypt.hashSync(this.password, bycrypt.genSaltSync(8))
    }
    next()
  })

module.exports = mongoose.model('User', userSchema)