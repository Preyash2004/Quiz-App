const questions = [
    {question: "Inside which html element do we put the JavaScript?",
        answers:[
            {text:"script",correct: true},
            {text:"javascript",correct: false},
            {text:"js",correct: false},
            {text:"scripting",correct: false},
        ]
    },
    {question: "What is the correct synatx for referring to an external script called 'xxx.js'?",
        answers:[
            {text:"script href = 'xxx.js'",correct: false},
            {text:"script name = 'xxx.js'",correct: false},
            {text:"script src = 'xxx.js'",correct: true},
            {text:"script file = 'xxx.js'",correct: false},
        ]
    },
    {question: "How do you write 'Hello World!' in an alert box?",
        answers:[
            {text:"msgBox('Hello World!')",correct: true},
            {text:"alertBox('Hello World!')",correct: false},
            {text:"msg('Hello World!')",correct: false},
            {text:"alert('Hello World!')",correct: true},
        ]
    },
    {question: "Which of the following is the correct HTML element for inserting a line break?",
        answers:[
            {text:"break",correct: false},
            {text:"lb",correct: false},
            {text:"br",correct: true},
            {text:"line",correct: false},
        ]
    },
    {question: "What is the purpose of the alt attribute in an <img> tag?",
        answers:[
            {text:"Specifies the image file format",correct: false},
            {text:"Adds a caption to the image",correct: false},
            {text:"Displays text if the image cannot load",correct: true},
            {text:"Defines the height and width of the image",correct: false},
        ]
    },
    {question: "Which of the following properties is used to change the font of text in CSS?",
        answers:[
            {text:"font-weight",correct: false},
            {text:"font-family",correct: true},
            {text:"text-style",correct: false},
            {text:"font-size",correct: false},
        ]
    },
    {question: "Which HTML attribute is used to define inline styles?",
        answers:[
            {text:"style",correct: true},
            {text:"font",correct: false},
            {text:"class",correct: false},
            {text:"styles",correct: false},
        ]
    },
    {question: "How do you create a function in JavaScript?",
        answers:[
            {text:"function myFunction()",correct: true},
            {text:"function: myFunction()",correct: false},
            {text:"create myFunction()",correct: false},
            {text:"new Function myFunction()",correct: false},
        ]
    },
    {question: "Which of the following is NOT a JavaScript data type?",
        answers:[
            {text:"Boolean",correct: false},
            {text:"String",correct: false},
            {text:"Element",correct: true},
            {text:"Undefined",correct: false},
        ]
    },
    {question: "What is triggered when a user clicks a mouse button?",
        answers:[
            {text:"A property",correct: false},
            {text:"A function",correct: false},
            {text:"A click",correct: false},
            {text:"An event",correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disable = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();