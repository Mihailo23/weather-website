const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/a41a3e92663d727ea279469ad064ce30/${longitude},${latitude}?units=si&lang=sr`

  request({ 
    url,
    json : true
   }, (error, { body }) => {
     if(error) {
       callback('Nismo u mogucnosti da se povezemo na mrezu!', undefined)
     } else if (body.error) {
      callback('Ne mozemo da nadjemo lokaciju!', undefined)
     } 
     else {
        callback(undefined, `${body.daily.data[0].summary} ${body.currently.temperature} stepeni, i ${body.currently.precipProbability}% sanse za kisu! Najvisa dnevna temperatura ${body.daily.data[0].temperatureHigh}, najniza ${body.daily.data[0].temperatureLow}`)
     }
  })
}

module.exports = forecast