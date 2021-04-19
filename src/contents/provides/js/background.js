var bgs = document.getElementsByClassName("background");
var currentBg = 0;
var parent = bgs[currentBg].parentNode;

for(var i=1; i<bgs.length; i++) {
    bgs.item(i).style.display = "none";
}

function incrementCurrent () {
    currentBg++;
    if(currentBg >= bgs.length) {
        currentBg = 0;
    }
} 

setInterval(function () {
    console.log(bgs.length);
    var prev = bgs.item(currentBg);
    incrementCurrent();
    bgs.item(currentBg).style.display = "block";
    prev.style.display = "none";
}, 5000);
