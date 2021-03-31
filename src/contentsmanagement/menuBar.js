function MenuBarItem (name, url) {
    this.name = name;
    this.url = url;
}

function MenuBar () {
    this.menuBarItems = [];
    this.addItem = function (name, url) {
        this.menuBarItems.push(new MenuBarItem(name, url));
    }
}

module.exports = MenuBar;
