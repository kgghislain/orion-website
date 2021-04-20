var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var TEXT = "<p><strong>Lorem ipsum</strong> dolor sit amet, consectetur adipisicing elit. Voluptatibus rerum praesentium alias libero officia fugiat qui, molestias nam sunt quasi ut commodi molestiae pariatur tempore reiciendis mollitia doloremque dicta dolore.</p>";
TEXT += "<p><strong>Lorem ipsum</strong> dolor sit amet, consectetur adipisicing elit. Voluptatibus rerum praesentium alias libero officia fugiat qui, molestias nam sunt quasi ut commodi molestiae pariatur tempore reiciendis mollitia doloremque dicta dolore.</p>";

var {
    ContentSection,
    ContentSectionBlockForm,
    ContentSectionBlockFormInput,
    ContentSectionBlockFormSingleChoice
} = require('./src/contentsmanagement/contentSection');
var {
    MenuBar,
    MenuBarItem,
    MenuBarSuperSubItem
} = require('./src/contentsmanagement/menuBar');
var ContentReader = 
    require('./src/contentsmanagement/contentFileReader');

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

    var constructionItem = new MenuBarSuperSubItem("Construction", "/services/construction");
    constructionItem.addSubSubItem("Maisons Design", "/services/construction/#id-maison-design");
    constructionItem.addSubSubItem("Maisons Individuelles", "/services/construction/#id-maison-individuelle");
    constructionItem.addSubSubItem("Maisons Modernes", "/services/construction/#id-maison-moderne");
    constructionItem.addSubSubItem("Permit de construire", "/services/construction/#id-permit-construire");
    constructionItem.addSubSubItem("Realisations", "/services/construction/#id-realisations");
    var assainissementItem = new MenuBarSuperSubItem("Assainissement", "/services/assainissement");
    assainissementItem.addSubSubItem("Mise en conformite", "/services/assainissement/#id-mise-en-conformite");
    assainissementItem.addSubSubItem("Separation de reseaux", "/services/assainissement/#id-separation-reseaux");
    assainissementItem.addSubSubItem("Terrassement", "/services/assainissement/#id-terrassement");
    assainissementItem.addSubSubItem("VRD", "/services/assainissement/#id-vrd");
    assainissementItem.addSubSubItem("Realisations", "/services/assainissement/#id-realisations");
    var renovationItem = new MenuBarSuperSubItem("Renovation", "/services/renovation");
    renovationItem.addSubSubItem("Agencements exterieur", "/services/renovation/#id-agencement-exterieur")
    renovationItem.addSubSubItem("Agencements interieur", "/services/renovation/#id-agencement-interieur")
    renovationItem.addSubSubItem("Realisations", "/services/renovation/#id-realisations")

    menuItemServices.addSuperSubItem(constructionItem);
    menuItemServices.addSuperSubItem(assainissementItem);
    menuItemServices.addSuperSubItem(renovationItem);
    
    var menuBar = new MenuBar();
    menuBar.addItem(new MenuBarItem(
        "Acceuil", "/",
        current==0));
    menuBar.addItem(new MenuBarItem(
        "Qui somme nous ?", "/presentation",
        current==1));
    menuBar.addItem(menuItemServices);
    menuBar.addItem(new MenuBarItem(
        "Contact", "/contact",
        current==4));
    return menuBar;
}

app.get('/', (request, response) => {
    ContentReader.readContentSectionFile("contents/P-acceuil/S-orion.html", 
    function (err, sectionOrion) {
        if(err) return;
        ContentReader.readContentSectionFile("contents/P-acceuil/S-actualites.html",
        function (err, sectionActu) {
            if(err) return;
            response.render('directions/home', {
                menuBar: getMenuBar(0),
                contentSections: [
                    sectionActu,
                    sectionOrion
                ]
            });
        });
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
    var contactLocationStr = request.body.ville;
    if(request.body.codepostal) {
        contactLocationStr = request.body.codepostal+" "+contactLocationStr;
    }
    if(request.body.adresse) {
        contactLocationStr = request.body.adresse+" "+contactLocationStr;
    }

    var visitortypeStr = request.body.visitortype;
    if(request.body.entreprise) {
        visitortypeStr += ("\nentreprise :" + request.body.entreprise)
    }

    var mailOptions = {
        from: 'gumeteapps@gmail.com',
        to: 'gumeteapps@gmail.com',
        subject: 'Message de '+ request.body.nom,
        text:
            "From : " + request.body.nom + " " + request.body.prenom + "\n" + 
            "Telephone : " + request.body.phone + "\n" + 
            "Email: " + request.body.email + "\n" +
            "Adresse: " + contactLocationStr + "\n" +
            visitortypeStr+ "\n" +
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
            "Prenom *",
            true)
    );
    contactBlock.addInput(
        new ContentSectionBlockFormInput(
            "nom",
            "text",
            "Nom *",
            true)
    );
    contactBlock.addInput(
        new ContentSectionBlockFormInput(
            "email",
            "email",
            "Email *",
            true)
    );
    contactBlock.addInput(
        new ContentSectionBlockFormInput(
            "phone",
            "tel",
            "Telephone",
            true)
    );
    contactBlock.addInput(
        new ContentSectionBlockFormInput(
            "adresse",
            "text",
            "Adresse")
    );
    contactBlock.addInput(
        new ContentSectionBlockFormInput(
            "codepostal",
            "text",
            "Code postal")
    );
    contactBlock.addInput(
        new ContentSectionBlockFormInput(
            "ville",
            "text",
            "Ville *",
            true)
    );
    contactBlock.addInput(
        new ContentSectionBlockFormInput(
            "message",
            "textarea",
            "Message")
    );
    contactBlock.addSingleChoice(
        new ContentSectionBlockFormSingleChoice(
            "visitortype",
            "Vous etes ?",
            [
                {label: "Professionnel", value: "professionnel", checked: "checked"},
                {label: "Particulier", value: "particulier"},
                {label: "Locataire", value: "locataire"}
            ])
    );
    contactBlock.addInput(
        new ContentSectionBlockFormInput(
            "entreprise",
            "text",
            "Entreprise")
    );
    contentSectionContact.addBlockForm(contactBlock);
    contentSectionContact.setSelfFlexAlignment("center");

    response.render('directions/contact', {
        menuBar: getMenuBar(4),
        contentSections: [
            contentSectionContact
        ]
    });
})

app.get('/presentation', (request, response) => {
    ContentReader.readContentSectionFile("contents/P-presentation/S-presentation.html", 
    function (err, sectionPresentation) {
        if(err) return;
        response.render('directions/presentation', {
            menuBar: getMenuBar(1),
            contentSections: [
                sectionPresentation
            ]
        });
    });
})

app.get('/mentions-legales', (request, response) => {
    ContentReader.readContentSectionFile("contents/P-mentions-legales/S-mentions-legales.html", 
    function (err, sectionMentionLegale) {
        if(err) return;
        response.render('directions/mentions-legales', {
            menuBar: getMenuBar(3),
            contentSections: [
                sectionMentionLegale
            ]
        });
    });
})

app.get('/services', (request, response) => {
    ContentReader.readContentSectionFile("contents/P-services/S-services.html", 
    function (err, sectionServices) {
        if(err) return;
        response.render('directions/services', {
            menuBar: getMenuBar(2),
            contentSections: [
                sectionServices
            ]
        });
    });
})
app.get('/services/construction', (request, response) => {
    ContentReader.readContentSectionFile("contents/C-services/P-construction/S-maison-design.html", 
    function (err, sectionMaisonDesign) {
        if(err) return;

        ContentReader.readContentSectionFile("contents/C-services/P-construction/S-maison-individuelle.html", 
        function (err, sectionMaisonIndividuelle) {
            if(err) return;
            
            ContentReader.readContentSectionFile("contents/C-services/P-construction/S-maison-moderne.html", 
            function (err, sectionMaisonModerne) {
                if(err) return;
                
                ContentReader.readContentSectionFile("contents/C-services/P-construction/S-permit-construire.html", 
                function (err, sectionPermitConstruire) {
                    if(err) return;
                    
                    ContentReader.readContentSectionFile("contents/C-services/P-construction/S-realisations.html", 
                    function (err, sectionRealisations) {
                        if(err) return;
                        
                        response.render('directions/services', {
                            menuBar: getMenuBar(2),
                            contentSections: [
                                sectionMaisonModerne,
                                sectionMaisonIndividuelle,
                                sectionMaisonDesign,
                                sectionPermitConstruire,
                                sectionRealisations
                            ]
                        });
                    });
                });
            });
        });
    });
})
app.get('/services/assainissement', (request, response) => {

    ContentReader.readContentSectionFile("contents/C-services/P-assainissement/S-mise-en-conformite.html", 
    function (err, sectionMiseConformite) {
        if(err) return;

        ContentReader.readContentSectionFile("contents/C-services/P-assainissement/S-separation-reseaux.html", 
        function (err, sectionSeparationReseaux) {
            if(err) return;
            
            ContentReader.readContentSectionFile("contents/C-services/P-assainissement/S-terrassement.html", 
            function (err, sectionTerrassement) {
                if(err) return;
                
                ContentReader.readContentSectionFile("contents/C-services/P-assainissement/S-vrd.html", 
                function (err, sectionVRD) {
                    if(err) return;
                    
                    ContentReader.readContentSectionFile("contents/C-services/P-assainissement/S-realisations.html", 
                    function (err, sectionRealisations) {
                        if(err) return;
                        
                        response.render('directions/services', {
                            menuBar: getMenuBar(2),
                            contentSections: [
                                sectionMiseConformite,
                                sectionSeparationReseaux,
                                sectionTerrassement,
                                sectionVRD,
                                sectionRealisations
                            ]
                        });
                    });
                });
            });
        });
    });
})
app.get('/services/renovation', (request, response) => {
    
    ContentReader.readContentSectionFile("contents/C-services/P-renovation/S-agencement-exterieur.html", 
    function (err, sectionAgencementInterieur) {
        if(err) return;
        
        ContentReader.readContentSectionFile("contents/C-services/P-renovation/S-agencement-interieur.html", 
        function (err, sectionAgencementExterieur) {
            if(err) return;
            
            ContentReader.readContentSectionFile("contents/C-services/P-renovation/S-realisations.html", 
            function (err, sectionRealisations) {
                if(err) return;
                
                response.render('directions/services', {
                    menuBar: getMenuBar(2),
                    contentSections: [
                        sectionAgencementExterieur,
                        sectionAgencementInterieur,
                        sectionRealisations
                    ]
                });
            });
        });
    });
})

let port = process.env.PORT;
if(port == null || port == "") {
    port = 8000;
}
console.log("server is starting on port "+port+" ...");
app.listen(port);
console.log("Server started");
