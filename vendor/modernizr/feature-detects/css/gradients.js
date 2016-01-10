/*!
{
  "name": "CSS Gradients",
  "caniuse": "css-gradients",
  "property": "cssgradients",
  "tags": ["css"],
  "knownBugs": ["False-positives on webOS (https://github.com/Modernizr/Modernizr/issues/202)"],
  "notes": [{
    "name": "Webkit Gradient Syntax",
    "href": "http://webkit.org/blog/175/introducing-css-gradients/"
  },{
    "name": "Mozilla Linear Gradient Syntax",
    "href": "http://developer.mozilla.org/en/CSS/-moz-linear-gradient"
  },{
    "name": "Mozilla Radial Gradient Syntax",
    "href": "http://developer.mozilla.org/en/CSS/-moz-radial-gradient"
  },{
    "name": "W3C Gradient Spec",
    "href": "dev.w3.org/csswg/css3-images/#gradients-"
  }]
}
!*/
define(["Modernizr","prefixes","createElement"],function(e,t,r){e.addTest("cssgradients",function(){for(var i,n="background-image:",a="gradient(linear,left top,right bottom,from(#9f9),to(white));",o="",f=0,d=t.length-1;d>f;f++)i=0===f?"to ":"",o+=n+t[f]+"linear-gradient("+i+"left top, #9f9, white);";e._config.usePrefixes&&(o+=n+"-webkit-"+a);var g=r("a"),s=g.style;return s.cssText=o,(""+s.backgroundImage).indexOf("gradient")>-1})});