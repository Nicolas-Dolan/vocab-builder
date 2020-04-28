const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true } 
}, {
  timestamps: true
})

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const filmSchema = new mongoose.Schema({ 
  name: { type: String, required: true, unique: true  },  
  actor: { type: String, required: true },
  year: { type: Number, required: true, min: 1960, max: 2025 },
  image: { type: String, required: true },
  comments: [commentSchema],
  likes: [ likeSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true 
})

filmSchema
  .virtual('likeCount')
  .get(function() {
    return this.likes.length
  })

filmSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Film', filmSchema)