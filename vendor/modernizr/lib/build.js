"use strict";function build(e,r,i){return function(n,a){n=n||{},a=a||function(){};var t;requireConfig.rawText={"modernizr-init":e(n)},n.minify?(t=r("compact",n),requireConfig.optimize="uglify2",requireConfig.uglify2={mangle:{except:["Modernizr"]},beautify:{ascii_only:!0}}):(t=r("full",n),requireConfig.optimize="none"),requireConfig.out=function(e){e=t+e,e=e.replace(/(,\s*)?define\("modernizr-(init|build)",\s*function\(\)\{\};?\)/g,""),e=e.replace(/__VERSION__/g,i.version),n&&n.classPrefix&&(e=e.replace(/(classPrefix'?\s?:\s?)['""']{2}(,)/,'$1"'+n.classPrefix.replace(/"/g,'\\"')+'"$2')),a(e)},requirejs.optimize(requireConfig)}}var inBrowser="function"==typeof define&&"object"==typeof define.amd,_extend=function(e,r){for(var i in r){var n=r[i];"object"==typeof n?(e[i]==e[i]||{},_extend(e[i],n)):e[i]=r[i]}},requireConfig={optimize:"none",generateSourceMaps:!1,optimizeCss:"none",useStrict:!0,include:["modernizr-init"],fileExclusionRegExp:/^(.git|node_modules|modulizr|media|test)$/,wrap:{start:"\n;(function(window, document, undefined){",end:"})(window, document);"},onBuildWrite:function(e,r,i){return"uglify2"===this.optimize&&(i=i.replace(/\/\*\![\s\S]*\!\*\//m,"")),/define\(.*?\{/.test(i)?(i=i.replace(/define\(.*?\{/,""),i=i.replace(/\}\);\s*?$/,""),i.match(/Modernizr\.add(Async)?Test\(/)||(i=i.replace(/return.*[^return]*$/,""))):/require\([^\{]*?\{/.test(i)&&(i=i.replace(/require[^\{]+\{/,""),i=i.replace(/\}\);\s*$/,"")),i=i.replace(/return addTest;/,"")}};if(inBrowser){var suppliedConfig=self._modernizrConfig,metadataUrl="i/js/metadata.json",packageUrl="i/js/modernizr-git/package.json";requireConfig.baseUrl="/i/js/modernizr-git/src",requireConfig.paths={text:"/i/js/requirejs-plugins/lib/text",lib:"/i/js/modernizr-git/lib",json:"/i/js/requirejs-plugins/src/json",lodash:"/i/js/lodash",test:"/i/js/modernizr-git/feature-detects"},suppliedConfig&&(metadataUrl=suppliedConfig.metadataUrl||metadataUrl,packageUrl=suppliedConfig.packageUrl||packageUrl,_extend(requireConfig,suppliedConfig)),self._modernizrMetadata?requirejs.define("metadata",[],function(){return self._modernizrMetadata}):requirejs.define("metadata",["json!"+metadataUrl],function(e){return e}),requirejs.define("package",["json!"+packageUrl],function(e){return e})}else{var requirejs=require("requirejs"),metadata=require("./metadata")(),pkg=require("../package.json");requirejs.define("metadata",[],function(){return metadata}),requirejs.define("package",function(){return pkg}),requireConfig.baseUrl=__dirname+"/../src",requireConfig.paths={lodash:__dirname+"/../node_modules/lodash/index",test:__dirname+"/../feature-detects",lib:__dirname}}if(requirejs.config(requireConfig),inBrowser)define("build",["generate","lib/generate-banner","package"],build);else{var generateBanner=requirejs(__dirname+"/generate-banner.js"),generate=requirejs("generate"),pkg=requirejs("package"),_build=build;module.exports=function(){return _build(generate,generateBanner,pkg).apply(void 0,arguments)}}