'use strict';

const uuid = require('node-uuid');
const Joi = require('joi');
const Boom = require('boom');

exports.register = function (server, options, next){
    const db = server.app.db;

    const _renameAndClearFields = (doc) => {
        doc.id = doc._id;
        delete doc._id;

        delete doc.creator;
        delete doc.upvoters;
    };
    
};