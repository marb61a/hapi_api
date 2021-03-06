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

// Register good plugin and then start the server
server.register({
    register : require("good"),
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    log: '*',
                    response: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, (err) => {

    if (err) {
        throw err;
    }

    // Starting the server
    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});
