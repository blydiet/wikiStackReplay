const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const nunjucks = require('nunjucks')

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))

app.use(express.static(__dirname + "/public"))

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
const env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'homepage.html'))
})

app.listen(3000)