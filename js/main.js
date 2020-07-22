var gameOver = $("#gameOver");
var tryAgainBtn = $("#tryAgainBtn");
var counterRed = $("#counterRed");
var counterYellow = $("#counterYellow");
var counterGreen = $("#counterGreen");

tryAgainBtn.on('click', function(){
    resetGame();
    gameOver.hide();
});

var red = $(".red")[0];
var yellow = $(".yellow")[0];
var green = $(".green")[0];

function setLight(element, turnOn){
    if(turnOn == true){
        element.style.opacity = '1';
    }else{
        element.style.opacity = '0.3';
    }
}

var colors = [red, yellow, green];
var counters = [counterRed, counterYellow, counterGreen];
var colorsTimes = [2, 1, 3];
var isCarDriving = false;

/**
 * Функция colors массивинин ичиндеги өңдөрдү алмаштыруу үчүн колдонулат
 * i переменыйы азыркы учурда күюп жаткан өң үчүн колдонулат
 */
var i = 0;
var timout = 0;
function count(){
    counterYellow.text(timout);
    timout--;
    if(timout > 0){
        setTimeout(count, 1000);
    }
}
function changeColor(){
    if(i - 1 == 0 && isCarDriving == true){
        gameOver.show();
    }
    // эгерде i баштапкы өң болбосо анда муркну өңдү өчүрүү
    // эгерде i баштапкы өң болсо анда эң аякы өңдү өчүрүү
    if(i != 0){
        if(i - 1 != 1){
            setLight(colors[i - 1], false);
        }
    }else{
        setLight(colors[colors.length - 1], false);
    }
    // азыркы өңдү күйгүзүү
    setLight(colors[i], true);
    timout = colorsTimes[i];
    count();
    
    setTimeout(changeColor, colorsTimes[i]*1000);
    // i көбөйтүү, кийинки өңдү күйгүзүү максатында
    // i аягына жеткен болсо, анда аны кайра биринчиге которуу
    if(i == colors.length - 1){
        i = 0;
    }else{
        i++;
    }

}


// var changeColorBtn = document.getElementById("changeColorBtn");
// changeColorBtn.addEventListener('click', changeColor);

// setInterval(changeColor, 1000);
// setTimeout(changeColor, 1000);

changeColor();

var car = document.getElementById('car');
var frontWheel = document.getElementById('frontWheel');
var backWheel = document.getElementById('backWheel');
var road = document.getElementById('road');
var city = document.getElementById('city');

function driveCar(event){
    // console.log(event.keyCode);
    if(event.keyCode == 37){
        console.log("left key pressed");
    }else if(event.keyCode == 38){
        console.log("up key pressed");
        car.style.animation = '1s car infinite';
        frontWheel.style.animation = '1s wheels linear infinite';
        backWheel.style.animation = '1s wheels linear infinite';
        road.style.animation = '3s road linear infinite';
        city.style.animation = '3s city linear infinite';
        isCarDriving = true;
    }else if(event.keyCode == 39){
        console.log("right key pressed");
    }else if(event.keyCode == 40){
        car.style.animation = 'none';
        frontWheel.style.animation = 'none';
        backWheel.style.animation = 'none';
        road.style.animation = 'none';
        city.style.animation = 'none';
        isCarDriving = false;
        console.log("down key pressed");
    }
}

function resetGame(){
    car.style.animation = 'none';
    frontWheel.style.animation = 'none';
    backWheel.style.animation = 'none';
    road.style.animation = 'none';
    city.style.animation = 'none';
    isCarDriving = false;
    i = 0;
}


document.onkeydown = driveCar;
