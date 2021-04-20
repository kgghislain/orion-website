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

var readContentSectionFile = function (filename, callback) {
    fs.readFile(filename, 'utf8', function (err, data) {
        if(err) {
            console.log(err);
            callback(undefined, errorContentSection);
            return;
        }

        var root = parser.parse(data);
        var titleSpan = root.querySelector("#section-title");
        var idSpan = root.querySelector("#section-id");
        var section = new ContentSection(
            titleSpan.text,
            idSpan.text
        );

        var blocks = root.querySelectorAll(".section-block");
        for(var i=0; i<blocks.length; i++) {
            var block = blocks[i];
            var blockType = block.querySelector(".section-block-type").text;
            
            var blockImgNode = block.querySelector(".section-block-img");
            var blockImg;
            if(blockImgNode == null || blockImgNode.text == "") {
                blockImg = undefined;
            }
            else {
                blockImg = blockImgNode.text;
            }

            var blockUrlNode = lock.querySelector(".section-block-url");
            var blockUrl;
            if(blockImgNode == null || blockUrlNode.text == "") {
                blockUrl = undefined;
            }
            else {
                blockUrl = b.text;
            }

            var blockTitle = block.querySelector(".section-block-title").text;
            var blockWidth = block.querySelector(".section-block-width").text;
            var blockHeight = block.querySelector(".section-block-height").text;
            var blockDescription = block.querySelector(".section-block-description").innerHTML;

            if(blockType == "block") {
                section.addBlock(
                    blockImg,
                    blockUrl,
                    blockTitle,
                    blockDescription,
                    blockWidth,
                    blockHeight);
            }
        }

        callback(undefined, section);
    })
}

module.exports = {readContentSectionFile}
