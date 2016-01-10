/*!
{
  "name": "input formaction",
  "property": "inputformaction",
  "aliases": ["input-formaction"],
  "notes": [{
    "name": "WHATWG Spec",
    "href": "http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#attr-fs-formaction"
  }, {
    "name": "Wufoo demo",
    "href": "http://www.wufoo.com/html5/attributes/13-formaction.html"
  }],
  "polyfills": [
    "webshims"
  ]
}
!*/
define(["Modernizr","createElement"],function(n,i){n.addTest("inputformaction",!!("formAction"in i("input")),{aliases:["input-formaction"]})});