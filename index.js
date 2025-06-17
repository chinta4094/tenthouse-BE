
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Router = require('./routes/index.js')

require('./models/index.js')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', Router)
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3001, () => {
    console.log('Server Running On PORT : 3001')
})