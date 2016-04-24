var express = require('express')
var app = express()

app.get('/',function(req,res){
	res.send('Hello World')
})

app.set('port',(process.env.PORT || 5000))

app.listen(app.get('port'),function(){
	console.log('Example app listening on port ' + app.get(' port ' + '!'))
})