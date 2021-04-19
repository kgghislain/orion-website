function MenuBarSuperSubItem (name, url) {
    this.name = name;
    this.url = url;
    this.subSubItems = undefined;

    this.addSubSubItem = function (name, url) {
        if(this.subSubItems == undefined) {
            this.subSubItems = [];
        }
        this.subSubItems.push({name: name, url: url});
    }
}

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
    this.hasSubSubItems = undefined;
    
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

    /**
     * 
     * @param {MenuBarSuperSubItem} subItem 
     */
    this.addSuperSubItem = function (subItem) {
        if(this.subMenuItems == undefined) {
            this.subMenuItems = [];
        }
        this.subMenuItems.push(subItem);
        this.hasSubSubItems = 1;
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

module.exports = {MenuBar, MenuBarItem, MenuBarSuperSubItem};
