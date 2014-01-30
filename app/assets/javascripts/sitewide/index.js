$(document).ready(function () { 
  var click_count = 0;
  var $compass = $(".compass img");
  var $header = $(".header");

  // $compass.toggle(
  //   function(event){
  //     $header.animate({top: "0px"}, "normal");
  //     event.preventDefault();
  //   },
  //   function(event){
  //     $header.animate({top: "-60px"}, "normal");
  //     event.preventDefault();
  //   });

  setTimeout(function(){
    $header.animate(
      {
        top: "-60px"
      },
      "normal");  
  }, 2000);  
  
    
  $compass.click(function (){
    if(click_count % 2 == 0) {
      console.log("Open sesame");
      $header.animate(
      {
        top: "0px"
      }, 
      "normal");
    } else {
      console.log("Close sesame");
      $header.animate(
      {
        top: "-60px"
      },
      "normal");    
    }
    click_count++
  })
});