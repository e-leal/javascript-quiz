var score = 0;
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

    var choiceList = questions[questionId].c;
    for (var j = 0; j < choiceList.length; j++){
        if(document.querySelector(".answer-item[data-option-id='"+ (j+1)+ "']") === null){
            var choice = document.createElement("li");
            choice.className = "answer-item";
            choice.setAttribute("data-option-id", (j+1));
            choice.textContent = (j + 1) + ". " + choiceList[j];
            console.log(choiceList[j]);
            choice.setAttribute("value", choiceList[j]); 
            console.log("the new value is "+ choice.value);
            console.dir(choice);
            choiceListEl.appendChild(choice);
        }
        else{
            var currentChoice = document.querySelector(".answer-item[data-option-id='"+ (j+1)+ "']");
            currentChoice.textContent = (j+1) + ". " + choiceList[j];
            console.log(choiceList[j]);
            currentChoice.setAttribute("value", choiceList[j]);
            console.dir(currentChoice);
            
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
    questionSpot.setAttribute("style", "")
    start.setAttribute("style", "display: none");
    descrip.setAttribute("style", "display: none");
    
    displayQuestion(count);
    var timeInterval = setInterval(function(){
        countdown_timer.textContent = time_left;
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
        }
    }
    , 1000
    );    
}





start.addEventListener("click", startQuiz);
selectedChoice.addEventListener("click", verifyAnswer);
submitScoreBtn.addEventListener("click", function(event){
    event.preventDefault();
    console.log("event triggered");

    if(formEl.querySelector("input").value === null){
        var error = document.createElement("h3");
        error.textContent = "Please enter initials";
        error.setAttribute("style", "color: red; font-weight: bold");
        formEl.appendChild(error);
    }
    else{
        if(error){
            error.setAttribute("style", "display: none");
        }
        questionSpot.textContent = "High Scores"
        descrip.setAttribute("style", "display: none");
        formEl.setAttribute("style", "display: none");
        submitScoreBtn.setAttribute("style", "display: none");
        goBackBtn.textContent = "Go back";
        clearScoreBtn.textContent = "Clear High Scores";
        goBackBtn.setAttribute("style", "display: inline-block");
        clearScoreBtn.setAttribute("style", "display: inline-block");
    }    
});