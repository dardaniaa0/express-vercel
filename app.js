const express = require('express');
//const helmet = require('helmet');
//const { ErrorResponseObject } = require('./common/http');
//const routes = require('./routes');

const app = express();
//const port = 3333;

//const express = require('express');
const request = require('request');
const searchResultParser = require('./search_result_parser');

app.get('/search', (endpointRequest, endpointResponse) => {
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

//app.use(express.json({ limit: '50mb' }));
//app.use(express.urlencoded({ extended: true, limit: '50mb' }));
//app.use(helmet());
//app.use('/', routes);

// default catch all handler
//app.all('*', (req, res) => res.status(404).json(new ErrorResponseObject('route not defined')));

module.exports = app;
