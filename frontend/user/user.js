
$(document).ready(function(){

    $(".updateUser").click(function(){
      updateUser();
    });


    $("#end_session").click(function(){
      updateUser();
      var sessHTML = '<center style="font-size: 17px">You have ended the session.<br /><br /><a href="start"><button type="button" class="btn btn-default">Start New Session!</button></a></center>';
      $("#session_summary").html(sessHTML);
      shouldIncTime = false;
      $("#part1").hide();
      $("#part2").hide();
      $(this).hide();
    });



});

function updateUser() {
      var c = $("#correct").html();
      var ic = $("#incorrect").html();

      var url = 'ajax_update.php?correct='+c+'&incorrect='+ic;
      $.get( url, function( data ) {});
}