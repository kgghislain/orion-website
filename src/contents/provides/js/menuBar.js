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

function removeSubItem (currentOverItem) {
    subItems.forEach(sub => {
        if(sub.li == currentOverItem) {
            sub.sub.remove();
            currentOverItem = null;
        }
    });
}

var liWithSubs = document.getElementsByClassName("menu-bar-directions-li");
var directionsDiv = document.getElementsByClassName("menu-bar-directions-div")[0];
var subItems = [];
var isOverSub = false;
var currentOverItem = null;
for(var i=0; i<liWithSubs.length; i++) {
    var sub = liWithSubs[i].nextElementSibling;
    if(sub == null || sub.tagName != "DIV")
        continue;

    sub.onmouseenter = function () {
        isOverSub = true;
    }
    sub.onmouseleave = function () {
        isOverSub = false;
        removeSubItem(currentOverItem);
        currentOverItem = null;
    }

    subItems.push({li: liWithSubs[i], sub: sub});
    sub.remove();
    sub.classList.add("menu-bar-directions-li-suditem-div-visible");

    liWithSubs[i].addEventListener("mouseenter", function () {
        subItems.forEach(sub => {
            if(sub.li == this) {
                if(sub.li.parentNode.classList.contains("menu-bar-directions-ul-visible")) {
                    this.after(sub.sub);
                }
                else {
                    directionsDiv.after(sub.sub);
                    var rectThis = this.getBoundingClientRect();
                    sub.sub.style.left = rectThis.left+"px";
                }
            }
        });
    });

    liWithSubs[i].addEventListener("mouseleave", function () {
        currentOverItem = this;
        setTimeout(function () {
            if(isOverSub)
                return;
            removeSubItem(currentOverItem);    
        },
        300);
    });
}
