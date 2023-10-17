// <--------------------- BOX BUBBLES FUNCTION CODE --------------------->

let BUBBLE = document.querySelector(".bubble");
let box = document.querySelector(".box");
let bubbleMakeFunction = () => {
  for (i = 0; i < 152; i++) {
    let ranNum = Math.floor(Math.random() * 10);
    box.innerHTML += `<div class="bubble">${ranNum}</div>`;
  };
};
bubbleMakeFunction();




// <--------------------- BOX SCORE INCREASE FUNCTION CODE --------------------->

// THIS LOGIC WORKS ACCURATELY BUT DIDNT WORK FOR REFFRESHING NEW VALUES FOR BUBBLES DUE TO FOR EACH

// let array = Array.from(document.querySelector('.box').children);
// for(i=0; i<array.length; i++){
//     array[i].addEventListener('click', (details)=>{
//         let bubbleValue = details.target.textContent;
//         if (bubbleValue == ranHitNum) {
//             scoreValFunction();
//             hitNumFunc();
//             // box.innerHTML = "";
//             // bubbleMakeFunction();
//         }
//     });
// };




let gameFunc = () => {
  document.querySelector(".box").addEventListener("click", (elements) => {
    let bubbleNum = Number(elements.target.textContent);
    if (bubbleNum == ranHitNum) {
      scoreValFunction();
      hitNumFunc();
      box.innerHTML = "";
      bubbleMakeFunction();
    }
  });
};
gameFunc();




// <--------------------- BOX TIMER FUNCTION CODE --------------------->

let timer = document.querySelector(".timer").firstElementChild;
let time = 60;
let timeInterval = () => {
  let Interval = setInterval(() => {
    if (time > 0) {
      time--;
      timer.textContent = time;
    } else {
      clearInterval(Interval);
      document.querySelector('.box').innerHTML = `<h1>GAME OVER. YOU SCORED: ${scoreVal}</h1>`;
    }
  }, 1000);
};
timeInterval();




// <--------------------- BOX HIT FUNCTION CODE --------------------->

var ranHitNum;
let hitNumFunc = () => {
  let hit = document.querySelector(".hits").firstElementChild;
  ranHitNum = Math.floor(Math.random() * 10);
  hit.textContent = ranHitNum;
};
hitNumFunc();





// <--------------------- BOX SCORE FUNCTION CODE --------------------->

let score = document.querySelector(".score").firstElementChild;
let scoreVal = 0;
let scoreValFunction = ()=>{
    scoreVal += 10;
    score.textContent = scoreVal;
};





// <--------------------- SENTENCE TYPEWRITER CODE --------------------->

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};