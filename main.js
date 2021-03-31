var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// var db = new require('./src/database/pghandler.js');
// db.connect();

app.set('view engine', 'ejs');
// Link the ./src/contents/provides directory to provides/ name 
app.use('./src/contents/provides', express.static('provides'));
app.use('./src/contents/views', express.static('views'));

console.log("Server is starting ... ");

app.get('/', (request, response) => {
    response.send("Server started successfully.");
});

let port = process.env.PORT;
if(port == null || port == "") {
    port = 8000;
}
console.log("server is starting on port "+port+" ...");
app.listen(port);
console.log("Server started");
