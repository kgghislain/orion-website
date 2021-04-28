var bgs = document.getElementsByClassName("background");
var currentBg = 0;
var parent = bgs[currentBg].parentNode;

function incrementCurrent () {
    currentBg++;
    if(currentBg >= bgs.length) {
        currentBg = 0;
    }
}

setInterval(function () {
    var prev = bgs.item(currentBg);
    incrementCurrent();
    bgs.item(currentBg).style.display = "block";
    bgs.item(currentBg).style.opacity = "1";
    prev.style.opacity = "0";
}, 5000);

