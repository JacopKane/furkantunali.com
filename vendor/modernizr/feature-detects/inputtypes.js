/*!
{
  "name": "Form input types",
  "property": "inputtypes",
  "caniuse": "forms",
  "tags": ["forms"],
  "authors": ["Mike Taylor"],
  "polyfills": [
    "jquerytools",
    "webshims",
    "h5f",
    "webforms2",
    "nwxforms",
    "fdslider",
    "html5slider",
    "galleryhtml5forms",
    "jscolor",
    "html5formshim",
    "selectedoptionsjs",
    "formvalidationjs"
  ]
}
!*/
define(["Modernizr","inputElem","docElement"],function(e,t,i){var l="search tel url email datetime date month week time datetime-local number range color".split(" "),n={};e.inputtypes=function(e){for(var l,a,r,d=e.length,o=":)",u=0;u<d;u++)t.setAttribute("type",l=e[u]),r="text"!==t.type&&"style"in t,r&&(t.value=o,t.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(l)&&void 0!==t.style.WebkitAppearance?(i.appendChild(t),a=document.defaultView,r=a.getComputedStyle&&"textfield"!==a.getComputedStyle(t,null).WebkitAppearance&&0!==t.offsetHeight,i.removeChild(t)):/^(search|tel)$/.test(l)||(r=/^(url|email|number)$/.test(l)?t.checkValidity&&t.checkValidity()===!1:t.value!=o)),n[e[u]]=!!r;return n}(l)});