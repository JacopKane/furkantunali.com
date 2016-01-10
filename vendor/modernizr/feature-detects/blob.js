/*!
{
  "name": "Blob constructor",
  "property": "blobconstructor",
  "aliases": ["blob-constructor"],
  "builderAliases": ["blob_constructor"],
  "caniuse": "blobbuilder",
  "notes": [{
    "name": "W3C spec",
    "href": "http://dev.w3.org/2006/webapi/FileAPI/#constructorBlob"
  }],
  "polyfills": ["blobjs"]
}
!*/
define(["Modernizr"],function(n){n.addTest("blobconstructor",function(){try{return!!new Blob}catch(n){return!1}},{aliases:["blob-constructor"]})});