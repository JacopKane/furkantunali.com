/*!
{
  "name": "progress Element",
  "caniuse": "progressmeter",
  "property": ["progressbar", "meter"],
  "tags": ["elem"],
  "builderAliases": ["elem_progress_meter"],
  "authors": ["Stefan Wallin"]
}
!*/
define(["Modernizr","createElement"],function(e,r){e.addTest("progressbar",void 0!==r("progress").max),e.addTest("meter",void 0!==r("meter").max)});