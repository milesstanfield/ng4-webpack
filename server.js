var express        = require('express');
var methodOverride = require('method-override');
var path           = require('path');
var compress       = require('compression');
var app            = express();
var port           = process.env.PORT || 3000;

// gzip
app.use(compress());
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// set the static files location
app.use(express.static(__dirname + '/dist'));
// route to handle all angular requests
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/dist/index.html'));
});

app.listen(port, function() {
  if (app.get('env') === 'development') {
    console.log('Magic happening at ' + 'http://localhost:' + port);
  }
});
