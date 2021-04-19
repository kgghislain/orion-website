var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var TEXT = "<p><strong>Lorem ipsum</strong> dolor sit amet, consectetur adipisicing elit. Voluptatibus rerum praesentium alias libero officia fugiat qui, molestias nam sunt quasi ut commodi molestiae pariatur tempore reiciendis mollitia doloremque dicta dolore.</p>";
TEXT += "<p><strong>Lorem ipsum</strong> dolor sit amet, consectetur adipisicing elit. Voluptatibus rerum praesentium alias libero officia fugiat qui, molestias nam sunt quasi ut commodi molestiae pariatur tempore reiciendis mollitia doloremque dicta dolore.</p>";

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

/**
 * @param {number} current 
 */
function getMenuBar(current) {
    var menuItemServices = new MenuBarItem(
        "Services",
        "/services",
        current==2);
    menuItemServices.addSubMenuItem("Construction", "/services/construction");
    menuItemServices.addSubMenuItem("Travaux publics", "/services/travaux-public");
    menuItemServices.addSubMenuItem("Renovation", "/services/renovation");
    
    var menuBar = new MenuBar();
    menuBar.addItem(new MenuBarItem(
        "Acceuil", "/",
        current==0));
    menuBar.addItem(new MenuBarItem(
        "Qui somme nous ?", "/presentation",
        current==1));
    menuBar.addItem(menuItemServices);
    menuBar.addItem(
        new MenuBarItem("Nos realisations", "/projects",
        current==3));
    menuBar.addItem(new MenuBarItem(
        "Contact", "/contact",
        current==4));
    return menuBar;
}

app.get('/', (request, response) => {   

    var contentSectionActu = new ContentSection("Actualite", "id-actu");
    contentSectionActu.addBlock(
        undefined,
        undefined,
        "Devis de travaux",
        "Venez faire votre devis ici",
        30);
    contentSectionActu.addBlock(
        "/provides/assets/gurren_lagann.jpg",
        "#",
        "Architecture",
        "Nous avons des architectes.",
        30);
    contentSectionActu.addBlock(
        undefined,
        "#",
        "Gestion de chantier",
        "Venez confirmer la vrai gestion de chantier",
        30);

    var contentSectionText = new ContentSection("C'est quoi Orion", "id-intro");
    contentSectionText.addBlock(undefined, undefined, undefined, TEXT);

    response.render('directions/home', {
        menuBar: getMenuBar(0),
        contentSections: [
            contentSectionText,
            contentSectionActu
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
        menuBar: getMenuBar(4),
        contentSections: [
            contentSectionContact
        ]
    });
})

app.get('/presentation', (request, response) => {
    var contentSectionText = new ContentSection("Qui somme nous ?", "id-presentation");
    contentSectionText.addBlock(undefined, undefined, undefined,
        TEXT+"<br>"+TEXT);

    response.render('directions/presentation', {
        menuBar: getMenuBar(1),
        contentSections: [
            contentSectionText
        ]
    });
})

app.get('/projects', (request, response) => {
    var contentSectionText = new ContentSection("Nos realisations", "id-projects");
    contentSectionText.addBlock(undefined, undefined, undefined,
        "<h3>Realisation1</h3>"+"<br>"+TEXT);
    contentSectionText.addBlock(undefined, undefined, undefined,
        "<h3>Realisation2</h3>"+"<br>"+TEXT);
    contentSectionText.addBlock(undefined, undefined, undefined,
        "<h3>Realisation3</h3>"+"<br>"+TEXT);
    contentSectionText.addBlock(undefined, undefined, undefined,
        "<h3>Realisation4</h3>"+"<br>"+TEXT);

    response.render('directions/projects', {
        menuBar: getMenuBar(3),
        contentSections: [
            contentSectionText
        ]
    });
})

app.get('/mentions-legales', (request, response) => {
    var contentSectionText = new ContentSection("Mentions legales", "id-mentions-legales");
    contentSectionText.addBlock(undefined, undefined, undefined,
        "<h2>Realisation1</h2>"+"<br>"+TEXT);
    contentSectionText.addBlock(undefined, undefined, undefined,
        "<h2>Realisation2</h2>"+"<br>"+TEXT);
    contentSectionText.addBlock(undefined, undefined, undefined,
        "<h2>Realisation3</h2>"+"<br>"+TEXT);
    contentSectionText.addBlock(undefined, undefined, undefined,
        "<h2>Realisation4</h2>"+"<br>"+TEXT);

    response.render('directions/mentions-legales', {
        menuBar: getMenuBar(3),
        contentSections: [
            contentSectionText
        ]
    });
})

app.get('/services', (request, response) => {
    var contentSectionText = new ContentSection("Services", "id-services");
    contentSectionText.addBlock(undefined, undefined, undefined, TEXT);

    response.render('directions/services', {
        menuBar: getMenuBar(2),
        contentSections: [
            contentSectionText
        ]
    });
})
app.get('/services/construction', (request, response) => {
    var contentSectionText = new ContentSection("Constructions", "id-services-construction");
    contentSectionText.addBlock(undefined, undefined, undefined, TEXT);
    contentSectionText.addBlock(undefined, undefined, undefined, "<h3>"+TEXT+"</h3>");
    contentSectionText.addBlock(undefined, undefined, undefined, TEXT);

    response.render('directions/services/construction', {
        menuBar: getMenuBar(2),
        contentSections: [
            contentSectionText
        ]
    });
})
app.get('/services/travaux-public', (request, response) => {
    var contentSectionText1 = new ContentSection("Travaux publics 1", "id-services-travaux-public-1");
    contentSectionText1.addBlock(undefined, undefined, undefined, TEXT);
    contentSectionText1.addBlock(undefined, undefined, undefined, "<strong>"+TEXT+"</strong>");
    contentSectionText1.addBlock(undefined, undefined, undefined, TEXT);

    var contentSectionText2 = new ContentSection("Travaux publics 2", "id-services-travaux-public-2");
    contentSectionText2.addBlock(undefined, undefined, undefined, TEXT);
    contentSectionText2.addBlock(undefined, undefined, undefined, "<strong>"+TEXT+"</strong>");
    contentSectionText2.addBlock(undefined, undefined, undefined, TEXT);

    response.render('directions/services/travaux-public', {
        menuBar: getMenuBar(2),
        contentSections: [
            contentSectionText1,
            contentSectionText2
        ]
    });
})
app.get('/services/renovation', (request, response) => {
    var contentSectionText = new ContentSection("Renovation", "id-services-renovation");
    contentSectionText.addBlock(undefined, undefined, undefined, TEXT);
    contentSectionText.addBlock(undefined, undefined, undefined, TEXT);
    contentSectionText.addBlock(undefined, undefined, undefined, TEXT);

    response.render('directions/services/renovation', {
        menuBar: getMenuBar(2),
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
