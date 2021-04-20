var fs = require('fs');
var parser = require('node-html-parser');
var {
    ContentSection,
    ContentSectionBlockForm,
    ContentSectionBlockFormInput,
    ContentSectionBlockFormSingleChoice
} = require('./contentSection');

var readContentSectionFile = function (filename, callback) {
    fs.readFile(filename, 'utf8', function (err, data) {
        if(err) {
            callback(err);
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
            var blockImg = block.querySelector(".section-block-img").text;
            var blockUrl = block.querySelector(".section-block-url").text;
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

        console.log(section);

        callback(undefined, section);
    })
}

module.exports = {readContentSectionFile}
