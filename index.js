'use strict';

const Hapi = require('hapi');

// Create a server & a connection
const server = new Hapi.server();
server.connection({
    port : 3000
});

// Creating routes
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        return reply('Hello from hapi!');
    }    
});

