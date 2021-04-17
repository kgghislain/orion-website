
function ContentSectionBlock (img, url, title, description, width, height) {
    this.type = "block";
    this.img = img;
    this.url = url;
    this.title = title;
    this.description = description;
    this.width = width;
    this.height = height;
};

/**
 * type can be any type that the html <input> tag can take as type.
 * Plus a textarea type.
 */
function ContentSectionBlockFormInput (name, type, label) {
    this.name = name;
    this.type = type;
    this.label = label;
};

/**
 * @param {string} action
 * @param {string} method
 * @param {string} title
 * @param {string} description
 * @param {string} submitName
 */
function ContentSectionBlockForm (action, method, title, description, submitName) {
    this.type = "blockContact";
    this.action = action;
    this.method = method;
    this.title = title;
    this.description = description;
    this.submitName = submitName;
    this.inputs = [];

    /**
     * @param {ContentSectionBlockFormInput[]} inputs
     */
    this.setInputs = function (inputs_) {
        this.inputs = inputs_;
    }
    /**
     * @param {ContentSectionBlockFormInput} input
     */
    this.addInput = function (input) {
        this.inputs.push(input);
    }
};

/**
 * @param {string} title
 * @param {string} id
 */
function ContentSection (title, id) {
    this.title = title;
    this.id = id;
    this.contentSectionBlocks = [];

    /**
     * 
     * @param {string} img 
     * @param {string} url 
     * @param {string} title 
     * @param {string} description 
     * @param {number} width 
     * @param {number} height 
     */
    this.addBlock = function (img, url, title, description, width, height) {
        this.contentSectionBlocks.push(
            new ContentSectionBlock(img, url, title, description, width, height)
        );
    }
    /**
     * @param {ContentSectionBlockForm} blockForm
     */
    this.addBlockForm = function (blockForm) {
        this.contentSectionBlocks.push(blockForm);
    }
};

module.exports = {ContentSection, ContentSectionBlockForm, ContentSectionBlockFormInput};
