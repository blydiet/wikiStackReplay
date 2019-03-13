const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const models = require('./models/index')
const bodyParser = require('body-parser')
const router = require('./routes')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))

const layout = require('./views/layout')
app.use(express.static(__dirname + "/public"))
app.use(router)

app.get('/', (req, res, next) => {
    res.send(layout('hello world'))
})
//Putting .sync before app.listen This prevents us from running into 
//a race condition where users are able to make requests 
//to the database before the tables have been created
models.db.sync({forcd: true})
//.sync is an asynchronous operation 
//(it is interacting with the database) and returns a promise.
app.listen(3000)