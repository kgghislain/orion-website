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
    // var menuItemProjects = new MenuBarItem("Projets", "#", false);
    // menuItemProjects.addSubMenuItem("Services", "#");
    // menuItemProjects.addSubMenuItem("Services", "#");
    // menuItemProjects.addSubMenuItem("Services", "#");
    // menuItemProjects.addSubMenuItem("Services", "#");
    // menuItemProjects.addSubMenuItem("Services", "#");

    var menuItemServices = new MenuBarItem("Services", "/services", false);
    menuItemServices.addSubMenuItem("Construction", "#");
    menuItemServices.addSubMenuItem("Travaux publics", "#");
    menuItemServices.addSubMenuItem("Humidite", "#");
    menuItemServices.addSubMenuItem("Renovation", "#");
    menuItemServices.addSubMenuItem("Contact", "#");
    var menuBar = new MenuBar();
    menuBar.addItem(new MenuBarItem("Acceuil", "/", true));
    menuBar.addItem(menuItemServices);
    menuBar.addItem(new MenuBarItem("Qui somme nous ?", "/presentation", false));
    menuBar.addItem(new MenuBarItem("Contact", "/contact", false));
    menuBar.addItem(new MenuBarItem("Nos projets", "/projects", false));

    var contentSectionServices = new ContentSection("Services", "id-services");
    contentSectionServices.addBlock(
        undefined,
        undefined,
        "Devis de travaux",
        "Venez faire votre devis ici",
        30);
    contentSectionServices.addBlock(
        "/provides/assets/gurren_lagann.jpg",
        "#",
        "Architecture",
        "Nous avons des architectes.",
        30);
    contentSectionServices.addBlock(
        undefined,
        "#",
        "Gestion de chantier",
        "Venez confirmer la vrai gestion de chantier",
        30);

    var contentSectionText = new ContentSection("A Propos", "id-apropos");
    contentSectionText.addBlock(undefined, undefined, undefined, TEXT);

    response.render('directions/home', {
        menuBar: menuBar,
        contentSections: [
            contentSectionServices,
            contentSectionText
        ]
    });
});

app.use('/contactform', bodyParser.urlencoded({extended: true}));
app.use('/contactform', bodyParser.json());
app.post('/contactform', (request, response) => {
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

app.get('/contact', (request, response) => {
    var menuBar = new MenuBar();
    menuBar.addItem(new MenuBarItem("Acceuil", "/", false));
    menuBar.addItem(new MenuBarItem("Services", "/services", false));
    menuBar.addItem(new MenuBarItem("Qui somme nous ?", "/presentation", false));
    menuBar.addItem(new MenuBarItem("Contact", "/contact", true));
    menuBar.addItem(new MenuBarItem("Nos projets", "/projects", false));

    var contentSectionContact = new ContentSection("Nous contacter", "id-contact");
    var contactBlock = new ContentSectionBlockForm(
        "/contactform",
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
            "tel",
            "Telephone")
    );
    contactBlock.addInput(
        new ContentSectionBlockFormInput(
            "message",
            "textarea",
            "Message")
    );
    contentSectionContact.addBlockForm(contactBlock);

    response.render('directions/contact', {
        menuBar: menuBar,
        contentSections: [
            contentSectionContact
        ]
    });
})

app.get('/presentation', (request, response) => {
    var menuBar = new MenuBar();
    menuBar.addItem(new MenuBarItem("Acceuil", "/", false));
    menuBar.addItem(new MenuBarItem("Services", "/services", false));
    menuBar.addItem(new MenuBarItem("Qui somme nous ?", "/presentation", true));
    menuBar.addItem(new MenuBarItem("Contact", "/contact", false));
    menuBar.addItem(new MenuBarItem("Nos projets", "/projects", false));

    var contentSectionText = new ContentSection("A Propos", "id-presentation");
    contentSectionText.addBlock(undefined, undefined, undefined, TEXT);

    response.render('directions/presentation', {
        menuBar: menuBar,
        contentSections: [
            contentSectionText
        ]
    });
})

app.get('/projects', (request, response) => {
    var menuBar = new MenuBar();
    menuBar.addItem(new MenuBarItem("Acceuil", "/", false));
    menuBar.addItem(new MenuBarItem("Services", "/services", false));
    menuBar.addItem(new MenuBarItem("Qui somme nous ?", "/presentation", false));
    menuBar.addItem(new MenuBarItem("Contact", "/contact", false));
    menuBar.addItem(new MenuBarItem("Nos projets", "/projects", true));

    var contentSectionText = new ContentSection("A Propos", "id-projects");
    contentSectionText.addBlock(undefined, undefined, undefined, TEXT);

    response.render('directions/projects', {
        menuBar: menuBar,
        contentSections: [
            contentSectionText
        ]
    });
})

app.get('/services', (request, response) => {
    var menuBar = new MenuBar();
    menuBar.addItem(new MenuBarItem("Acceuil", "/", false));
    menuBar.addItem(new MenuBarItem("Services", "/services", true));
    menuBar.addItem(new MenuBarItem("Qui somme nous ?", "/presentation", false));
    menuBar.addItem(new MenuBarItem("Contact", "/contact", false));
    menuBar.addItem(new MenuBarItem("Nos projets", "/projects", false));

    var contentSectionText = new ContentSection("A Propos", "id-services");
    contentSectionText.addBlock(undefined, undefined, undefined, TEXT);

    response.render('directions/services', {
        menuBar: menuBar,
        contentSections: [
            contentSectionText
        ]
    });
})

let port = process.env.PORT;
if(port == null || port == "") {
    port = 8000;
}
console.log("server is starting on port "+port+" ...");
app.listen(port);
console.log("Server started");
