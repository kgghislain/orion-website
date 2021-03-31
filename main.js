var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var ContentSection = require('./src/contentsmanagement/contentSection');
var MenuBar = require('./src/contentsmanagement/menuBar');

// var db = new require('./src/database/pghandler.js');
// db.connect();

app.set('view engine', 'ejs');
// Link the ./src/contents/provides directory to provides/ name 
app.use('./src/contents/provides', express.static('provides'));
app.set('views', './src/contents/views');
app.set('provides', './src/contents/provides');

console.log("Server is starting ... ");

app.get('/', (request, response) => {
    var menuBar = new MenuBar();
    menuBar.addItem("Acceuil");
    menuBar.addItem("Services");
    menuBar.addItem("A Propos");
    menuBar.addItem("Contact");
    menuBar.addItem("Projets");

    var contentSectionServices = new ContentSection("Services");
    contentSectionServices.addBlock(
        "assets/Logo.ai",
        "Devis de travaux",
        "Venez faire votre devis ici");
    contentSectionServices.addBlock(
        "assets/Logo.ai",
        "Architecture",
        "Nous avons des architectes.");
    contentSectionServices.addBlock(
        "assets/Logo.ai",
        "Gestion de chantier",
        "Venez confirmer la vrai gestion de chantier");
    var contentSectionContact = new ContentSection("Contact us");
    contentSectionContact.addBlockContact(
        "/contact",
        "POST",
        "Nous contacter",
        "Veuillez nous envoyer un message pour toute demande de devis ou d'information");
    response.render('directions/home', {
        menuBar: menuBar,
        contentSections: [
            contentSectionServices,
            contentSectionContact
        ]
    });
});

app.post('/contact', (request, response) => {
    response.redirect('/');
});

let port = process.env.PORT;
if(port == null || port == "") {
    port = 8000;
}
console.log("server is starting on port "+port+" ...");
app.listen(port);
console.log("Server started");
