const express = require('express')
const port = process.env.PORT

// this is done because if db doesn't work then theirs 
// no point in running server.js
const { db } = require('./db/models')
const { usersRoute } = require('./routes/users')
const { postsRoute } = require('./routes/posts')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)
app.use('/', express.static(__dirname + '/public'))

db.sync()  // {force: true} is to be used only during production to delete existing tables.
  .then(() => {
    app.listen(port, () => {
      console.log('Server started on http://localhost:8383')
    })
  })
  .catch((err) => {
    console.error(new Error('Could not start database'))
    console.error(err)
  })