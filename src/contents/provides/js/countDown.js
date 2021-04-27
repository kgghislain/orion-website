var countDownDivs = document.getElementsByClassName("count-down-div");

var countDowns = [];

for(var i=0; i<countDownDivs.length; i++) {
    var countDownDiv = countDownDivs[i];

    var countDownPara = document.querySelector(".count-down-p");
    var currentValue = parseInt(countDownDiv.querySelector(".count-down-start-value").innerText);
    var endValue = parseInt(countDownDiv.querySelector(".count-down-end-value").innerText);
    var timeInterval = parseInt(countDownDiv.querySelector(".count-down-time-interval").innerText);
    var step = parseInt(countDownDiv.querySelector(".count-down-step").innerText);

    countDowns.push(
        {
            para: countDownPara,
            currentValue: currentValue,
            endValue: endValue,
            timeInterval: timeInterval,
            intervalHandle: intervalHandle,
            step: step
        }
    );
}

if(countDowns.length > 0) {
    function displayCountDownValue(countDown) {
        countDown.para.innerText = countDown.currentValue+"";
    }

    var intervalHandle = setInterval(function () {
        for(var i=0; i<countDowns.length; i++) {
            var countDown = countDowns[i];
            if(countDown.currentValue < countDown.endValue) {
                displayCountDownValue(countDown);
                countDown.currentValue += countDown.step;
            }
            else {
                countDowns.splice(i, 1);
            }
        }

        if(countDowns.lenght == 0) {
            endInterval();
        }
    }, timeInterval);

    function endCountDown (countDownIndex) {
        clearInterval(intervalHandle);
    }
}

