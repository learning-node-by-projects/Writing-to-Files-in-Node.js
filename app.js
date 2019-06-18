const http = require('http');

const routes = require('./routes')

//	We use arrow function generally inside http.createServer() but I just have transfered all 
//  all files inside routes.js and importing here using node fs 
const server = http.createServer(routes.handler);

server.listen(3000);
