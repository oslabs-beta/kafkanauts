const prometheus = require('socket.io-prometheus-metrics')
const http = require('http')

const server = http.createServer();
const io = require('socket.io')(server);

prometheus.metrics(io);
 
server.listen(3000);