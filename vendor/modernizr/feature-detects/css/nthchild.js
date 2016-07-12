/*!
{
  "name": "CSS :nth-child pseudo-selector",
  "caniuse": "css-sel3",
  "property": "nthchild",
  "tags": ["css"],
  "notes": [
    {
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/pull/685"
    },
    {
      "name": "Sitepoint :nth-child documentation",
      "href": "http://reference.sitepoint.com/css/pseudoclass-nthchild"
    }
  ],
  "authors": ["@emilchristensen"],
  "warnings": ["Known false negative in Safari 3.1 and Safari 3.2.2"]
}
!*/
define(["Modernizr","testStyles"],function(t,i){i("#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}",function(i){t.addTest("nthchild",function(){for(var t=i.getElementsByTagName("div"),n=!0,d=0;d<5;d++)n=n&&t[d].offsetWidth===d%2+1;return n})},5)});