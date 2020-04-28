const port = process.env.PORT || 4000 
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/james-bond-api'
const secret = process.env.SECRET || 'the magic word'

module.exports = { port, dbURI, secret }