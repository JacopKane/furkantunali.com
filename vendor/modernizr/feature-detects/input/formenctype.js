/*!
{
  "name": "input formenctype",
  "property": "inputformenctype",
  "aliases": ["input-formenctype"],
  "notes": [{
    "name": "WHATWG Spec",
    "href": "http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#attr-fs-formenctype"
  }, {
    "name": "Wufoo demo",
    "href": "http://www.wufoo.com/html5/attributes/16-formenctype.html"
  }],
  "polyfills": [
    "html5formshim"
  ]
}
!*/
define(["Modernizr","createElement"],function(e,n){e.addTest("inputformenctype",!!("formEnctype"in n("input")),{aliases:["input-formenctype"]})});