var context;
var radius;
var width;
var height;
var degree = 89;
var isFullToNew = true;

window.onload = function () {
    var canvas = document.getElementById("moonPhases");
    width = $("#moonPhases").width();
    height = $("#moonPhases").height();
    radius = width / 2;
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", width);
    context = canvas.getContext("2d");
    drawMainCircle();
    drawContextMoons("image");
    drawContextMoons("text");
    drawTextMoonFases();
    runAnimation(100);
};

function convertDegreesToRadius(degrees) {
    return degrees * Math.PI / 180;
}

function drawMainCircle() {
    context.fillStyle = "#1e4056";
    context.beginPath();
    context.arc(width / 2, width / 2, radius, 0, 2 * Math.PI, false);
    context.fill();
}

function drawContextMoons(drawType) {
    var angle;
    var angleDivisor = 13.5;
    var positionY = (drawType === "image") ? 0.75 : 0.9;
    var incrementDegree = 7;
    var currentDegree = 89;
    var isCounterClockwise = true;
    context.font = radius * 0.08 + "px arial";
    context.textAlign = "center";
    for (var fase = 1; fase <= 27; fase++) {
        angle = (fase - 1) * Math.PI / angleDivisor;
        context.rotate(angle);
        context.translate(0, -radius * positionY);
        context.rotate(-angle);
        context.lineWidth = "1";
        context.strokeStyle = "#1e4056";
        if (drawType === "image") {
            var isMiddlePassed = fase <= 15;
            context.fillStyle = isMiddlePassed ? "#062435" : "#fff";
            context.beginPath();
            context.arc(width / 2, height / 2, radius / 12, 0, 2 * Math.PI, false);
            context.fill();
            context.stroke();
            context.fillStyle = isMiddlePassed ? "#fff" : "#062435";
            context.beginPath();
            context.arc(width / 2, height / 2, radius / 12, (3 / 2 * Math.PI) + convertDegreesToRadius(currentDegree), (Math.PI / 2) - convertDegreesToRadius(currentDegree), isCounterClockwise);
            context.fill();
            context.stroke();
            if (fase < 14) {
                currentDegree = (currentDegree - incrementDegree * 2 > -89) ? currentDegree - incrementDegree * 2 : -89;
            } else {
                isCounterClockwise = false;
                currentDegree = (currentDegree + incrementDegree * 2 > 89) ? currentDegree + incrementDegree * 2 : 89;
            }
        } else {
            context.fillStyle = "#7a98a9";
            context.fillText(fase.toString(), width / 2, height / 1.95);
        }
        context.rotate(angle);
        context.translate(0, radius * positionY);
        context.rotate(-angle);
    }
}

function drawTextMoonFases() {
    context.fillStyle = "#51b1db";
    context.fillText("Full", width / 2, height / 4);
    context.fillText("New", width / 2, height / 1.25);
}

function drawAnimatedMoon() {
    context.fillStyle = isFullToNew ? "#fff" : "#062435";
    context.beginPath();
    context.arc(width / 2, width / 2, radius / 12, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
    context.fillStyle = isFullToNew ? "#062435" : "#fff";
    context.beginPath();
    context.arc(width / 2, width / 2, radius / 12, (3 / 2 * Math.PI) + convertDegreesToRadius(degree), (Math.PI / 2) - convertDegreesToRadius(degree), false);
    context.fill();
    degree--;
    if (degree < -89) {
        isFullToNew = !isFullToNew;
        degree = 89;
    }
}

function runAnimation(interval) {
    setInterval(drawAnimatedMoon, interval);
    context.closePath();
}