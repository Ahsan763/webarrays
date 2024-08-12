AOS.init({
  offset: 170,
  delay: 100,
  duration: 1200,
  easing: 'ease',
});

var tl1 = gsap.timeline({defaults:{ease: Power1.easeIn,}});
tl1.to(".hero__hdng-sp",{y:'0%',duration:0.7,stagger:0.2});
// tl1end
var tl2 = gsap.timeline({scrollTrigger:{
  trigger:".banner",
  // markers:true,
  start:"70% 90%",
  end:"150% 90%",
  scrub:2,
  pin:true
}});
tl2.fromTo(".banner__img",{opacity:0,scaleY:0},{opacity:1,duration:0.9,scaleY:1,ease: "slowMo.easeIn"},)
// tl2end





// tl3end







var tl = gsap.timeline({scrollTrigger:{
  trigger:".contact",
  // markers:true,
  start:"50% 50%",
  end:"bottom 20%",
  scrub:2,
  pin:true
}});
tl
.to("#center",{
 height: "100vh",
},'a')
.to("#top",{
  top: "-50%",
},'a')
.to("#bottom",{
  bottom: "-50%",
},'a')
.to("#top-h1",{
  bottom: "-160px"
},'a')
.to("#bottom-h1",{
  top: "-160px"
},'a')
.to(".contentform",{
 top: "0px"
},'a')
.to(".content",{
 delay: -0.2,
 top: "0px"
});



