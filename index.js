const express = require('express')
const path = require('path')

// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '5b36565b619f4b75adb65a771654fc58',
  captureUncaught: true,
  captureUnhandledRejections: true
})

// record a generic message and send it to Rollbar

let students = []

const app = express()
app.use(express.json())



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
    rollbar.info('html file served successfully.')
})

app.post('/api/student', (req, res) => {
  let {name} = req.body
  name = name.trim()

  students.push(name)

  rollbar.log('student added successfully', {author: 'Sam', type: 'manual'})

  res.status(200).send(students)
})


const port = process.env.PORT || 4545
// console.log(port);

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`warped to ${port}`))

