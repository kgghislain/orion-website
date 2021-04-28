
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
function ContentSectionBlockFormInput (name, type, label, required, value) {
    this.name = name;
    this.type = type;
    this.label = label;
    this.required = required;
    this.value = value;
};

/**
 * @param {string} label
 * @param {string} value
 */
function Choice (label, value, checked) {
    this.label = label;
    this.value = value;
    this.checked = checked;
}

/**
 * @param {string} name
 * @param {string} label
 * @param {Choice[]} choices
 * @param {boolean} required
 */
function ContentSectionBlockFormSingleChoice (name, label, choices) {
    this.name = name;
    this.type = "radio";
    this.label = label;
    this.choices = choices;
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
    /**
     * @param {ContentSectionBlockFormSingleChoice} choice
     */
    this.addSingleChoice = function (choice) {
        this.inputs.push(choice);
    }
};

/**
 * @param {string} title
 * @param {string} id
 */
function ContentSection (title, id, width, height, marginleft, marginright, margintop, marginbottom, opacity) {
    this.title = title;
    this.id = id;

    this.width = width;
    this.height = height;

    this.marginleft = marginleft;
    this.marginright = marginright;
    this.margintop = margintop;
    this.marginbottom = marginbottom;

    this.opacity = opacity;

    this.contentSectionBlocks = [];
    this.align = undefined;

    /**
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

    /**
    * @param {number} startValue
    * @param {number} endValue
    * @param {number} timeInterval in milliseconds
    */
    this.addBlockCountDown = function (startValue, endValue, timeInterval, textBefore, textAfter, step, width, height) {
        this.contentSectionBlocks.push({
            type: "blockCountDown",
            startValue, endValue, timeInterval, textBefore, textAfter, step, width, height
        })
    }

    /**
     * @param {string} align
     */
    this.setSelfFlexAlignment = function (align) {
        this.align = align;
    }
};

module.exports = {ContentSection, ContentSectionBlockForm, ContentSectionBlockFormInput, ContentSectionBlockFormSingleChoice};
