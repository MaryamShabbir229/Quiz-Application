 var firebaseConfig = {
  apiKey: "AIzaSyAIF1_b49VJxi0K3rSf89-utTKfq35h9oU",
  authDomain: "quiz-application-e39fc.firebaseapp.com",
  databaseURL: "https://quiz-application-e39fc-default-rtdb.firebaseio.com",
  projectId: "quiz-application-e39fc",
  storageBucket: "quiz-application-e39fc.firebasestorage.app",
  messagingSenderId: "561661085457",
  appId: "1:561661085457:web:da419682692d3d9a502eb0"
};

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);

var questions = [
    {
      question: "HTML Stands for",
      option1: "Hyper Text Markup Language",
      option2: "Hyper Tech Markup Language",
      option3: "Hyper Touch Markup Language",
      corrAnswer: "Hyper Text Markup Language",
    },
    {
      question: "CSS Stands for",
      option1: "Cascoding Style Sheets",
      option2: "Cascading Style Sheets",
      option3: "Cascating Style Sheets",
      corrAnswer: "Cascading Style Sheets",
    },
    {
      question: "Which tag is used for most large heading",
      option1: "<h6>",
      option2: "<h2>",
      option3: "<h1>",
      corrAnswer: "<h1>",
    },
    {
      question: "Which tag is used to make element unique ",
      option1: "id",
      option2: "class  ",
      option3: "label",
      corrAnswer: "id",
    },
    {
      question: "Any element assigned with id, can be get in css ",
      option1: "by # tag",
      option2: "by @ tag",
      option3: "by & tag",
      corrAnswer: "by # tag",
    },
    {
      question: "CSS can be used with ______ methods ",
      option1: "8",
      option2: "3",
      option3: "4",
      corrAnswer: "3",
    },
    {
      question: "In JS variable types are ____________ ",
      option1: "6",
      option2: "3",
      option3: "8",
      corrAnswer: "8",
    },
    {
      question: "In array we can use key name and value ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
    {
      question: "toFixed() is used to define length of decimal ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "True",
    },
    {
      question: "push() method is used to add element in the start of array ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
  ];


  var ques = document.getElementById("question");
  var option1 = document.getElementById("opt1")
  var option2 = document.getElementById("opt2")
  var option3 = document.getElementById("opt3")
  var index = 0;
  var score = 0;
  var timer = document.getElementById("timer")
  var min = 0;
  var sec = 59;

  setInterval(function (){
    timer.innerHTML = `${min} : ${sec}`
    sec--

    if(sec < 0){
       min--;
       sec = 59
        
    }
    if(min < 0){
        min = 0 ;
        sec = 0;
        nextQuestion()
    }
   
  } , 1000)

  var answers = [];

  function nextQuestion(){
    var nextBtn = document.getElementById("btn");
    var allOptions = document.getElementsByTagName("input");


   

    for(var i = 0; i < allOptions.length ; i++){
        if(allOptions[i].checked){
            allOptions[i].checked = false;
            var selectedValue = allOptions[i].value;
            var selectedOption = questions[index - 1][`option${selectedValue}`]
            var selectedValue = questions[index-1]["corrAnswer"]

            answers.push({
              question : ques.innerText,
              selectedOption : selectedOption,
              correctAnswer : selectedValue,
            })

            if(selectedOption === selectedValue ){
                score++
            }
        }
    } 

    


   
    var nextBtn = document.getElementById("btn");
    nextBtn.setAttribute("class" , "editAg")

    min = 0;
    sec = 59;

    if(index > questions.length - 1){
        var percentage =((score / questions.length) * 100).toFixed(2);

          var resultData = {
      score: score,
      totalQuestions: questions.length,
      percentage: percentage,
       answers: answers,
       
    };

        firebase.database().ref('quizResults').push(resultData).then(() => {
      Swal.fire({
        title: 'Quiz Result',
        text: `You scored ${percentage}%`,
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'my-ok-button',
        },
      });
    }).catch((error) => {
      console.error("Error saving result: ", error);
      Swal.fire({
        title: 'Error',
        text: 'There was an error saving your result.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });


    }else{
        ques.innerText = questions[index].question;
        option1.innerText = questions[index].option1;
        option2.innerText = questions[index].option2;
        option3.innerText = questions[index].option3;
        index++
    }

    nextBtn.disabled = true;
   
  }

  function clicked(){
    var nextBtn = document.getElementById("btn");
    nextBtn.disabled = false;
    nextBtn.setAttribute("class" , "edit")

    
  }