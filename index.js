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


const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
    rollbar.info('html file served successfully.')
})

const port = process.env.PORT || 4545
// console.log(port);

app.listen(port, () => console.log(`warped to ${port}`))