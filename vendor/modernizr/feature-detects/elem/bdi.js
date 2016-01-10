/*!
{
  "name": "bdi Element",
  "property": "bdi",
  "notes": [{
    "name": "MDN Overview",
    "href": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi"
  }]
}
!*/
define(["Modernizr","addTest","createElement","docElement"],function(e,d,t,n){e.addTest("bdi",function(){var e=t("div"),d=t("bdi");d.innerHTML="&#1573",e.appendChild(d),n.appendChild(e);var i="rtl"===(window.getComputedStyle?getComputedStyle(d,null):d.currentStyle).direction;return n.removeChild(e),i})});