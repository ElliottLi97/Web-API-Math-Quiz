var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startbutton = document.querySelector('#start-button');
var rightwrong = document.querySelector('#read');
var timeLeft = 101;
var gamestate = "notwon";
var questionarray = [
'(17 - 7) x 6 + 2 = ?<div id = "button-box"><button data-state="wrong">80</button><button data-state="wrong">23</button><button data-state="wrong">76</button><button data-state="correct">62</button></div><div id = "read"></div>',
'21 / 3 + 3 x 9 = ?<div id = "button-box"><button data-state="correct">34</button><button data-state="wrong">90</button><button data-state="wrong">21/30</button><button data-state="wrong">4</button></div><div id = "read"></div>',
'12 x 3 - 10 = ?<div id = "button-box"><button data-state="correct">26</button><button data-state="wrong">-84</button><button data-state="wrong">24</button><button data-state="wrong">15</button></div><div id = "read"></div>',
'9 + 10 = ?<div id = "button-box"><button data-state="wrong">29</button><button data-state="correct">19</button><button data-state="wrong">12</button><button data-state="wrong">17</button></div><div id = "read"></div>',
'9 x 9 = ?<div id = "button-box"><button data-state="correct">81</button><button data-state="wrong">9</button><button data-state="wrong">49</button><button data-state="wrong">36</button></div><div id = "read"></div>'
];
var name = localStorage.getItem("name");
var score = localStorage.getItem("score");
function countdown() {
  
    var timeInterval = setInterval(function () {
      if (gamestate == "notwon"){
        timeLeft--;
        timerEl.textContent = timeLeft + " seconds left.";

      if(timeLeft===1) {
        timerEl.textContent = timeLeft + " second left."
      }
  
      if(timeLeft < 0) {
        clearInterval(timeInterval);
        timerEl.textContent = ""
        gameover();
      }
    }
    }, 1000 );
  }

function gameover() {
  mainEl.innerHTML = "Time's up"  
}

function gamewin() {
  if(timeLeft > localStorage.getItem("score")){
    mainEl.innerHTML = '<div>You set the new high score! Enter your name to save it.<br><input type="name" name="name" id="name" placeholder="Enter your name here"/><button data-state="submit">Submit</button><button data-state="play">Play again?</button><button data-state="hof">Hall of Fame!</button></div>'
    timerEl.textContent = ""
    localStorage.setItem("score", timeLeft)
  }else{
    mainEl.innerHTML = '<div>Looks like you did not set a high score. Press play to try again.<br><button data-state="play">Play again?</button><button data-state="hof">Hall of Fame!</button></div>'
    timerEl.textContent = ""  
  }

}

startbutton.addEventListener("click", function(){
  gamestate = "notwon"
  countdown()
  randomquestion()
  document.getElementById("main").addEventListener('click', event => {
    var state = event.target.getAttribute("data-state")
    if (state === 'correct') {
      console.log('correct');
      randomquestion()
    }
    if (state === 'wrong') {
      console.log('wrong');
      subtracttime()
      document.querySelector('#read').textContent = "Wrong"
    }
    if(state === 'submit'){
      var name = document.querySelector("#name").value
      console.log("submitted")
      localStorage.setItem("name", name)
    }
    if(state === 'play'){
      timeLeft = 101
      gamestate = "notwon"
      randomquestion()
    }
    if(state === 'hof'){
      var name = localStorage.getItem("name");
      var score = localStorage.getItem("score");
      mainEl.innerHTML = '<p id="highscore"></p><button data-state="play">Play again?</button>'
      document.querySelector('#highscore').textContent = name + " has the current high score of " + score + "."
    }
  });
})

function subtracttime() {
  timeLeft = timeLeft - 5;
  timerEl.textContent = timeLeft + " seconds left.";
}

function randomquestion () {
  const randomIndex = Math.floor(Math.random() * questionarray.length)
  if(questionarray.length == 0){
    console.log("working")
    gamestate = "won"
    console.log(localStorage)
    questionarray = [
      '(17 - 7) x 6 + 2 = ?<div id = "button-box"><button data-state="wrong">80</button><button data-state="wrong">23</button><button data-state="wrong">76</button><button data-state="correct">62</button></div><div id = "read"></div>',
      '21 / 3 + 3 x 9 = ?<div id = "button-box"><button data-state="correct">34</button><button data-state="wrong">90</button><button data-state="wrong">21/30</button><button data-state="wrong">4</button></div><div id = "read"></div>',
      '12 x 3 - 10 = ?<div id = "button-box"><button data-state="correct">26</button><button data-state="wrong">-84</button><button data-state="wrong">24</button><button data-state="wrong">15</button></div><div id = "read"></div>',
      '9 + 10 = ?<div id = "button-box"><button data-state="wrong">29</button><button data-state="correct">19</button><button data-state="wrong">12</button><button data-state="wrong">17</button></div><div id = "read"></div>',
      '9 x 9 = ?<div id = "button-box"><button data-state="correct">81</button><button data-state="wrong">9</button><button data-state="wrong">49</button><button data-state="wrong">36</button></div><div id = "read"></div>'
    ]
    gamewin()
    return
  }
  mainEl.innerHTML = questionarray[randomIndex]
  questionarray.splice(randomIndex, 1)
}
