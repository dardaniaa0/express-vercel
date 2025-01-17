const { Router } = require('express');
//const { SuccessResponseObject } = require('../common/http');
//const demo = require('./demo.route');

const express = require('express');
const request = require('request');
const searchResultParser = require('./search_result_parser');


const r = Router();

//r.use('/demo', demo);

//r.get('/', (req, res) => res.json(new SuccessResponseObject('express vercel boiler plate')));


r.get('/search', (endpointRequest, endpointResponse) => {
    let searchTerm = endpointRequest.query.term;
    
    request(`https://itunes.apple.com/search?term=${searchTerm}`, { json: true }, (searchError, searchResponse, searchBody) => {
        if (searchError) {
            endpointResponse.status(500);
            endpointResponse.json({errorMessage: 'Failed to search'});
            return console.log(searchError);
        }

        const results = searchBody.results;
        const endpointResponseData = searchResultParser.parse(results);

        endpointResponse.json(endpointResponseData);
    });
});



module.exports = r;
