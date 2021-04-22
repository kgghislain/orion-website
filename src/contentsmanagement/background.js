function Background() {
    this.backgrounds = [];

    /**
     * @param {number} fadingTimeSeconds 
     * @param {string} img 
     */
    this.addBackground = function (fadingTimeSeconds, img) {
        this.backgrounds.push({
            fadingTime: fadingTimeSeconds,
            img: img});
    }
}

module.exports = {Background};
