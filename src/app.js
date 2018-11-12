const http = require('http'),
	path = require('path'),
	express = require('express'),
	appRoutes = require('./app.routes'),
  port = process.env.PORT || 8081;

const app = express();

app.set('port', port);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(appRoutes);

app.listen(app.get('port'), function() {
	console.log('Express server listening on port', app.get('port'));
});