$(document).ready(function(){
  AOS.init();
});
const mobileMenu = document.querySelector(".rek-mobile-menu");
const mobileMenuButton = document.querySelector(".rek-mobile-menu-toggler");
const scrollViewHideElements = Array.from(document.querySelectorAll(".rek-scrollview-hide"));
console.log(scrollViewHideElements);

mobileMenuButton.addEventListener("click",function(event){
  event.target.classList.toggle("closeIcon");
  mobileMenu.classList.toggle("show");
});

let scrollAmount;
const header = document.querySelector("header");

if(window.innerWidth > 1200){
  mobileMenuButton.classList.add("removeMe");
}
else{
  mobileMenuButton.classList.remove("removeMe");
}
window.onresize = function(){
  if(window.innerWidth > 1200){
    mobileMenuButton.classList.add("removeMe");
  }
  else{
    mobileMenuButton.classList.remove("removeMe");
  }
}
window.addEventListener("scroll",function(){
  if(window.innerWidth > 1200){
    scrollAmount = window.scrollY;
    if (scrollAmount > 50) {
      mobileMenuButton.classList.remove("removeMe");
      mobileMenu.classList.add("scrollview");
      scrollViewHideElements.forEach(function(el){
        console.log("sadds");
        el.classList.add("rek-wh-0");
      });
    }else{
      scrollViewHideElements.forEach(function(el){
        el.classList.remove("rek-wh-0");
      });
      mobileMenuButton.classList.remove("closeIcon");
      mobileMenuButton.classList.add("removeMe");
      mobileMenu.classList.remove("show");
      mobileMenu.classList.remove("scrollview");
    }
  }
});

