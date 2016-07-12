/*!
{
  "name": "CSS Font ch Units",
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "property": "csschunit",
  "tags": ["css"],
  "notes": [{
    "name": "W3C Spec",
    "href": "http://www.w3.org/TR/css3-values/#font-relative-lengths"
  }]
}
!*/
define(["Modernizr","modElem"],function(e,n){e.addTest("csschunit",function(){var e,t=n.elem.style;try{t.fontSize="3ch",e=t.fontSize.indexOf("ch")!==-1}catch(c){e=!1}return e})});