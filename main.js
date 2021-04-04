var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var TEXT = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus rerum praesentium alias libero officia fugiat qui, molestias nam sunt quasi ut commodi molestiae pariatur tempore reiciendis mollitia doloremque dicta dolore.";

var {
    ContentSection,
    ContentSectionBlockForm,
    ContentSectionBlockFormInput
} = require('./src/contentsmanagement/contentSection');
var {
    MenuBar,
    MenuBarItem
} = require('./src/contentsmanagement/menuBar');

app.set('view engine', 'ejs');
app.set('views', './src/contents/views');
app.use("/provides", express.static("./src/contents/provides"));

console.log("Server is starting ... ");

app.get('/', (request, response) => {
    var menuBar = new MenuBar();
    menuBar.addItem(new MenuBarItem("Acceuil", "/", true));
    menuBar.addItem(new MenuBarItem("Services", "#id-services", false));
    menuBar.addItem(new MenuBarItem("A Propos", "#", false));
    menuBar.addItem(new MenuBarItem("Projets", "#", false));
    menuBar.addItem(new MenuBarItem("Contact", "#id-contact", false));

    var contentSectionServices = new ContentSection("Services", "id-services");
    contentSectionServices.addBlock(
        undefined,
        "Devis de travaux",
        "Venez faire votre devis ici",
        30);
    contentSectionServices.addBlock(
        "/provides/assets/gurren_lagann.jpg",
        "Architecture",
        "Nous avons des architectes.",
        30);
    contentSectionServices.addBlock(
        undefined,
        "Gestion de chantier",
        "Venez confirmer la vrai gestion de chantier",
        30);
    var contentSectionContact = new ContentSection("Contact us", "id-contact");
    var contactBlock = new ContentSectionBlockForm(
        "/contact",
        "post",
        "Nous contacter",
        "Veuillez nous envoyer un message pour toute demande de devis ou d'information",
        "Emvoyer");

    contactBlock.addInput(
        new ContentSectionBlockFormInput(
            "prenom",
            "text",
            "Prenom")
    );
    contactBlock.addInput(
        new ContentSectionBlockFormInput(
            "nom",
            "text",
            "Nom")
    );
    contactBlock.addInput(
        new ContentSectionBlockFormInput(
            "email",
            "email",
            "Email")
    );
    contactBlock.addInput(
        new ContentSectionBlockFormInput(
            "phone",
            "Number",
            "Telephone")
    );
    contactBlock.addInput(
        new ContentSectionBlockFormInput(
            "message",
            "textarea",
            "Message")
    );
    contentSectionContact.addBlockForm(contactBlock);

    var contentSectionText = new ContentSection("A Propos", "id-apropos");
    contentSectionText.addBlock(undefined, undefined, TEXT);

    response.render('directions/home', {
        menuBar: menuBar,
        contentSections: [
            contentSectionServices,
            contentSectionText,
            contentSectionContact
        ]
    });
});

app.use('/contact', bodyParser.urlencoded({extended: true}));
app.use('/contact', bodyParser.json());
app.post('/contact', (request, response) => {
    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gumeteapps@gmail.com',
            pass: ''
        }
    });
    var mailOptions = {
        from: 'gumeteapps@gmail.com',
        to: 'gumeteapps@gmail.com',
        subject: 'Message de '+ request.body.nom,
        text:
            "From : " + request.body.nom + " " + request.body.prenom + "\n" + 
            "Telephone : " + request.body.phone + "\n" + 
            "Email: " + request.body.email + 
            "\n" + 
            request.body.message
    };
    transporter.sendMail(
        mailOptions,
        function (error, info) {
            if(error) {
                console.log(error);
            }
            else {
                console.log("Email sent : ");
            }
        }
    );
    response.redirect('/#id-contact');
});

let port = process.env.PORT;
if(port == null || port == "") {
    port = 8000;
}
console.log("server is starting on port "+port+" ...");
app.listen(port);
console.log("Server started");
