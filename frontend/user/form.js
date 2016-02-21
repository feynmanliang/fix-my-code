var mulAns = 0;   
var api = "http://localhost:3000/lint?ghpath=";
var gh = "feynmanliang/fix-my-code/master/backend/linter.js";

var errors, lineArray;
var FADE_SPEED = 300;
var errorMsg;

var problemsSolved = 0;

var wrongAnswers = [
"Variable name is too short.",
"Poor bracket placements.",
"Variable name is too long.",
"Inconsistent naming convention.",
"Inconsistent spacing."
];

var files = [];
var url2;

var shouldIncTime = true;

/*var $_GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }
    $_POST[decode(arguments[1])] = decode(arguments[2]);
});*/


$(document).ready(function(){

  url2 = "http://localhost:3000/paths?user="+$_POST['user']+"&repo="+$_POST['repo'];
  $.getJSON(url2, function( data ) {
    files = data;
    $("#problem_slash").html("/"+files.length);
    url = api+files[problemsSolved];
    loadProb(url);
    setInterval(myTimer, 1000);
  });
//alert(files);
  /* Clicking logic */

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

  $("#click1").click(function() {mulChoice(1);});
  $("#click2").click(function() {mulChoice(2);});
  $("#click3").click(function() {mulChoice(3);});
  $("#click4").click(function() {mulChoice(4);});

}); 

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
  //alert("ANS: "+ans+", MULANS:"+mulAns);
  if (ans != mulAns) {
    showWrongAns();
    myInc("incorrect");
    return;
  }
  problemsSolved++;
  if (problemsSolved < files.length) myInc("problem_num");
  url = api+files[problemsSolved];
  loadProb(url);
  myInc("correct");
}

function showWrongAns() {
  if (!$('#bsError').is(":visible")) {
    $('#bsError').fadeIn(FADE_SPEED).delay(700).fadeOut(FADE_SPEED);
  }
}
function loadProb(url) {
  if (problemsSolved >= files.length && problemsSolved != 0) {
    $("#complete").fadeIn(FADE_SPEED);
    $("#part1").hide(FADE_SPEED);
    $("#part2").fadeOut(FADE_SPEED);
    $("#end_session").hide();
    updateUser();
    return;
  }
  $("#loading").show();
  $.getJSON(url, function( data ) {
    $("#loading").hide();
    $("#part1").fadeIn(FADE_SPEED);
    ////alert(data);
    var items = [];

    lineArray = data.code.split("\n");
    ////alert(lineArray);

    errors = data.errors; //array of error objects
    var htmlCode = "";
    
    var lineStart = Math.max(1, errors[0].line - 3);
    var lineEnd = lineStart + 6;

    for (var i = lineStart - 1; i < lineEnd; i++) {
        var lineNumber = i + 1;
        str = makeWSVisible(lineArray[i]);
        htmlCode += "<span class='line' data-num='"+lineNumber+"'>"+str+"</span>\n";
    }

    for (var i = 0; i < errors.length; i++) {
        debugHTML += "<li>"+JSON.stringify(errors[i])+"</li>";
    }

    /*for (var i = 0; i < lineArray.length; i++) {
        var lineNumber = i + 1;
        htmlCode += "<span class='line' data-num='"+lineNumber+"'>"+lineArray[i]+"</span>";
    }*/

    $("#code").html(htmlCode);

    
    var debugHTML = "";
    for (var i = 0; i < errors.length; i++) {
        debugHTML += "<li>"+JSON.stringify(errors[i])+"</li>";
    }
    $("#debug").html("<ol>"+debugHTML+"</ol>");



    /*
    $.each( data, function( key, val ) {
      ////alert(key);
      items.push( "<li id='" + key + "'>" + val + "</li>" );
    });
   
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "body" );*/
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

function makeWSVisible(str) {
  var out = "";
  str = htmlEntities(str);
  var shouldRep = true;
  for (var x = 0; x < str.length; x++)
  {
      var c = str.charAt(x);
      if (!shouldRep || c != ' ' && c != "\t") {
          out += c;
          shouldRep = false;
          continue;
      }
      out += '&rarr;';
  }
  return out;
}

function myPerc(number1, number2) {
  return Math.floor((number1 / number2) * 100);
}

