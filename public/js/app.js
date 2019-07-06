const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  messageOne.textContent = 'Pribavljanje podataka...'
  messageTwo.textContent = ''
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json(response).then((data) => {
      if(data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })  
})