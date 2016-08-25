'use strict';

const Boom = require('boom');
const Bcrypt = require('bcrypt');
const Joi = require('joi');

exports.register = function(server, options, next){
    const db = server.app.db;
    
    server.route({
        method: 'POST',
        path: '/login',
        handler : function(request, reply){
            
        }
    });
    
    return next();
};

exports.register.attributes = {
    name: 'routes-auth',
    dependencies: ['db']
};