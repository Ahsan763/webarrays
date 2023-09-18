$(document).ready(function () {
  $(".toggle-menu").click(function () {
$(this).addClass("dnone");
$(".body-aside").addClass("active");
$(".navlist").addClass("active");
$(".asid-bg").addClass("active");
$(".nav-logo").addClass("active");
$(".close-btn").removeClass("dnone").addClass("active");
$(".mobile-nav").addClass("position_fixed");


});

$(".close-btn").click(function () {
$(this).addClass("dnone").removeClass("active");
$(".body-aside").removeClass("active");
$(".navlist").removeClass("active");
$(".asid-bg").removeClass("active");
$(".nav-logo").removeClass("active");
$(".toggle-menu").removeClass("dnone");
$(".mobile-nav").removeClass("position_fixed");

});
$(".togle_nav_link").click(function () {
$(".close-btn").addClass("dnone").removeClass("active");
$(".body-aside").removeClass("active");
$(".navlist").removeClass("active");
$(".asid-bg").removeClass("active");
$(".nav-logo").removeClass("active");
$(".toggle-menu").removeClass("dnone");
$(".mobile-nav").removeClass("position_fixed");
})
})
$(document).ready(function() {
    // communities section box slide animation
    $('.box').click(function() {
        $('p').slideToggle();
    })
    $(window).scroll(function() {
        if ($(document).scrollTop() > 70) {
            $('.nav').addClass('affix');
        } else {
            $('.nav').removeClass('affix');
        }
    });
    // navbar sticky end
    $('#bar-icon').click(function(){
        $('.main-menu').toggleClass('show');
    });
    //   $(".black-overlay").toggleClass('active');
       // overlay
       $("#bar-icon").click(function(){
        $(".black-overlay").toggleClass("d-none");
      });
    //   
    $(".black-overlay").click(function(){
    $("ul").removeClass("show");
    $(this).addClass('d-none');
    });  
      //   
    $(".black-overlay").click(function(){
    $("ul").removeClass("show");
    $(this).addClass('d-none');
    });
      //   
      $(".body-wrapper").click(function(){
        $(".sub-menu-list").addClass("d-none");

        }); 
	// navbar end
});