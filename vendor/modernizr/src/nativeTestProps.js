define(["injectElementWithStyles","domToCSS"],function(n,o){function t(t,i){var r=t.length;if("CSS"in window&&"supports"in window.CSS){for(;r--;)if(window.CSS.supports(o(t[r]),i))return!0;return!1}if("CSSSupportsRule"in window){for(var e=[];r--;)e.push("("+o(t[r])+":"+i+")");return e=e.join(" or "),n("@supports ("+e+") { #modernizr { position: absolute; } }",function(n){return"absolute"==getComputedStyle(n,null).position})}}return t});