var buttons = document.getElementsByClassName("menu-bar-button");
for(var i=0; i<buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        var ul = this.parentNode.querySelector("ul");
        if(ul.classList.contains("menu-bar-directions-ul")) {
            ul.classList.remove("menu-bar-directions-ul");
            ul.classList.add("menu-bar-directions-ul-visible");
        }
        else {
            ul.classList.add("menu-bar-directions-ul");
            ul.classList.remove("menu-bar-directions-ul-visible");
        }
    });
}

var liWithSubs = document.getElementsByClassName("menu-bar-directions-li");
for(var i=0; i<liWithSubs.length; i++) {
    liWithSubs[i].addEventListener("mouseover", function () {
        var div = this.querySelector("ul");
        if(div.classList.contains("menu-bar-directions-li-suditem-div")) {
            div.classList.remove("menu-bar-directions-li-suditem-div");
            div.classList.add("menu-bar-directions-li-suditem-div-visible");
        }
        else {
            div.classList.add("menu-bar-directions-li-suditem-div");
            div.classList.remove("menu-bar-directions-li-suditem-div-visible");
        }
    });
}
