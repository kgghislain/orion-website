/**
 * @param {string} name 
 * @param {string} url 
 * @param {boolean} active 
 */
function MenuBarItem (name, url, active_) {
    this.name = name;
    this.url = url;
    this.active = 1;
    if(active_) {
        this.active = 0;
    }
    this.subMenuItems = undefined;
    
    /**
     * @param {string} name 
     * @param {string} url 
     */
    this.addSubMenuItem = function (name, url) {
        if(this.subMenuItems == undefined) {
            this.subMenuItems = [];
        }
        this.subMenuItems.push({name, url});
    }
}

function MenuBar () {
    this.menuBarItems = [];

    /**
     * @param {MenuBarItem} item
     */
    this.addItem = function (item) {
        this.menuBarItems.push(item);
    }
}

module.exports = {MenuBar, MenuBarItem};
