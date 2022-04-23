import $ from 'jquery';
window.$ = $;
window.jQuery = $;
import 'bootstrap';
import AOS from 'aos';
import {slick} from './../node_modules/slick-carousel/slick/slick.min.js';
import scrollissimo from 'scrollissimo';
import smoothscroll from 'smoothscroll-polyfill';

$('html').animate({scrollTop:0}, 1);
$('body').animate({scrollTop:0}, 1);
smoothscroll.polyfill();
AOS.init();
const screenHeight = window.innerHeight;
const sections = document.querySelectorAll('section');
const body = document.querySelector('body');
// const car = document.querySelector('.rek-car');
//242 ve 259 uda açmayı unutma
// for(let i=0; i<sections.length; i++){
//   document.querySelector('.rek-vertical-bar').innerHTML += '<div class="rek-station"></div>';
// }
// const rekStations = document.querySelectorAll('.rek-station');
const rekStations = document.querySelectorAll('.rek-sidebar-station');
let cachedScrollAmount = 0 ;
let autoScroll = true;
let sidebarPoint = document.querySelector('.rek-sidebar-point');

let currentSection = {index:0};
sidebarPoint.style.top = rekStations[0].getBoundingClientRect().top + rekStations[0].getBoundingClientRect().height/2 + 'px';
let targetProxy = new Proxy(currentSection, {
  set: function (target, key, value) {
      autoScroll = false;
      body.classList.add('no-scroll');
      let autoScrollInterval = setInterval(function(){
        if(window.scrollY == value * screenHeight ){
            body.classList.remove('no-scroll');
            autoScroll = true;
          clearInterval(autoScrollInterval);
          }
      },150);
      window.scrollTo({
        top: value * screenHeight ,
        left: 0,
        behavior: 'smooth'
      });
      console.log("value:",value);
      sidebarPoint.style.top = rekStations[value].getBoundingClientRect().top + rekStations[value].getBoundingClientRect().height/2 + 'px';
      target[key] = value;
      return true;
  }
});
$(document).ready(function(){
  let sectionIcons = document.querySelectorAll('.rek-section-icon');
  sectionIcons.forEach(function(el,index){
    let top = ((index+1) * screenHeight) - (screenHeight/2);
    el.style.top = top + 'px';
  });
  

  // let radius = 8;
  // TweenMax.staggerFromTo('.blob', 14 ,{
  // cycle: {
  // attr:function(i) {
  // var r = i*90;
  // return {
  // transform:'rotate('+r+') translate('+radius+',0.1) rotate('+(-r)+')'
  // }
  // }
  // }
  // },{
  // cycle: {
  // attr:function(i) {
  // var r = i*90+360;
  // return {
  // transform:'rotate('+r+') translate('+radius+',0.1) rotate('+(-r)+')'
  // }
  // }
  // },
  // ease:Linear.easeNone,
  // repeat:-1
  // });







  let videoHole = $('.video-hole');
  let videoHoleheight = parseFloat($(videoHole).css('width')) / 1.8;
  $(videoHole).css('height', videoHoleheight + 'px' )

  setTimeout(
    function(){
      if(window.innerWidth > 992){
        scrollanim();
      }
    }, 
    800);
  textAnim();
  setTimeout(function(){
    if(window.innerWidth > 992){
      $(window).scroll(function(){
        
          scrollissimo.knock();
      
      })
    }
  },1000);
});

function scrollanim(){
    //GENERAL VARİABLES
    let inDuration = 300; //Aşağı kaydırırken ekrana gelme süresi, yani bu değer kadar pixel boyunca kaydırma animasyonu olsun(pixel cinsinden)
    let outDuration = 900; //Aşağı kaydırırken ekrandan kaybolma süresi(pixel cinsinden)
    let stayStableDuration = 50; //Ekrana gelmesi ile ekrandan gitmesi arasındaki geçen süre, yani sabit kalma süresi (pixel cinsinden)

    const screenWidth = window.innerWidth;
    let rekSectionsHeight = (screenHeight > 600) ? 600 : screenHeight;


    //BAŞLIK ANİMASYHONLARI
    const sectiontitles = $(".rek-section-title").toArray();

    sectiontitles.forEach(function(titleElement){
      const rekTitleTopY = getCoords(titleElement).top;
      const rekTitleWidth = titleElement.clientWidth;
      const rekTitleHeight = titleElement.clientHeight;
      const rektitleBottomOffset = titleElement.offsetHeight;
      let rekTitleDuration = rekTitleHeight * 4;

      let titleIn = TweenLite.to(document.getElementById(titleElement.id), rekTitleDuration, { left: `${(screenWidth/2) - (rekTitleWidth/2)}px` });
      let titleFade = TweenLite.to(document.getElementById(titleElement.id), rekTitleDuration/2, { opacity: 1 });
      let titleOut = TweenLite.to(document.getElementById(titleElement.id), rekTitleDuration, { opacity: 0 });

      scrollissimo.add(titleIn, (rekTitleTopY - screenHeight + rekTitleHeight*8), 90);
      scrollissimo.add(titleFade, (rekTitleTopY - screenHeight + rekTitleHeight*8), 90);
      scrollissimo.add(titleOut, (rekTitleTopY - rekTitleHeight), 90);
    });

    const rekSection1 = document.getElementById('rekSection1');
    const rekSection1Content = document.getElementById('rekSection1Content');
    const rekSection1TopY = getCoords(rekSection1).top;

    let rekSection1Duration = rekSection1Content.getBoundingClientRect().height/2;
    rekSection1Content.classList.add("rek-scale-0");

    let divyTween = TweenLite.to(document.getElementById('rekSection1Content'), rekSection1Duration, { scale: 1 });
    let divyTween1 = TweenLite.to(document.getElementById('rekSection1Content'), rekSection1Duration, { scale: 0 });
    let divyTween2 = TweenLite.to(document.getElementById('rekSection1Content'), rekSection1Duration, { opacity: 1 });
    let divyTween3 = TweenLite.to(document.getElementById('rekSection1Content'), rekSection1Duration, { opacity: 0 });

    scrollissimo.add(divyTween, rekSection1TopY - rekSection1Duration, 90);
    scrollissimo.add(divyTween1,rekSection1TopY - rekSection1Duration + (rekSection1Duration + stayStableDuration), 90);
    scrollissimo.add(divyTween2, rekSection1TopY - rekSection1Duration, 90);
    scrollissimo.add(divyTween3, rekSection1TopY - rekSection1Duration + (rekSection1Duration + stayStableDuration), 90);



    const rekSection2 = document.getElementById('rekSection2');
    const rekSection2Content = document.getElementById('rekSection2Content');
    const rekSection2TopY = getCoords(rekSection2).top;

    let rekSection2Duration = rekSection2Content.getBoundingClientRect().height / 4;
    rekSection2Content.classList.add("rek-scale-0");
    let divyTween4 = TweenLite.to(document.getElementById('rekSection2Content'), rekSection2Duration, { scale: 1});
    let divyTween5 = TweenLite.to(document.getElementById('rekSection2Content'), outDuration, { scale: 0 });
    let divyTween6 = TweenLite.to(document.getElementById('rekSection2Content'), rekSection2Duration, { opacity: 1 });
    let divyTween7 = TweenLite.to(document.getElementById('rekSection2Content'), outDuration, { opacity: 0 });

    scrollissimo.add(divyTween4, rekSection2TopY - 2*rekSection2Duration, 90);
    scrollissimo.add(divyTween5,rekSection2TopY - 2*rekSection2Duration + (2*rekSection2Duration + stayStableDuration), 90);
    scrollissimo.add(divyTween6, rekSection2TopY - 2*rekSection2Duration, 90);
    scrollissimo.add(divyTween7, rekSection2TopY - 2*rekSection2Duration + (rekSection1Duration + stayStableDuration), 90);
}

function textAnim(){
  let myTextList
  if(window.innerWidth < 567){
    myTextList = ['HOŞGELDİNİZ<br><span class="wave">👋</span>','GEVREK<br>GAMES'];
  }else{
    myTextList = ['HOŞGELDİNİZ','GEVREK\ GAMES'];
  }
  
  startChangingText(myTextList, 3)
}

function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

$('.slider-for').slick({
  swipe:false,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
  vertical: true,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  dots: false,
  arrows:false,
  centerMode: true,
  focusOnSelect: true,
  swipe: false,
  swipeToSlide: false,
  responsive: [
{
  breakpoint: 767,
  settings: {
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    vertical:false,
    swipe: true
  }
}
]
});


//MOBİL MENU
const mobileMenu = document.querySelector(".rek-mobile-menu");
const mobileMenuButton = document.querySelector(".rek-mobile-menu-toggler");
const scrollViewHideElements = Array.from(document.querySelectorAll(".rek-scrollview-hide"));

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
  location.reload();
  if(window.innerWidth > 1200){
    mobileMenuButton.classList.add("removeMe");
  }
  else{
    mobileMenuButton.classList.remove("removeMe");
  }
}
//let timer = null;
setTimeout(function(){
  body.classList.remove('no-scroll');
  window.addEventListener("scroll",function(){
    
    // car.classList.add('moving');
    // if(timer !== null) {
      
    //   clearTimeout(timer);        
    // }
    // timer = setTimeout(function() {
    //   car.classList.remove('moving');
    // }, 150);
    scrollAmount = window.scrollY;
    
    if(autoScroll){
        if(scrollAmount < cachedScrollAmount){
          if(scrollAmount < (parseInt(currentSection .index) * screenHeight) - 100){
            let temp = parseInt(currentSection.index)-parseInt(1);
            targetProxy.index = temp < 0 ? parseInt(0): targetProxy.index-parseInt(1);

            // rekStations.forEach(function(el){
            //   el.classList.remove('active');
            // });
            // rekStations[currentSection].classList.add('active');
          }
        }
        else if(scrollAmount > cachedScrollAmount){
          if(scrollAmount > (parseInt(currentSection .index)* screenHeight ) + 100){
            let temp = parseInt(currentSection.index)+parseInt(1);
            targetProxy.index = temp > sections.length-1 ? sections.length-parseInt(1): targetProxy.index+parseInt(1);

            // rekStations.forEach(function(el){
            //   el.classList.remove('active');
            // });
            // rekStations[currentSection].classList.add('active');
          }
        }
    }
  
    cachedScrollAmount = scrollAmount;

    if(window.innerWidth > 1200){
      if (scrollAmount > 50) {
        mobileMenuButton.classList.remove("removeMe");
        mobileMenu.classList.add("scrollview");
        scrollViewHideElements.forEach(function(el){
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

  const headerLinks = document.querySelectorAll('.rek-link');

  headerLinks.forEach(function(el){
    el.addEventListener('click', function(event){
      event.preventDefault();
      let scrollTarget =  event.target.getAttribute('scroll-target');
      targetProxy.index = parseInt(scrollTarget);
    })
  });
}, 1000);




