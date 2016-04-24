var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var request = require('request')

var token = "CAAYKpqZBU37IBAPJDJPULaJYYjaIzPlCzTVoI5QKKAnrVtQGz3xx2sieqVtTT0FF4NVCDuzEoHo26mZBKM9Cr0qL9188QimP73m8KOW7pVkI1MJMJpWE4T7LtGwKa2YpZCgdP3e6YQEoOsL4zyD4V3voPoT5LpwZB0PdRgVYa2eSguJZCooODHAMgRn9UAMo8BUGYxMJc3gZDZD";

function sendTextMessage(sender, text) {
 messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

app.use(bodyParser.json())

app.get('/',function(req,res){
	res.send('Hello World')
})

app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'champoolwoo') {
    res.send(req.query['hub.challenge'])
  } else {
    res.send('Error, wrong validation token')  
  }
})

app.post('/webhook/', function (req, res) {
  var messaging_events = req.body.entry[0].messaging
  for (var i = 0; i < messaging_events.length; i++) {
    var event = req.body.entry[0].messaging[i]
    var sender = event.sender.id
    if (event.message && event.message.text) {
      	var text = event.message.text
      	// Handle a text message from this sender
    	console.log(text)
    	sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200))
    }
  }
  res.sendStatus(200)
})



app.set('port',(process.env.PORT || 5000))

app.listen(app.get('port'),function(){
	console.log('Example app listening on port ' + app.get('port'))
})