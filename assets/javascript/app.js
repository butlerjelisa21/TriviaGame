
$(document).ready(function() {
    // Create a function that creates the start button and initial screen
    
    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $("#mainArea").append(openScreen);
    }
    
    openingPage();
    
    //on-click event for start button to begin name
    
    $("#mainArea").on("click", ".start-button", function(event){
        event.preventDefault();  // added line to test issue on GitHub Viewer
        clickSound.play();
        $('.jumbotron').hide();
            
        generateQuestions();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
        
        clickSound.play();
        selectedAnswer = $(this).text();
        //ternary operator, if/else replacement
        selectedAnswer === correctAnswers[questionCounter] ? (
            //alert("correct");
            clearInterval(theClock),
            generateWin()) :
            //else
            (//alert("wrong answer!");
            clearInterval(theClock),
            generateLoss()
        )
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function timeoutLoss() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='/assets/images/x.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000);  //  change to 4000 or other amount
    }
    
 // JavaScript Document
$(document).ready(function(){
  
    var questions = [{
      question: "Where was Malcom X killed ?",
      choices: ['His house', 'State prison', 'Audubon Ballroom, Manhattan'],
      correctAnswer: 2
    }, {
      question: "Jackie Robinson was the first African American to do what ?",
      choices: ['Play major league football', 'Play major league baseball', 'Play major league soccer'],
      correctAnswer: 1
    }, {
      question: "Arthur Ashe was famous for what ?",
      choices: ['Tennis', 'Track', 'Rugby'],
      correctAnswer: 0
    }, {
      question: "Who was the American singer, actress and civil rights leader who got her start singing at the Cotton Club in New York City at age 16 ?",
      choices: ['Dionee Warwick', 'Lena Horne', 'Justin Beiber'],
      correctAnswer: 1
    }, {
      question: "5. Who holds the record of 100 points scored in a single NBA game ?",
      choices: ['Lebron James', 'Wilt Chamberlin', 'Steph Curry'],
      correctAnswer: 1
    }, {
      question: "What service did the first African American female millionaire, Madame C.J. Walker, provide ?",
      choices: ['Food distribution', 'Investment advice', 'Beauty products'],
      correctAnswer: 2
    }, {
      question: "In what year did Harriet Tubman escape slavery ?",
      choices: ['1849', '1991', '1797'],
      correctAnswer: 0
    }, {
      question: "Who was the first African American Chief Justice of the Supreme Court ?",
      choices: ['Clarence Thomas', 'Thurgood Marshall', 'Hugo Black'],
      correctAnswer: 1
    }, {
      question: "What was the first Black owned company to be traded on the New York Stock Exchange ?",
      choices: ['Johnson and Johnson', 'Jumpman', 'BET: Black Entertainment Televison'],
      correctAnswer: 2
    }, {
      question: "Who was known as the father of Black History ? ",
      choices: ['Martin Luther King Jr', "Malcom X", 'Carter G. Woodson'],
      correctAnswer: 2
    }
    ];
    
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('.content'); //Quiz div object
    
    // Display initial question
    displayNext();
    
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        $('#warning').text('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
        $('#warning').text('');
      }
    });
    
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
      $("#timer").html(count)
    });
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      // this is new
      var warningText = $('<p id="warning">');
      qElement.append(warningText);
      
      return qElement;
  
  
  
    }
  
    // Creates 1 minute countdown
    
  
    var count=60;
  
    $("#timer").html(count)
  
      var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
  
      function timer()
      {
        count=count-1;
        if (count <= 0)
        {
       clearInterval(counter);
       //counter ended, do something here
       alert("Time's up! Refresh the page and try again!")
       return;
    }
  
    document.getElementById("timer").innerHTML=count
  
  
  
    //$("#timer").text("count")
  
  
  }
    
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
         }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $('<h3>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      // Calculate score and display relevant message
      var percentage = numCorrect / questions.length;
      if (percentage >= 0.9){
          score.append('Incredible! You got ' + numCorrect + ' out of ' +
                   questions.length + ' questions right!');
      }
      
      else if (percentage >= 0.7){
          score.append('Good job! You got ' + numCorrect + ' out of ' +
                   questions.length + ' questions right!');
      }
      
      else if (percentage >= 0.5){
          score.append('You got ' + numCorrect + ' out of ' +
                   questions.length + ' questions right.');
      }
      
      else {
          score.append('You only got ' + numCorrect + ' out of ' +
                   questions.length + ' right. Want to try again?');
      }
      return score;
    }
  }); 