var modalBg = document.querySelector(".modal-bg");
var modalClose = document.querySelector("#modal-close");
var modalStart = document.querySelector("#startbtn");
var modalPause = document.querySelector("#pausebtn");
var text = document.querySelector("#writing");


function alertmess() {
  alert("Time's up ⏰! Remember to copy your work and refresh the screen to start over.");
}


modalClose.addEventListener('click', function () {
  modalBg.classList.remove('bg-active');
  document.getElementById("writing").disabled = false;
  alertmess();


});

// Word counter and modal timer 
function submitinput() {

  var count = document.getElementById('word-count').value;
  var min = document.getElementById("break-time").value;
  var time = parseInt(min) * 60000;

  console.log(count, min);

  document.querySelector("#writing")
    .addEventListener("keyup", function countWord() {
      var res = [];
      var str = this.value.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
      str.map((s) => {
        var trimStr = s.trim();
        if (trimStr.length > 0) {
          res.push(trimStr);
        }
      });
      document.querySelector("#show").innerText = res.length;
      var wordcount = res.length
      console.log(wordcount);

      if (wordcount >= count) {
        modalBg.classList.add('bg-active');
        document.getElementById("writing").disabled = true;
        function start() {
          cactus.classList.add("move");
        }
      }

      setTimeout(function () {
        modalBg.classList.remove('bg-active');
        document.getElementById("writing").disabled = false;
        cactus.classList.remove("move");
        alertmess();

      }, time);


    });

}

// Dino game

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
var score = 0;

modalStart.addEventListener('click', function () {
  cactus.classList.add("move");
});

modalPause.addEventListener('click', function () {
  cactus.classList.remove("move");
});


function jump() {
  if (dino.classList != "jump") {
    dino.classList.add("jump");

    setTimeout(function () {
      dino.classList.remove("jump");
    }, 400)
  }

}

//Score

let isAlive = setInterval(function () {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

  if (cactusLeft < 100 && cactusLeft > 50 && dinoTop >= 140) {
    score = score - 2;

    document.querySelector("#score").innerText = score;


  } else if (cactusLeft > 100 && dinoTop <= 140) {
    score = score + 1;
    document.querySelector("#score").innerText = score;
  }



}, 10);

document.addEventListener("keydown", function (event) {
  jump();
});



