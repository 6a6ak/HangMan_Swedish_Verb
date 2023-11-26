
//Options values for buttons
let options = {
  Start: [


    "VARA",  
    "HA",
    "G\u00D6RA",  
    "S\u00C4GA",  
    "G\u00c5",
    "TA",
    "SE", 
    "KOMMA", 
    "VILJA", 
    "F\u00c5", 
    "M\u00c5STE", 
    "KUNNA", 
    "B\u00D6RJA", 
    "VETA",  
    "K\u00C4NNA", 
    "TRO",
    "L\u00C4SA",  
    "SKRIVA",
    "SPELA", 
    "ARBETA",
    "LEVA",  
    "\u00C4TA",
    "DRICKA",
    "RESA",  
    "SOVA",  
    "GE",
    "F\u00D6LJA", 
    "HJ\u00C4LPA",
    "RINGA", 
    "PRATA", 
    "FR\u00c5GA", 
    "LYSSNA",
    "T\u00C4NKA", 
    "K\u00D6PA",  
    "S\u00C4LJA", 
    "V\u00C4LJA", 
    "GL\u00D6MMA",
    "MINNAS",
    "L\u00C4RA",  
    
/*
"\u00D6\u00C5\u00C4",
"\u00D6\u00C5\u00C4",
"\u00D6\u00C5\u00C4",
'ÖÅÄ',*/
  ],
  
};
//Initial References
const gametitle = document.getElementById("gametitle");
const LetterInput = document.getElementById("LetterInput");
const KeyBoard = document.getElementById("KeyBoard");
const NewGame = document.getElementById("NewGame");
const Restart = document.getElementById("Restart");
const canvas = document.getElementById("canvas");
const EndGame = document.getElementById("EndGame");


//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayOptions = () => {
  gametitle.innerHTML += `<h1>Hangman: Swedish Verbs Edition </h1>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options btn" onclick="generateWord('${value}')">${value}</button>`;
  }
  gametitle.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  NewGame.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValur matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
    button.style.display = "none";
  });

  //initially hide letters, clear previous word
  KeyBoard.classList.remove("hide");
  LetterInput.innerText = "";

  let optionArray = options[optionValue];

  //choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();
  
  console.log(chosenWord);
  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dash">_</span>');

  //Display each element as span
  LetterInput.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initially erase all content and hide letteres and new game button
  LetterInput.innerHTML = "";
  gametitle.innerHTML = "";
  KeyBoard.classList.add("hide");
  NewGame.classList.add("hide");
  KeyBoard.innerHTML = "";

  const swedishCharacters = [196, 197, 214];

  /*
  const lettersArray = ['Ö', 'Å', 'Ä'];
  const swedishCharacters = ['\u00C4', '\u00C5', '\u00D6'];
  const swedishCharacters = ['\u00F6', '\u00C5', '\u00C4'];
  */
  //For creating letter buttons
  for (let i = 65; i < 246|| swedishCharacters.includes(i); i++) {
    if (i > 90) {
      i = swedishCharacters.shift();
      if (!i) break;
    }
    /*
    if (i > 90) {
      let char = swedishCharacters.shift();
      if (!char) break;
      i = char.charCodeAt(0);
    }
    
    */


    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dash = document.getElementsByClassName("dash");

      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dash[index].innerText = char;
            //increment counter
            winCount += 1;
            //if winCount equals word lenfth
            if (winCount == charArray.length) {
              EndGame.innerHTML = `<h2 class='win-msg'>Good Job!</h2><p>Yes! the verb is <span>${chosenWord}</span></p>`;
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
          EndGame.innerHTML = `<h2 class='lose-msg'>Game Over!!!</h2><p>The verb was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    KeyBoard.append(button);
  }

  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#b6523c";
  context.lineWidth = 3;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
Restart.addEventListener("click", initializer);
window.onload = initializer;


let button = document.getElementById("change-bg-button");
let element = document.querySelector(".my-class");
/*
button.addEventListener("click", function() {
  element.style.background = "red";
});
*/








