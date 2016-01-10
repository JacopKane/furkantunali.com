/*!
{
  "name": "input formtarget",
  "property": "inputformtarget",
  "aliases": ["input-formtarget"],
  "notes": [{
    "name": "WHATWG Spec",
    "href": "http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#attr-fs-formtarget"
  }, {
    "name": "Wufoo demo",
    "href": "http://www.wufoo.com/html5/attributes/15-formtarget.html"
  }],
  "polyfills": [
    "html5formshim"
  ]
}
!*/
define(["Modernizr","createElement"],function(t,e){t.addTest("inputformtarget",!!("formtarget"in e("input")),{aliases:["input-formtarget"]})});