
var wordlist; 
var selectedWord; 
var letterBoxes; 
var hangmanImg; 
var hangmanImgNr; 
var msgElem; 
var startGameBtn;
var letterButtons;
var startTime; 

function init(){
  startGameBtn = document.getElementById("startGameBtn").onclick = startGame;
  
  letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");
    for ( var i=0; i < letterButtons.length; i++){
      letterButtons[i].onclick = guessLetter;
    } 
  hangmanImg = document.getElementById("hangman");
  msgElem = document.getElementById("message");
  

	wordList = ["FLOWER","TRUCK","GARBAGE","COFFEETABLE","STEREO","WINTER","SUMMER","COMPUTER","LION","ELEPHANT","CHRISTMAS","EASTEREGG","CAR","BICYCLE","UMBRELLA","WARDROBE","STOVE","CANDLELIGHT","CHAIR","PITCHFORK","BASEBALL","CORONA","PLATE","KNIFE","FORK","CARPET","AIRPLANE","AIRPORT","JAVASCRIPT"];
 
  changeButtonActivation(true);
} 
window.onload = init; 

function startGame(){
  var now; 
  randomWord(); 
  showLetterBoxes();
  document.getElementById("hangman").src = "pics/h0.png";
  hangmanImgNr = 0;
  changeButtonActivation(false);
  now = new(Date);
  startTime = now.getTime();
  document.getElementById("message").innerHTML = "";
}

function randomWord(){
  var oldWord; 
  var wordIndex;
  oldWord = selectedWord; 

  while(oldWord == selectedWord){
    wordIndex = Math.floor(wordList.length*Math.random()); 
    selectedWord = wordList[wordIndex];
  } 
}

function showLetterBoxes(){
  var newCode = ""; 

  for (var i = 0; i <selectedWord.length; i++){
	  newCode += "<span>&nbsp;</span>";
  }
 document.getElementById("letterBoxes").innerHTML = newCode;
 letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");
}



function guessLetter(){
 
  var letter = this.value; 
  var letterFound = false; 
  var correctLettersCount = 0; 
  this.disabled = true;
  
  for (var i = 0; i <selectedWord.length; i++){
   
	  if (letter == selectedWord.charAt(i)){
        letterFound = true;
        letterBoxes[i].innerHTML = letter;
    }
    if (letterBoxes[i].innerHTML != "&nbsp;"){ 
      correctLettersCount++;
    }
  }   
	 if (letterFound === false){
      hangmanImgNr++;
      hangmanImg= "pics/h" + hangmanImgNr + ".png";
      document.getElementById("hangman").src=hangmanImg;
   }  
      if (hangmanImgNr == 6){
       endGame(true);
      }  
       else if (correctLettersCount == selectedWord.length){
      endGame(false);
        } 
} 

function endGame(manHanged){
  var now = new Date();
  var runTime = (now.getTime() - startTime) / 1000; 

	if (manHanged === true){
    document.getElementById("message").innerHTML = "Sorry, correct word is: " + selectedWord + ". It took you " + runTime.toFixed(1) + " seconds to hang the man.";
  } else {document.getElementById("message").innerHTML = "Well done! You guessed the correct word, " + selectedWord + " ! And you did it in " + runTime.toFixed(1) + " seconds.";
    }
	changeButtonActivation(true); 
}

function changeButtonActivation(status){
 
	if (status === true){
	   document.getElementById("startGameBtn").disabled = false; 
	    for (var i = 0; i < letterButtons.length; i++)
       letterButtons[i].disabled = true;   
  } else {document.getElementById("startGameBtn").disabled = true;
	        for (i = 0; i <letterButtons.length; i++)
   	      letterButtons[i].disabled = false;
	   }
} 
