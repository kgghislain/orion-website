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
