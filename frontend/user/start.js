
$(document).ready(function(){
  $( "#lang" ).change(function () {
    var v = $( "#lang" ).val();
    if (v == 'Natural_Language') {
      $("#git").hide();
      $("#language").show();
    } else {
      $("#git").show();
      $("#language").hide();
    }
  }); //end lang change 

  $( "#source" ).change(function () {
    var v = $( "#source" ).val();
    if (v == 'custom_input') {
      $("#cu").show();
    } else {
      $("#cu").hide();
    }
  }); //end source change 
});