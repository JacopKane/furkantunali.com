/*!
{
  "name": "CSS Transforms",
  "property": "csstransforms",
  "caniuse": "transforms2d",
  "tags": ["css"]
}
!*/
define(["Modernizr","testAllProps"],function(n,r){n.addTest("csstransforms",function(){return navigator.userAgent.indexOf("Android 2.")===-1&&r("transform","scale(1)",!0)})});