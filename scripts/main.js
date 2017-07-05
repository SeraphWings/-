window.onload = function() {
    init();
};

var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var gameMode;
var countSec =5;
var count;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var hardCards = document.querySelectorAll(".hardCard");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easyButton = document.querySelector('#easyButton');
var hardButton = document.querySelector('#hardButton');
var nightMareButton = document.querySelector('#nightMareButton');
var countDownDisplay = document.querySelector("#counter");

function init() {
    gameMode = 'easy';
    resetButton.style.display = "block";
    countDownDisplay.style.display = "none";
    initCards();
    reset();
}

function initCards()
{
    for (var i = 0; i < cards.length; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function() {
            if (gameOver)
                return;
            //grab color of clicked card
            var clickedColor = this.style.backgroundColor;
            // alert(this.style.backgroundColor);
            //compare color to pickedColor
            if (clickedColor === pickedColor)
            {
                if(gameMode === 'nightMare')
                {
                  clearInterval(count);
                  resetButton.style.display = "block";
                }
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset()
{
    if(gameMode === 'nightMare')
    {
      clearInterval(count);
      countSec = 5;
      resetButton.style.display = "none";
      countDownDisplay.style.display = "inline";
      count = setInterval(countDown,1000);
    }
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
}

resetButton.addEventListener("click", function() {
    reset();
})

easyButton.addEventListener("click",function()
{
  setEasy();
}
)

function setEasy()
{
  numCards = 3;
  resetButton.style.display = "block";
  countDownDisplay.style.display = "none";
  for (var i = 0; i < hardCards.length; i++) {
      //change each color to match given color
      hardCards[i].style.display = "none";
  }
  initCards();
  reset();
}

hardButton.addEventListener("click",function()
  {
      setHard();
  }
)

function setHard()
{
    gameMode ='hard';
    numCards = 6;
    resetButton.style.display = "block";
    countDownDisplay.style.display = "none";
    for (var i = 0; i < hardCards.length; i++) {
        //change each color to match given color
        hardCards[i].style.display = "block";
    }

    initCards();
    reset();
}

nightMareButton.addEventListener("click",function()
  {
      setNightMare();
  }
)

function setNightMare()
{
  gameMode = 'nightMare';
  countSec = 5;
  numCards = 6;
  resetButton.style.display = "block";
  countDownDisplay.style.display = "none";
  for (var i = 0; i < hardCards.length; i++) {
      //change each color to match given color
      hardCards[i].style.display = "block";
  }

  initCards();
  reset();
  resetButton.style.display = "none";
  countDownDisplay.style.display = "inline";
  // count = setInterval(countDown,1000);

}

function countDown()
{

  console.log(countSec);
  countDownDisplay.textContent = countSec;
  if(countSec === 0)
  {
    console.log("Zero");
    timeOut();
    clearInterval(count);

  }
  else if (countSec>0)
  {
    countSec--;
  }
  //  body.style.opacity = 1;

}

function timeOut()
{
  gameOver = true;
  messageDisplay.textContent = "TIME OUT!";
  changeColors("#FFF");
  body.style.backgroundColor = pickedColor;
  resetButton.style.display = "block";
  resetDisplay.textContent = "Play Again"
}

function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = []
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from  0 -255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from  0 -255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
