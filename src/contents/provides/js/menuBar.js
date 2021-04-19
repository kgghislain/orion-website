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
    if(currentOverItem == null)
        return;
    subItems.forEach(sub => {
        if(sub.li == currentOverItem) {
            sub.sub.remove();
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
            removeSubItem(currentOverItem);
            if(sub.li == this) {
                if(sub.li.parentNode.classList.contains("menu-bar-directions-ul-visible")) {
                    var rect = sub.li.getBoundingClientRect();
                    sub.li.parentNode.after(sub.sub);
                    // sub.sub.style.top = rect.top+"px";
                    // sub.sub.style.right = rect.right+"px";
                }
                else {
                    directionsDiv.after(sub.sub);
                    var rectThis = this.getBoundingClientRect();
                    var rect = sub.sub.getBoundingClientRect();
                    var middle = Math.abs(rect.right - rect.left)/2;
                    sub.sub.style.left = (rectThis.left-middle)+"px";
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
            currentOverItem = null;
        },
        300);
    });
}
