/*!
  {
  "name": "Flash",
  "property": "flash",
  "tags": ["flash"],
  "polyfills": ["shumway"]
  }
  !*/
define(["Modernizr","createElement","docElement","addTest","getBody","isSVG"],function(e,n,o,i,t,a){e.addAsyncTest(function(){var e,d,c=function(e){e.fake&&e.parentNode&&e.parentNode.removeChild(e)},l=function(e,n){var o=!!e;if(o&&(o=new Boolean(o),o.blocked="blocked"===e),i("flash",function(){return o}),n&&v.contains(n)){for(;n.parentNode!==v;)n=n.parentNode;v.removeChild(n)}};try{d="ActiveXObject"in window&&"Pan"in new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(s){}if(e=!("plugins"in navigator&&"Shockwave Flash"in navigator.plugins||d),e||a)l(!1);else{var r,p,h=n("embed"),v=t();if(h.type="application/x-shockwave-flash",v.appendChild(h),o.appendChild(v),!("Pan"in h||d))return l("blocked",h),void c(v);r=function(){return o.contains(v)?(o.contains(h)?(p=h.style.cssText,""!==p?l("blocked",h):l(!0,h)):l("blocked"),void c(v)):(v=document.body||v,h=n("embed"),h.type="application/x-shockwave-flash",v.appendChild(h),setTimeout(r,1e3))},setTimeout(r,10)}})});