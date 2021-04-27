var countDownDivs = document.getElementsByClassName("count-down-div");

var countDowns = [];

function displayCountDownValue(countDown) {
    countDown.para.innerText = countDown.currentValue+"";
}

function isCountDownHidden(countDown) {
    var style = window.getComputedStyle(countDown.para);
    if(style.display === "none") {
        return true;
    }
    var top = countDown.para.getBoundingClientRect().top;
    if(top < 0) {
        return true;
    }
    if(top > document.documentElement.clientHeight) {
        return true;
    }
}

function intervalFunction (countDown) {            
    if(countDown.currentValue < countDown.endValue) {
        displayCountDownValue(countDown);
        countDown.currentValue += countDown.step;
    }
    else {
        countDown.intervalHandle = undefined;
        clearInterval(countDown.intervalHandle);
    }
}

for(var i=0; i<countDownDivs.length; i++) {
    var countDownDiv = countDownDivs[i];

    var countDownPara = countDownDiv.querySelector(".count-down-p");
    var currentValue = parseInt(countDownDiv.querySelector(".count-down-start-value").innerText);
    var endValue = parseInt(countDownDiv.querySelector(".count-down-end-value").innerText);
    var timeInterval = parseInt(countDownDiv.querySelector(".count-down-time-interval").innerText);
    var step = parseInt(countDownDiv.querySelector(".count-down-step").innerText);

    var countDown = {
        index: i,
        para: countDownPara,
        currentValue: currentValue,
        startValue: currentValue,
        endValue: endValue,
        timeInterval: timeInterval,
        step: step,
        wasHidden: true
    };
    countDowns.push(countDown);
    countDown.intervalFunction = function (c) {
        console.log(c.index);
        intervalFunction(c)
    }
}

window.addEventListener("scroll", function () {
    countDowns.forEach(countDown => {
        if(!isCountDownHidden(countDown)) {
            if(countDown.wasHidden && countDown.intervalHandle == undefined) {
                countDown.wasHidden = false;
                countDown.currentValue = countDown.startValue;
                countDown.intervalHandle = setInterval(countDown.intervalFunction, timeInterval, countDown);
            }
        }
        else {
            countDown.wasHidden = true;
        }
    });
});
