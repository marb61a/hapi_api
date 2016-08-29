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
    
    server.route({
        method : 'GET',
        path : '/bookmarks',
        handler : function(request, reply){
            let sort;
            
            if(request.query.sort === 'top'){
                sort ={
                    $sort : {
                        upvotes : -1
                    }
                };    
            } else {
                sort ={
                    $sort : {
                        created : -1
                    }
                };
            }
            
            db.bookmarks.aggregate({
                $project : {
                    title: 1,
                    url: 1,
                    created: 1,
                    upvotes: {
                        $size: '$upvoters'
                    }
                }    
            }, sort, (err, docs) => {
                if(err){
                    throw err;
                }
                
                docs.forEach(_renameAndClearFields);
                return reply(docs);
            });
        },
        
        config : {
            validate : {
                query : {
                    sort: Joi.string().valid('top', 'new').default('top')
                }
            }
        }
    });
    
};