const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWloYWlsbzIzIiwiYSI6ImNqeHE1NGRvZzBtbDYzbXA5c2dobGRnZ3gifQ.YW7UiJBz1RozaFN6FTStJQ&language=sr&limit=1`

  request({ 
    url,
    json : true
  }, (error, { body }) => {
    if (error) {
      callback('Nismo u mogucnosti da se povezemo na mrezu!', undefined)
    } else if (body.features.length === 0) {
        callback('Nema rezultata!', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1], 
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
    
  })
}

module.exports = geocode