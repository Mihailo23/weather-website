const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')

const app = express()

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
    title: 'Weather',
    name: 'Mihailo'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Mihailo'
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Mihailo'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
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
    title: '404 Help',
    name: 'Mihailo',
    errorMessage: 'Help Article Not Found',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Mihailo',
    errorMessage: 'Page Not Found',
  })
})

app.listen(3000, () => {
  console.log('Server')
})