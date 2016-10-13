'use strict';

// Preloader
(function () {

  var imgs = [];
  var path;
  var preloader = document.getElementById('preloader');
  var preloaderCounter = document.getElementById('preloaderCounter');

  var dom = document.body.querySelectorAll('*');
  Array.prototype.forEach.call(dom, function(el, i){

    var background = getComputedStyle(el)['background-image'];

    if (background !== 'none') {
      path = background.replace('url("', '').replace('")', '');

      if( path.indexOf('-gradient(') !== -1 ) return;

      imgs.push(path);
    }

    if (el.tagName == 'IMG') {
      path = el.getAttribute('src');

      if (!path) return;
      imgs.push(path);
    }


  });

  console.log(imgs);

  var percents = 100 / imgs.length;
  var procent = 0;
  var counter = 0;

  for (var i = 0; i < imgs.length; i++) {
    var img = document.createElement('img');
    img.src = imgs[i];

    img.onload = function(){
      counter++;
      procent = Math.round(counter * percents);
      preloaderCounter.textContent = procent;

      if (procent == 100) {
        preloader.style.opacity = '0';
        preloader.addEventListener("transitionend", function () {
          preloader.style.display = 'none';
        }, false);
      }
    };
  }

})();

// Welcome
(function () {

  var welcome = document.getElementById('welcomeFlipper');
  var authBtn = document.getElementById('authBtn');
  var flipAuth = document.getElementById('authBlock');
  var flipWelcome = document.getElementById('welcomeBlock');
  var welcomeBtn = document.getElementById('welcomeBtn');


  if (welcome == null) return;


  authBtn.addEventListener('click', flip);
  welcomeBtn.addEventListener('click', flip);

  function flip() {

    if(welcome.classList.contains('welcome__flipper--flip')) {
      authBtn.style.opacity = '1';
      authBtn.style.pointerEvents = 'auto';
      welcome.classList.remove('welcome__flipper--flip');
      flipAuth.classList.add('welcome__flipper--back');
    } else {
      authBtn.style.opacity = '0';
      authBtn.style.pointerEvents = 'none';
      welcome.classList.add('welcome__flipper--flip');
      flipWelcome.classList.add('welcome__flipper--back');

    }
  }

})();

// Header menu
(function () {
  var nav = document.getElementById('nav');
  var navTrigger = document.getElementById('navTrigger');
  var navOpen = document.getElementById('navOpen');

  if (nav == null) return;

  navTrigger.addEventListener("click", openNav, false);

  function openNav() {
    console.log("click");

    if (nav.classList.contains('nav--open')) {
      nav.classList.remove('nav--open');
      navOpen.style.display = 'none';
    } else {
      nav.classList.add('nav--open');
      navOpen.style.display = 'block';
    }
  }

})();

// Scroll
(function () {

  var linkNav = document.querySelectorAll('[href^="#"]');
  var V = 0.5;  // скорость, может иметь дробное значение через точку
  for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].onclick = function(){
      var w = window.pageYOffset,
        hash = this.href.replace(/[^#]*(.*)/, '$1');

      if (hash == '#') return;

      var t = document.querySelector(hash).getBoundingClientRect().top,
        start = null;
      requestAnimationFrame(step);
      function step(time) {
        if (start === null) start = time;
        var progress = time - start,
          r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
        window.scrollTo(0,r);
        if (r != w + t) {requestAnimationFrame(step)} else {location.hash = hash}
      }
      return false;
    }
  }

})();

// Google Map
var map;

function initMap() {
  if (!document.getElementById('map')) return;

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.724, lng: 37.767},
    zoom: 13,
    scrollwheel: false,
    disableDefaultUI: true,
    styles: [
      {
        elementType: 'geometry',
        stylers: [{color: '#f5f5f5'}]
      },
      {
        elementType: 'labels.icon',
        stylers: [{visibility: 'off'}]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{color: '#616161'}]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{color: '#f5f5f5'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{color: '#bdbdbd'}]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{color: '#eeeeee'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#757575'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#e5e5e5'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9e9e9e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#ffffff'}]
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [{color: '#757575'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#dadada'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#616161'}]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9e9e9e'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{color: '#e5e5e5'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{color: '#eeeeee'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#96d7c8'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9e9e9e'}]
      }
    ]
  });
}

// Slider
(function () {
  var slide = document.getElementById("slide");

  if (slide == null) {
    return;
  }

  var btnDown = document.getElementById("sliderBtnDown");
  var btnUp = document.getElementById("sliderBtnUp");
  var imgDown = btnDown.getElementsByClassName("slider__button-img");
  var imgUp = btnUp.getElementsByClassName("slider__button-img");
  var imgTop = slide.getElementsByClassName("slider__slide-img");

  var contentArr = ['work-1', 'work-2', 'work-3', 'work-4'];

  var content = document.getElementById('content');
  var xhr = new XMLHttpRequest();

  var counter = 0;
  var counterDown = 3;
  var counterUp = 1;
  var flag = true;

  console.log(counterFn(counter));
  console.log(counterFn(counterDown));
  console.log(counterFn(counterUp));

  btnDown.addEventListener("click", down, false);
  btnUp.addEventListener("click", up, false);


  function down() {
    new Promise(function (resolve) {

      var flagTransition = true;

      var direction = -1;

      if (direction == undefined) {
        return;
      }

      var activeDown = btnDown.getElementsByClassName("active");
      var activeUp = btnUp.getElementsByClassName("active");
      var activeSlide = slide.getElementsByClassName("active-slide");


      if (flag) {
        flag = false;

        console.log(activeDown[0]);

        // Ajax

        xhr.open('GET', 'assets/slider/content/' + contentArr[counterFn(counter + direction)] + '.html', true); //
        xhr.onload = function () {
          content.innerHTML = this.responseText;
        };
        xhr.send();

        activeDown[0].style.top = '100%';
        activeSlide[0].style.opacity = '0';
        imgTop[counterFn(counter + direction)].style.opacity = '1';

        imgDown[counterFn(counterDown + direction)].style.visibility = 'visible';
        imgDown[counterFn(counterDown + direction)].style.top = '0';

        console.log(imgUp);

        activeUp[0].style.top = '-100%';
        imgUp[counterFn(counterUp + direction)].style.visibility = 'visible';
        imgUp[counterFn(counterUp + direction)].style.top = '0';

        if (!flag && direction == -1) {
          activeDown[0].addEventListener("transitionend", transitionEnd, false);
        } else if (!flag && direction == 1) {
          activeUp[0].addEventListener("transitionend", transitionEnd, false);
        }

      }

      function transitionEnd() {

        if (!flagTransition) {
          return;
        }

        activeSlide[0].style.opacity = '0';
        activeSlide[0].classList.remove("active-slide");

        if (direction == -1) {
          imgTop[counterFn(counterDown)].classList.add("active-slide");
        } else {
          imgTop[counterFn(counterUp)].classList.add("active-slide");
        }


        activeDown[0].style.visibility = 'hidden';
        activeDown[0].style.top = '-100%';
        activeDown[0].classList.remove("active");
        imgDown[counterFn(counterDown + direction)].classList.add("active");

        activeUp[0].style.visibility = 'hidden';
        activeUp[0].style.top = '100%';
        activeUp[0].classList.remove("active");
        imgUp[counterFn(counterUp + direction)].classList.add("active");

        counter = (counterFn(counter + direction));
        counterDown = (counterFn(counterDown + direction));
        counterUp = (counterFn(counterUp + direction));

        console.log(counter);
        console.log(counterDown);
        console.log(counterUp);

        console.log("animation end");
        flagTransition = false;

        resolve();
      }


    }).then(function () {
      setTimeout(function () {
        flag = true;
        console.log("ready;");
      }, 500);
    });

  }

  function up() {
    new Promise(function (resolve) {

      var flagTransition = true;

      var direction = 1;

      if (direction == undefined) {
        return;
      }

      var activeDown = btnDown.getElementsByClassName("active");
      var activeUp = btnUp.getElementsByClassName("active");
      var activeSlide = slide.getElementsByClassName("active-slide");


      if (flag) {
        flag = false;

        // Ajax
        xhr.open('GET', 'assets/slider/content/' + contentArr[counterFn(counter + direction)] + '.html', true); //
        xhr.onload = function () {
          content.innerHTML = this.responseText;
        };
        xhr.send();

        console.log(activeDown[0]);

        activeDown[0].style.top = '110%';
        activeSlide[0].style.opacity = '0';
        imgTop[counterFn(counter + direction)].style.opacity = '1';

        imgDown[counterFn(counterDown + direction)].style.visibility = 'visible';
        imgDown[counterFn(counterDown + direction)].style.top = '0';

        console.log(imgUp);

        activeUp[0].style.top = '-110%';
        imgUp[counterFn(counterUp + direction)].style.visibility = 'visible';
        imgUp[counterFn(counterUp + direction)].style.top = '0';

        if (!flag && direction == -1) {
          activeDown[0].addEventListener("transitionend", transitionEnd, false);
        } else if (!flag && direction == 1) {
          activeUp[0].addEventListener("transitionend", transitionEnd, false);
        }

      }

      function transitionEnd() {

        if (!flagTransition) {
          return;
        }

        activeSlide[0].style.opacity = '0';
        activeSlide[0].classList.remove("active-slide");

        if (direction == -1) {
          imgTop[counterFn(counterDown)].classList.add("active-slide");
        } else {
          imgTop[counterFn(counterUp)].classList.add("active-slide");
        }


        activeDown[0].style.visibility = 'hidden';
        activeDown[0].style.top = '-110%';
        activeDown[0].classList.remove("active");
        imgDown[counterFn(counterDown + direction)].classList.add("active");

        activeUp[0].style.visibility = 'hidden';
        activeUp[0].style.top = '110%';
        activeUp[0].classList.remove("active");
        imgUp[counterFn(counterUp + direction)].classList.add("active");

        counter = (counterFn(counter + direction));
        counterDown = (counterFn(counterDown + direction));
        counterUp = (counterFn(counterUp + direction));

        console.log(counter);
        console.log(counterDown);
        console.log(counterUp);

        console.log("animation end");
        flagTransition = false;

        resolve();
      }

    }).then(function () {
      setTimeout(function () {
        flag = true;
        console.log("ready;");
      }, 500);
    });
  }

  function counterFn(positionSlide) {
    var result;
    if (positionSlide < 0) {
      result = imgDown.length + positionSlide;
    } else if (positionSlide >= imgDown.length) {
      result = positionSlide - imgDown.length;
    } else {
      result = positionSlide;
    }
    return result;
  }

})();

// Blog menu
(function () {

  var blog = document.getElementById('blog');
  var blogMenu = document.getElementById('blogMenu');
  var menuList = document.getElementById('menuList');
  var blogContent = document.getElementById('blogContent');
  var blogMenuTrigger = document.getElementById('blogMenuTrigger');
  var nav = document.querySelectorAll('article[id^="article"]');

  var flagFix = true;
  var flagFixResize;
  var flagMenu = false;

  var coordinatesContent = getCoords(blogContent).top;
  console.log(document.body.clientWidth);

  flagFixResize = document.body.clientWidth >= 1200;

  window.addEventListener('resize', function () {
    flagFixResize = document.body.clientWidth >= 1200;

    if (flagFixResize) {
      menuOpen(false);
    } else {
      menuOpen(true);
    }
  });

  window.addEventListener('scroll', function (e) {

    if (flagFixResize) {
      blogFix();
    }

    if (window.scrollY > coordinatesContent - 20) {
      for (var i = 0; i < nav.length; i++) {

        console.log(nav[i]);
        menuList.querySelector('a[href="#' + nav[i].id + '"]').parentNode
          .className=((1 >= nav[i].getBoundingClientRect().top && nav[i].getBoundingClientRect()
          .top >= 1-nav[i].offsetHeight) ? 'menu__item menu__item--active' : 'menu__item');
      }
    }




  });

  blogMenu.addEventListener('click', function () {
    if (flagFixResize) return;
    menuOpen(flagMenu);
  });

  function menuOpen(value) {
    if (value) {
      blogMenu.style.marginLeft = '-300px';
      flagMenu = false;
    } else {
      blogMenu.style.marginLeft = '0';
      flagMenu = true;
    }
  }

  function blogFix() {
    if (window.scrollY > coordinatesContent - 20 && flagFix) {

      blogMenu.classList.add('blog__menu--fix');
      blogContent.style.marginLeft = '340px';
      flagFix = false;

    } else if (window.scrollY < coordinatesContent - 20 && !flagFix) {
      blogMenu.classList.remove('blog__menu--fix');
      blogContent.style.marginLeft = '0';
      flagFix = true;
    }
  }


  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  }

})();