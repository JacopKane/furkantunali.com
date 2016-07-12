/*!
{
  "name": "History API",
  "property": "history",
  "caniuse": "history",
  "tags": ["history"],
  "authors": ["Hay Kranen", "Alexander Farkas"],
  "notes": [{
    "name": "W3C Spec",
    "href": "http://www.w3.org/TR/html51/browsers.html#the-history-interface"
  }, {
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.history"
  }],
  "polyfills": ["historyjs", "html5historyapi"]
}
!*/
define(["Modernizr"],function(i){i.addTest("history",function(){var i=navigator.userAgent;return(i.indexOf("Android 2.")===-1&&i.indexOf("Android 4.0")===-1||i.indexOf("Mobile Safari")===-1||i.indexOf("Chrome")!==-1||i.indexOf("Windows Phone")!==-1)&&(window.history&&"pushState"in window.history)})});