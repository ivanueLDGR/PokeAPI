const { findPokeID } = require("./functions/getPokemons");
const getPokemons = require("./functions/getPokemons");
const express = require('express');
const axios = require('axios');
const server = express();

server.use(express.static('public'));

server.get('/', (req, res) =>{
 return res.json(getPokemons)
});

server.listen(3000, () => {
 console.log('funfa??')
});

/* const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); */

// const axios = require('axios');
