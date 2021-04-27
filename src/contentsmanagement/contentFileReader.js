var fs = require('fs');
var parser = require('node-html-parser');
var {
    ContentSection,
    ContentSectionBlockForm,
    ContentSectionBlockFormInput,
    ContentSectionBlockFormSingleChoice
} = require('./contentSection');

var errorContentSection = new ContentSection("", "");
errorContentSection.addBlock(
    "", "", "",
    "Une erreur s'est produite");

function getNodeContentBySelector(block, selector, defaultReturn) {
    var node = block.querySelector(selector);
    if(node == null || node.text == "") {
        return defaultReturn;
    }
    else {
        return node.text;
    }
}

var readContentSectionFile = function (filename, callback) {
    fs.readFile(filename, 'utf8', function (err, data) {
        if(err) {
            console.log(err);
            callback(undefined, errorContentSection);
            return;
        }

        var root = parser.parse(data);
        var title = getNodeContentBySelector(root, "#section-title", undefined);
        var id = getNodeContentBySelector(root, "#section-id", undefined);
        var width = getNodeContentBySelector(root, "#section-width", undefined);
        var height = getNodeContentBySelector(root, "#section-height", undefined);
        var marginleft = getNodeContentBySelector(root, "#section-margin-left", undefined);
        var marginright = getNodeContentBySelector(root, "#section-margin-right", undefined);
        var margintop = getNodeContentBySelector(root, "#section-margin-top", undefined);
        var marginbottom = getNodeContentBySelector(root, "#section-margin-bottom", undefined);
        var opacity = getNodeContentBySelector(root, "#section-opacity", undefined);
        var alignself = getNodeContentBySelector(root, "#section-align-self", undefined);
        var section = new ContentSection(
            title,
            id,
            width,
            height,
            marginleft,
            marginright,
            margintop,
            marginbottom,
            opacity
        );
        section.setSelfFlexAlignment(alignself);

        var blocks = root.querySelectorAll(".section-block");
        for(var i=0; i<blocks.length; i++) {
            var block = blocks[i];
            var blockType = block.querySelector(".section-block-type").text;
            
            var blockImg = getNodeContentBySelector(block, ".section-block-img", undefined);
            var blockUrl = getNodeContentBySelector(block, ".section-block-url", undefined);
            var blockTitle = getNodeContentBySelector(block, ".section-block-title", undefined);
            var blockWidth = getNodeContentBySelector(block, ".section-block-width", undefined);
            var blockHeight = getNodeContentBySelector(block, ".section-block-height", undefined);
            var blockDescription = getNodeContentBySelector(block, ".section-block-description", undefined);

            var blockStartValue = getNodeContentBySelector(block, ".section-block-start-value", undefined);
            var blockEndValue = getNodeContentBySelector(block, ".section-block-end-value", undefined);
            var blockTimeInterval = getNodeContentBySelector(block, ".section-block-time-interval", undefined);
            var blockTextBefore = getNodeContentBySelector(block, ".section-block-text-before", undefined);
            var blockTextAfter = getNodeContentBySelector(block, ".section-block-text-after", undefined);
            var blockStep = getNodeContentBySelector(block, ".section-block-step", undefined);

            if(blockType == "block") {
                section.addBlock(
                    blockImg,
                    blockUrl,
                    blockTitle,
                    blockDescription,
                    blockWidth,
                    blockHeight);
            }
            else if(blockType == "blockCountDown") {
                section.addBlockCountDown(
                    blockStartValue,
                    blockEndValue,
                    blockTimeInterval,
                    blockTextBefore,
                    blockTextAfter,
                    blockStep,
                    blockWidth,
                    blockHeight);
            }
        }

        callback(undefined, section);
    })
}

module.exports = {readContentSectionFile}
