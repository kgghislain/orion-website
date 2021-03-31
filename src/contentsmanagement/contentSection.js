
function ContentSectionBlock (img, title, description) {
    this.type = "block";
    this.img = img;
    this.title = title;
    this.description = description;
};

function ContentSectionBlockContact (action, method, title, description) {
    this.type = "blockContact";
    this.action = action;
    this.method = method;
    this.title = title;
    this.description = description;
};

function ContentSection (title) {
    this.title = title;
    this.contentSectionBlocks = [];

    this.addBlock = function (img, title, description) {
        this.contentSectionBlocks.push(new ContentSectionBlock(img, title, description));
    }
    this.addBlockContact = function (action, method, title, description) {
        this.contentSectionBlocks.push(new ContentSectionBlockContact(action, method, title, description));
    }
};

module.exports = ContentSection;