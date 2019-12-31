// Express server

// Import packages
const path = require('path');
const fs = require('fs');
const express = require('express');

// Create app
const app = express();

// View engine
app.set('view engine', 'html');
app.engine('html', function(path, options, callbacks) {
    fs.readFile(path, 'utf-8', callback);
});

// Middleware
app.use(express.static(__dirname));

// Routes
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error Handler

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
});

// Serve app
const port = 8000;
app.listen(port, function() {
    console.log('running at my lovely localhost: ' + port);
});