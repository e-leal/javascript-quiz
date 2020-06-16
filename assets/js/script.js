var score = 0;
var scoreCounter = 0;
var count = 0;
var time_left = 60;
var questionSpot = document.getElementById("main-title");
var start = document.getElementById("start-quiz");
var choiceListEl = document.getElementById("answer-list"); 
var response = document.getElementById("reaction");
var selectedChoice = document.querySelector(".answer-list");
var descrip = document.getElementById("description");
var countdown_timer = document.getElementById("timer");
var main_section = document.querySelector(".main-section");
var goBackBtn = document.getElementById("backToStart");
var clearScoreBtn = document.getElementById("resetScores");
var submitScoreBtn = document.getElementById("submitHighScoreBtn");
var formEl = document.querySelector("#userProf");
var err = document.getElementById("message");
var scoreList = document.getElementById("score-list");
var orig_description = "Try to answer the following code related questions in the time alloted. Keep in mind that incorrect answers will penalize your score and time.";
var highScoreList = [];




var questions = [
    {
        q: "Arrays in javascript can be used to store _____.",
        c: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        a: "all of the above"
    },
    {
        q: "What is the HTML tag under which one can write the Javascript code?",
        c: ["<javascript>", "<scripted>", "<script>", "<js>"],
        a: "<script>"
    },
    {
        q: "Which of the following is the correct syntax to display 'GeeksforGeeks' in an alert box using JavaScript?",
        c: ["alertbox('GeeksforGeeks');", "msg('GeeksforGeeks');", "msgbox('GeeksforGeeks');", "alert('GeeksforGeeks');"],
        a: "alert('GeeksforGeeks');"
    }
];

function displayQuestion(questionId){
    questionSpot.textContent = questions[questionId].q;
    main_section.setAttribute("style", "text-align: left");
    choiceListEl.setAttribute("style", "display: inline-block");
    var choiceList = questions[questionId].c;
    for (var j = 0; j < choiceList.length; j++){
        if(document.querySelector(".answer-item[data-option-id='"+ (j+1)+ "']") === null){
            var choice = document.createElement("li");
            choice.className = "answer-item";
            choice.setAttribute("data-option-id", (j+1));
            choice.textContent = (j + 1) + ". " + choiceList[j];
            choice.setAttribute("value", choiceList[j]); 
            choiceListEl.appendChild(choice);
        }
        else{
            var currentChoice = document.querySelector(".answer-item[data-option-id='"+ (j+1)+ "']");
            currentChoice.textContent = (j+1) + ". " + choiceList[j];
            currentChoice.setAttribute("value", choiceList[j]);            
        }
        
        
    }
}

function verifyAnswer(){
    // get target element from event
    var targetEl = event.target;  
    var selectedAns = targetEl.getAttribute("value");
    response.setAttribute("style", "border-top: 1px solid gray");
    var correct = questions[count].a;
    if(selectedAns === correct){
        score++;
        response.textContent = "Correct!!";
    }
    else{
        response.textContent = "Wrong!";
        // subtract 10 seconds from the time and add 0 points to the score
        time_left -= 10;
    }
    count++;
    if(count < questions.length){
        displayQuestion(count);
    }

}

function startQuiz(){
    //debugger;
    start.setAttribute("style", "display: none");
    descrip.setAttribute("style", "display: none");
    countdown_timer.setAttribute("style", "inline-block");

    
    displayQuestion(count);
    var timeInterval = setInterval(function(){
        countdown_timer.textContent = "Time: " + time_left;
        time_left--;
        if(response.textContent != ""){
            response.textContent = "";
            response.setAttribute("style", "border: none");
        }
        if(count >= questions.length || time_left <= 0){
            clearInterval(timeInterval);
            questionSpot.textContent = "All Done!!"
            descrip.textContent = "Your final score is: " + score;
            descrip.setAttribute("style", "display: block");
            formEl.setAttribute("style", "display: inline-block");
            submitScoreBtn.setAttribute("style", "display: inline-block; margin-left: 10px");
            submitScoreBtn.textContent = "Submit";
            submitScoreBtn.setAttribute("style", "display: inline-block");
            choiceListEl.setAttribute("style", "display: none");
            countdown_timer.setAttribute("style", "display: none");
        }
    }
    , 1000
    );    
}

function displayMessage(){
    err.textContent = "Please enter initials";
    err.setAttribute("style", "color: red; font-weight: bold");
}



var startOver = function (){
    score = 0;
    time_left = 60;
    count = 0;
    questionSpot.textContent = "Coding Quiz Challenge";
    descrip.textContent = orig_description;
    descrip.setAttribute("style", "display: block");
    goBackBtn.setAttribute("style", "display: none");
    clearScoreBtn.setAttribute("style", "display: none");
    start.setAttribute("style", "display: inline-block; text-align: center");
    main_section.setAttribute("style", "text-align: center");
    scoreList.setAttribute("style", "display: none");
}

function saveScore(){
    localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
}

function deleteScore(){
    if(highScoreList != null || highScoreList.length > 0){
        for(var i = 0; i< highScoreList.length; i++){
            var scoreId = highScoreList[i].id;
            var selectedScore = document.querySelector(".score[data-score-id='"+scoreId+"']");
            selectedScore.remove();
        }
    }
    var updatedScoreArr = [];
    highScoreList = updatedScoreArr;
    scoreCounter = 0;
    saveScore();
}

var createScore = function(scoreObj){
    var savedEntry = document.createElement("li");
    savedEntry.className = "score";
    savedEntry.setAttribute("data-score-id", scoreCounter);
    savedEntry.textContent= (scoreCounter + 1) + ". " + scoreObj.name + " - " + scoreObj.score;
    scoreList.appendChild(savedEntry);
   scoreObj.id = scoreCounter;
    highScoreList.push(scoreObj);
    saveScore();
    console.log("just saved score and increasing counter from "+scoreCounter + " to -> "+ (scoreCounter+1));
    scoreCounter++;
}

function loadScores(){
    var savedScores = localStorage.getItem("highScoreList");
    if(!savedScores){
        return false;
    }
    console.log("returning savedscores as an object from stored string");
    savedScores = JSON.parse(savedScores);
    
    console.dir(savedScores);
    // loop through saved scores
    for(var i = 0; i< savedScores.length; i++){
        console.log("ID: " + savedScores[i].id + " " + "user is "+ savedScores[i].name + " with a score of "+ savedScores[i].score);
        console.log("running createScore function with savedScores[i]")
        createScore(savedScores[i]);
    }
    console.log("looped through existing scores and increased scoreCounter to allow for next ID to be loaded for the next score")
    scoreCounter++;
}


start.addEventListener("click", startQuiz);
selectedChoice.addEventListener("click", verifyAnswer);
submitScoreBtn.addEventListener("click", function(event){
    event.preventDefault();
    var userInitial = formEl.querySelector("#initials").value;
    if(userInitial === null || userInitial === ""){
        displayMessage();       
    }
    else{
        if(err.textContent != ""){
            err.setAttribute("style", "display: none");
        }
        questionSpot.textContent = "High Scores"
        descrip.setAttribute("style", "display: none");
        formEl.setAttribute("style", "display: none");
        submitScoreBtn.setAttribute("style", "display: none");
        goBackBtn.textContent = "Go back";
        clearScoreBtn.textContent = "Clear High Scores";
        goBackBtn.setAttribute("style", "display: inline-block");
        clearScoreBtn.setAttribute("style", "display: inline-block");
        scoreList.setAttribute("style", "display: block");
        var user = formEl.querySelector("#initials").value;
        var profile = {
            id: scoreCounter,
            name: user,
            score: score
        }
        createScore(profile);
        scoreList.setAttribute("style", "display: block");
    } 
});
goBackBtn.addEventListener("click", startOver);
clearScoreBtn.addEventListener("click", deleteScore);
loadScores();