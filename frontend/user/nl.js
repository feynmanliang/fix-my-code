var mulAns = 0;   
var api = "http://localhost:3000/lint?ghpath=";
var gh = "feynmanliang/fix-my-code/master/backend/linter.js";

var errors, lineArray;
var FADE_SPEED = 300;
var errorMsg;

var problemsSolved = 0;

var subProblemsSolved = 0;
var subProblems = 0;

var click_state = true;
var wrongAnswers = [
"Poor use of letter casing.",
"Inconsistent tense.",
"This word is used too often.",
"Should not use third person.",
"Sentence is too short.",
"Sentence is too long."
];

var files = [];
var url2;

var debug;

var $_GET = {};

var globData = "";

var toMakeGreen;
var shouldIncTime = true;

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }
    $_GET[decode(arguments[1])] = decode(arguments[2]);
});


$(document).ready(function(){

  /*files = [
  "This function isn't very fast but it is correct. I suspect the round trip time for a packet is 15ms.",
  "If you have any questions about the documentation, please email me. I will reply within a few business days."
          ];*/

  if ($_POST['source'] == 'custom_input') {
    files = $_POST['text'].split("\n");
  } else {
    files = samplesFromDB.split("\n");
  }
  $("#problem_slash").html(" of "+files.length);
  setInterval(myTimer, 1000);

  loadProb(files[0]);
/*
  
  $("pre").on("click", "span.line", function(){
    var lineNumber = $(this).attr("data-num");
      //alert($(this).attr("data-num"));

      var isCorrect = false;

      for (var i = 0; i < errors.length; i++) {
          if (errors[i].line == lineNumber) {
            //alert(errors[i].message);
            isCorrect = true;
            myInc("correct");
            $("#part1").fadeOut(FADE_SPEED);
            $("#part2").fadeIn(FADE_SPEED);

            //set multiple question html
            mulAns = randInt(1, 4); 
            $("#ans"+mulAns).html(errors[i].message);

            //set wrong answer HTML stuff
            var arr = []
            while(arr.length < 4){
              var randomnumber=Math.floor(Math.random()*wrongAnswers.length);
              var found=false;
              for(var i=0;i<arr.length;i++){
                if(arr[i]==randomnumber){found=true;break}
              }
              if(!found)arr[arr.length]=randomnumber;
            }

            for (var i = 1; i <= 4; i++) {
              if (i == mulAns) continue;
              errorMsg = "Wrong answer";
              $("#ans"+i).html(wrongAnswers[arr[i-1]]);
            }


            $("#part2_msg").html("What type of code style violation did the following line have?<br /><b>" + $(this).html() + "</b>");
            break;
          }
      }

      if (!isCorrect) {
        myInc("incorrect");
        showWrongAns();
        //alert("Wrong answer!");
      }
  });
*/


  $("pre").on("click", ".word", function(){
    var isCorrect = $(this).attr("data-error") != 'none';
    if ($(this).hasClass("word-question") || $(this).hasClass("word-done") || !click_state) {
      return;
    }
    if (!isCorrect) {
      myInc("incorrect");
      showWrongAns();
      return;
    }
    //at this point, they clicked correctly
    toMakeGreen = $(this);
    click_state = false;
    myInc("correct");
  

    $(this).addClass("word-question");

    //set multiple question html
    mulAns = randInt(1, 4); 
    $("#ans"+mulAns).html($(this).attr("data-error"));

    //set wrong answer HTML stuff
    var arr = [];
    while(arr.length < 4){
      var randomnumber=Math.floor(Math.random()*wrongAnswers.length);
      var found=false;
      for(var i=0;i<arr.length;i++){
        if(arr[i]==randomnumber){found=true;break}
      }
      if(!found)arr[arr.length]=randomnumber;
    }

    for (var i = 1; i <= 4; i++) {
      if (i == mulAns) continue;
      errorMsg = "Wrong answer";
      $("#ans"+i).html(wrongAnswers[arr[i-1]]);
    }

    $("#part2").fadeIn(FADE_SPEED);
  });


  $("#click1").click(function() {mulChoice(1);});
  $("#click2").click(function() {mulChoice(2);});
  $("#click3").click(function() {mulChoice(3);});
  $("#click4").click(function() {mulChoice(4);});

}); //doc ready

function myInc(id) {
  $("#"+id).html(parseInt($("#"+id).html())+1);
  
  var a = $("#correct").html()*1;
  var b = $("#incorrect").html()*1;
  if (a + b != 0) $("#ratio").html(myPerc(a, a + b)+"%");
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mulChoice(ans) {
  if (ans != mulAns) {
    showWrongAns();
    myInc("incorrect");
    return;
  }
  toMakeGreen.addClass("word-done");
  toMakeGreen.removeClass("word-question");
  click_state = true;
  subProblemsSolved++;
  $("#part2").fadeOut(FADE_SPEED);
  $("#subproblems").html(subProblems - subProblemsSolved);
  if (subProblems - subProblemsSolved <= 1) {
    $(".ess").hide();
  }
  console.log("Problems solved: "+subProblemsSolved+", total sub problems:"+subProblems);
  if (subProblemsSolved >= subProblems) {
    problemsSolved++;
    if (problemsSolved < files.length) myInc("problem_num");
    loadProb(files[problemsSolved]);
  }
  myInc("correct");
}

function showWrongAns() {
  if (!$('#bsError').is(":visible")) {
    $('#bsError').fadeIn(FADE_SPEED).delay(700).fadeOut(FADE_SPEED);
  }
}
function loadProb(txt) {
  if (problemsSolved >= files.length && problemsSolved != 0) {
    $("#complete").fadeIn(FADE_SPEED);
    $("#part1").hide(FADE_SPEED);
    $("#part2").fadeOut(FADE_SPEED);
    $("#end_session").hide();
    return;
  }
  $("#loading").show();
  $.post("http://localhost:3000/english", { text: txt })
  .done(function( data ) {
    globData = data;

    var codeHTML = "";
    subProblems = 0;
    subProblemsSolved = 0;
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].length; j++) {
        var err = "data-error='none'";
        if (data[i][j].errs.length != 0) { err = 'data-error="'+htmlEntities(data[i][j].errs[0])+'"'; subProblems++; }

        //if (data[i][j].word == 'LOL') { err = 'data-error="Do not use social acronyms."'; subProblems++; }

        codeHTML += "<div class='word' "+err+">"+data[i][j].word+"</div>";
        if (data[i][j].word == '.' || data[i][j].word == '!' || data[i][j].word == ',' || data[i][j].word == '?' || data[i][j].word != '\'' && j + 1 < data[i].length && data[i][j + 1].word != '\''
          && data[i][j + 1].word != '.' && data[i][j + 1].word != '!' && data[i][j + 1].word != ',' && data[i][j + 1].word != '?') {
          codeHTML += "<div class='word' data-error='none'> </div>";
        }
      }
    }
    //$("#totalsubproblems").html("/"+subProblems);
    $("#subproblems").html(subProblems);
    if (subProblems <= 1) {
      $(".ess").hide();
    } else {
      $(".ess").show();
    }
    $("#code").html(codeHTML);
    $("#loading").hide();
    $("#part1").fadeIn(FADE_SPEED);
  });


  $("#part2").fadeOut(FADE_SPEED);
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


function myTimer() {
  if (problemsSolved >= files.length && problemsSolved != 0 || !shouldIncTime) return;
  myInc("time_spent");
}


function myPerc(number1, number2) {
  return Math.floor((number1 / number2) * 100);
}