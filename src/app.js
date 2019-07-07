const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
console.log(port);
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Vremenska prognoza',
    name: 'Mihailo'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'O nama',
    name: 'Mihailo'
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Pomoc?',
    name: 'Mihailo'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Morate uneti adresu!'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({
        error
      })
    } else {
      forecast(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({
            error
          })
        } else {
          res.send({
            location,
            forecast: data,
            address: req.query.address
          })
        }
      })
    }
  })
  
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Stranica nije pronadjena',
    name: 'Mihailo',
    errorMessage: 'Help Article Not Found',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Stranica nije pronadjena',
    name: 'Mihailo',
    errorMessage: 'Page Not Found',
  })
})

app.listen(port, () => {
  console.log(`Server is up on port${port}`)
})