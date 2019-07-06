const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/a41a3e92663d727ea279469ad064ce30/${longitude},${latitude}?units=si&lang=sr`

  request({ 
    url,
    json : true
   }, (error, response) => {
     if(error) {
       callback('Nismo u mogucnosti da se povezemo na mrezu!', undefined)
     } else if (response.body.error) {
      callback('Ne mozemo da nadjemo lokaciju!', undefined)
     } 
     else {
        callback(undefined, `${response.body.daily.data[0].summary} ${response.body.currently.temperature} stepeni, i ${response.body.currently.precipProbability}% sanse za kisu!`)
     }
  })
}

module.exports = forecast