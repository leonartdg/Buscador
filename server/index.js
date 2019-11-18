var http = require('http'),
	express = require('express')

var port = 8080,
	app = express()

app.use(express.static('../public'))
var Server = http.createServer(app)

Server.listen(port, function () {
    console.log('Buscador ready for play on port: '+port)
})


