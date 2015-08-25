/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

'use strict';



var PrecacheConfig = [["example-basic.html","b7a395e1f73baf08310c564cc256c1b1"],["example.html","4d5472d5628ba778dcdd63cceba94d86"],["fonts/064bf6d7-724b-4182-8b66-f2e9125c9c6e.eot","1fb0d38f7af1b1f2f704fecd8105cb3c"],["fonts/0869dafd-e433-4148-bc83-1c7819642387.svg","d4ce24e21dde1e1b070fbecd8bd6506a"],["fonts/18182694-d350-42bc-a00a-10e3670d590f.ttf","c45b6acb2805175742265ecffe58c5df"],["fonts/1c4a9259-aba1-4b26-99da-167399ccd516.eot","00abcbd7569c1280232a9215ca358afd"],["fonts/1d97ad64-e2b6-4551-be90-edb33d26ab26.woff2","d18761ff9732bc456c5f35da5fc0cda1"],["fonts/1ee9eb38-03f4-40b8-9cad-3f127f0a8e62.ttf","1ea879bbdabdf9c45c4c82b9b3a9cb91"],["fonts/24567192-78d1-4fcf-84be-05d88fafb457.woff2","89d9a2181b18323627b09732d8cdbb79"],["fonts/24a86e0b-0e16-478e-b1b6-fcefa5d8cf25.ttf","a2c5bca8048294827775f4eae5e9cd97"],["fonts/317168fd-e500-44ab-a340-5615696f53a2.svg","25a65cee5c4c28ccc8f66c23a13d9b52"],["fonts/34508d43-56ab-48bc-8027-0bdfcff3b98a.woff","059cbac2c7bab59d3e26d0e393850c9e"],["fonts/3b454eab-05ee-46da-954b-24cfb42655de.woff","07277822aa64ad1884ae34d6806d23d7"],["fonts/3b4da2ec-8e53-4b8d-bdec-714bbb02e076.eot","ad8f8ee7377a8f2e595981878402b52c"],["fonts/3bc5c864-8261-4437-9d41-4c9730a80cdc.woff2","744f649319f0f0940515485731dbb958"],["fonts/42dad980-6822-4538-b14d-24f7edc8bbc8.woff","456f4cbb0206b0323a1533e0a27d6b78"],["fonts/4721c5d1-d32a-4c98-b31c-c38dc4d7d4b6.woff","5b826712df3716faeedb528debcd72ed"],["fonts/4833d369-2466-4f20-90a2-2dc67da099cb.woff","bcc2d07f970310def3e6ceeea6c03116"],["fonts/570cc714-8bcd-4967-8577-7d6241b74883.ttf","c551678a746be1319ea5c4a8a28f3482"],["fonts/585f41e2-ba54-4be3-9bc3-7f4b43fa110d.ttf","b90cb617e51abfcca7378f3666964978"],["fonts/58af206c-4125-4ed1-964c-3f2a565c57b3.woff","a650a1e7de17e9a401e97e9a75c7726a"],["fonts/5a12306f-915e-4b7c-9bd9-ff80ed06180f.ttf","6a2d4ad18dc14e62d908fc9d8453f02a"],["fonts/608f7df5-8601-4459-953b-05f016b5440b.woff2","04caef00139364fed8f8fc5a938d44c0"],["fonts/62d8d56f-9c91-4630-bc2d-7292ede89483.svg","5f524ae35499837038f3e9c288fec335"],["fonts/684743b9-28ad-4425-bee0-84b18fe26304.woff2","c0149e1f1aed7a3b976b1798dc0aafb2"],["fonts/6a77c29b-2ff5-43d0-90f8-495d83004b3b.woff","f5b78fc54577c046248493eede4c7385"],["fonts/6f5e2651-f3c2-4e38-b6e3-5e72dc48898b.eot","57bda97b52f628aaeaee979b5e42d382"],["fonts/733857db-f09e-418e-92c8-5b7befdc90a1.woff2","108e2840f3546b6e5a90cc511d028ab5"],["fonts/771ff675-f76c-42b5-a29b-7be0bc7bb144.ttf","12cf83ee45552d3207c9e8d3dde84cca"],["fonts/802b9bb5-c701-4fca-92e6-db3015e59b7d.svg","6bd4a760ac0f35cb05615c5aa394a996"],["fonts/80a1e4c8-8358-4716-ad3c-c290bd447d7a.svg","872b6f11db8bef6a8f8beff48cdc3dac"],["fonts/811abd2d-f864-45de-9b52-debd132a8e55.svg","535c398f02ec9035506c6ace6b96c615"],["fonts/83391331-5543-43bd-9036-09f8594f2b33.eot","3ff2e495bd9e5434f76865d868c3a717"],["fonts/876b4e64-a7e7-4a78-bdc1-b354e720ce69.eot","f4b7658b1c34f8fd80c79ad5301722f7"],["fonts/8910643d-edba-40a7-9d06-d7e5f2d58267.eot","ed6235fb15379304e36f36bd0a719263"],["fonts/8c67e60b-8e8e-4afc-9f04-c103559ce97c.svg","962b835dc78023b987228ecd8decc21c"],["fonts/8eeb3590-25ac-4d03-b9cf-9a5a151e18d4.svg","6c805bf2c5f64c59285708e46de6f7da"],["fonts/948f0dca-ee24-4b8d-9d39-e6647e0c10bd.woff","8b9635e9b84364f26785ecd0cd4a2ace"],["fonts/952db4c4-b7dd-4a60-bdaf-18ac441fee68.svg","a7ad347cbf4e79ee7b55701f4a66e2d0"],["fonts/9b798c70-55d3-40d9-930b-b8bf15140fa5.woff2","dc4d4c1e45eec06d7c6b76bd352d4279"],["fonts/a280f523-3482-46ec-92ae-d0754bf8ec42.svg","3a57ed468e5dfb1f9e8ed2441688d851"],["fonts/a68bbb74-8dc7-49e4-b715-ee9d2191db62.woff2","9c1040ed236de7d73082b680503b150b"],["fonts/ac693bbd-b70d-4c84-aa72-785527e83445.svg","fe85b59357938d9f0c813d870f861d93"],["fonts/b5fd9d18-b2dc-4f4f-9050-68ea7172956c.eot","c6c410478727848b381035ce36676f82"],["fonts/c3d3aab3-17a6-4d12-acfe-50d926275731.ttf","159afdd3bb640d264179624f94e442f3"],["fonts/c3e8f4a5-d09a-4b13-b013-1507a2be977d.ttf","6e64030bac7eaef65d9cbde4a349572a"],["fonts/c729c594-aaa8-40c8-bb7b-e22095026114.woff2","56de59fa78f03b7f1a531bef76dc21d1"],["fonts/c81d0a2e-0ce5-4c19-9d4c-c7cab5e373b2.svg","92f66a1cd4413cbe264263fb5de4f857"],["fonts/c84d6940-7b48-4056-8835-c0b30e63d246.eot","20a8b654b768f946f66ae0ac1bb1d8ad"],["fonts/ca56d6a6-ea85-41be-9dcf-c6a2d419e03a.eot","1e660a711387c9c3bb83a3d96050138a"],["fonts/caef1298-748a-48f2-9338-27f3bddcee89.woff","fa2e3f7dbd0cf96166a02d7d870beaa5"],["fonts/ce849112-fea8-4723-ae38-3a0f2ce6eaa8.woff","b02b43b429a0cbcc1a1d8c6400583297"],["fonts/cf541a6e-1ef1-4303-a114-ea9560e7c3dc.ttf","86009fc14afffd8bf383fc596fded8d8"],["fonts/d0256a34-2988-45d7-8093-104216fc319d.woff","ae709b5e0a49f03d635ddbcf80658d4a"],["fonts/d5e38cca-491f-4b1e-9877-876743c50258.woff","13303a213510cb65b7b9a0d113021449"],["fonts/da37f530-b57a-4972-a790-74eb04347d50.woff2","8fbfcd8ccc76877b86c6157dcd35e959"],["fonts/dc599214-8fb0-45bc-857b-774c98893c2e.woff","65ad61e059d44a3e45da1cfa5d961b44"],["fonts/defe4f4f-2a42-45c8-9b16-3afbd040f231.eot","30d6b44c043223197c3d55be98b9e1fa"],["fonts/e1df2433-a7d4-4c15-ad3d-ad9992dd1e9a.woff2","b990a94d1451df88307984fac0067d68"],["fonts/e7fbbd4c-e948-49c8-b9b4-32b24abc4abf.eot","0e3ca46639916ac7ba2db8f05274a901"],["fonts/e8d8902e-4597-488e-adb1-8cdd3ae0a63b.ttf","dcc2baaafcecd295a66338e0886fee1f"],["fonts/ee106998-613e-4bcb-b433-40f757862854.ttf","e499a2ead2908d02cdb970647e4cfe30"],["fonts/ef5fdc47-dd49-4d8f-bde6-a835e955f21e.svg","bb6aec6a044f5249b6033be76faa14eb"],["fonts/ef65dcdb-9555-4ccb-9414-2d839073053e.svg","ba83cc5d20fd22c180261d8e2cf25d3a"],["fonts/f02778c3-2dfe-4852-a53c-ac2315225d46.eot","22257600b31d04b1aa036983fb39f0c4"],["fonts/f211b78a-fd4d-4434-8188-d7d641c533da.woff2","4f2ae51c72c6a82cadd60ec6f5ab7f34"],["fonts/f2aa8ca9-2ed7-4360-b91f-03440db255e0.eot","4bebea72169b23d8255e9a824a9c85bd"],["fonts/f50ac13c-e829-42c2-b7a8-8f0ecbbe1105.ttf","bb7eed4022dea8a8476fd2b82cd48a4c"],["fonts/fdb8d9a1-706a-43f1-9b12-5e87cea644a3.woff","45fb91a48cbe7937c2dfebfdbfbb5ee1"],["fonts/fdd4f182-f968-42fa-a72c-744f3ff27bc8.woff2","e681c4a5f8db2dfe61d823d6f3b67be4"],["fonts/fdf8765b-9cb8-483b-b5c3-1cc7146fb54f.woff2","3457de5c262911ef1b742f0b411b61ad"],["fonts/fed2d287-5d32-4e18-9d77-dea82f232e57.ttf","395cad794177ee72a059db112a2d31f3"],["images/hamburger.svg","d2cb0dda3e8313b990e8dcf5e25d2d0f"],["images/icons/icons-hinted.ttf","d41d8cd98f00b204e9800998ecf8427e"],["images/icons/icons.eot","742c4affdabd597249ab4d8f32ceb5d9"],["images/icons/icons.svg","46661d6d65debc63884004fed6e37e5c"],["images/icons/icons.ttf","43ac9104d6fac184272ba3784167577d"],["images/icons/icons.woff","e470c7159d62bbeedf51a7d98e65ca4d"],["images/icons/icons.woff2","1a75a1500dc4614b85523f4183cdeef7"],["images/icons/placeholder--medium.png","baa033665c8a070a9e5a66c2bd8b0474"],["images/icons/placeholder--small.png","d5efa06871740522ebb8ae5da95b7737"],["images/icons/placeholder--wide.png","0f9f6ff52eac6a13ab562341c6e329d1"],["images/touch/apple-touch-icon.png","7326f54bfe6776293f08b34c3a5fde7b"],["images/touch/chrome-touch-icon-192x192.png","571f134f59f14a6d298ddd66c015b293"],["images/touch/icon-128x128.png","7c46d686765c49b813ac5eb34fabf712"],["images/touch/ms-touch-icon-144x144-precomposed.png","452d90b250d6f41a0c8f9db729113ffd"],["index.html","0d2aeee3db3c9a5d2fd31f52cc8f0981"],["manifest.json","d83aafba187e449abd4960bcc45b2fe6"],["resume-doc.html","ebfc2841304beb06bdda2b34cb5014fa"],["resume.html","7a92861071dee77eeea15476a3588c14"],["scripts/main.min.js","89b9261d9a2253af1359a2d38b97febe"],["styles/common.css","7afe74f95c35d163e6eebc8c9fb035fc"],["styles/fonts-async.css","0a03a9a34814778e727de9f50a4aa871"],["styles/fonts.css","139ce65afb8705dc228bd0d5f8ab47b5"],["styles/main.css","f4939bd52fcd62dfdbbd999d656fcb07"],["styles/resume.css","73acbcb5a12145a8f35b705a743a76fa"],["styles/smart-underline.css","291b0cb84a8cf54c4f83a3177409c80c"],["vendor/font-awesome/css/font-awesome.css","dd61067e91386ff67fc7ab51cb1cad0d"],["vendor/font-awesome/css/font-awesome.min.css","08fcd272486d3268b2ec8c283f4f5fd5"],["vendor/font-awesome/scss/font-awesome.css","56031361f6c008fa7af175b4a83365d0"],["vendor/polymer/polymer-micro.html","5e47529a45bea67ba9b2fbaf9eb2562f"],["vendor/polymer/polymer-mini.html","3fd13aa5632cd35b62e35fd90619354d"],["vendor/polymer/polymer.html","ef1322171fdbd45fe4607fb8e34d029d"],["vendor/social-media-icons/demo.html","44fd6e969b4007c81345c6b2125ae2cc"],["vendor/social-media-icons/index.html","1e9b9502569786ab290cf39e70ea660a"],["vendor/social-media-icons/social-media-icons.html","b7c56be66beb4ca003b744c96b574ff9"],["vendor/system.js/dist/system-csp-production.js","64eaf02106b394da3c990c0121d8776c"],["vendor/system.js/dist/system-csp-production.src.js","5c9e0fb26eb4339fd449fda4821b7d02"],["vendor/system.js/dist/system-polyfills.js","fc606a7eb0e596a2a20da402ef1a9d08"],["vendor/system.js/dist/system-polyfills.src.js","c2b368ff7c083d137adcda42c3cdbbdf"],["vendor/system.js/dist/system-register-only.js","120673a1d347166204dc3fb7297ca083"],["vendor/system.js/dist/system-register-only.src.js","e52295f4c2e3fc53eb0283ac9cc13a8c"],["vendor/system.js/dist/system.js","373b6dd7443d63e1dd6ee7b867de6ef7"],["vendor/system.js/dist/system.src.js","69ebcb8602e52e89e966647e0560a1eb"],["vendor/webcomponentsjs/CustomElements.js","61b8050f16f609c92b1444ccaa6a6c6f"],["vendor/webcomponentsjs/CustomElements.min.js","61b8050f16f609c92b1444ccaa6a6c6f"],["vendor/webcomponentsjs/HTMLImports.js","c99ae7ccf843dfd8f4c533367fdfdcc8"],["vendor/webcomponentsjs/HTMLImports.min.js","f4669b27379a4629269d7d0801291f05"],["vendor/webcomponentsjs/MutationObserver.js","7a624715a4e8ca9d35aaf66a5225c8b8"],["vendor/webcomponentsjs/MutationObserver.min.js","7a624715a4e8ca9d35aaf66a5225c8b8"],["vendor/webcomponentsjs/ShadowDOM.js","6958fee7007b5ea22255524b2f8a1ef4"],["vendor/webcomponentsjs/ShadowDOM.min.js","6d163428d2a856aae65ec7e3398d8cd4"],["vendor/webcomponentsjs/webcomponents-lite.js","965294997c7c8e8abf2e9ccbd4dc3472"],["vendor/webcomponentsjs/webcomponents-lite.min.js","1c0863c2beb90f38dce8888b989d88a9"],["vendor/webcomponentsjs/webcomponents.js","413d38cf8d343a5c7a65cab592ca635c"],["vendor/webcomponentsjs/webcomponents.min.js","245e32a3baf0a7087ff67d4e9aa93f52"]];
var CacheNamePrefix = 'sw-precache-v1-furkantunali.com-' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var populateCurrentCacheNames = function (precacheConfig, cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl, ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  var now = Date.now();

  event.waitUntil(
    caches.keys().then(function(allCacheNames) {
      return Promise.all(
        Object.keys(CurrentCacheNamesToAbsoluteUrl).filter(function(cacheName) {
          return allCacheNames.indexOf(cacheName) == -1;
        }).map(function(cacheName) {
          var url = new URL(CurrentCacheNamesToAbsoluteUrl[cacheName]);
          // Put in a cache-busting parameter to ensure we're caching a fresh response.
          if (url.search) {
            url.search += '&';
          }
          url.search += 'sw-precache=' + now;
          var urlWithCacheBusting = url.toString();

          console.log('Adding URL "%s" to cache named "%s"', urlWithCacheBusting, cacheName);
          return caches.open(cacheName).then(function(cache) {
            var request = new Request(urlWithCacheBusting, {credentials: 'same-origin'});
            return fetch(request.clone()).then(function(response) {
              if (response.status == 200) {
                return cache.put(request, response);
              } else {
                console.error('Request for %s returned a response with status %d, so not attempting to cache it.',
                  urlWithCacheBusting, response.status);
                // Get rid of the empty cache if we can't add a successful response to it.
                return caches.delete(cacheName);
              }
            });
          });
        })
      ).then(function() {
        return Promise.all(
          allCacheNames.filter(function(cacheName) {
            return cacheName.indexOf(CacheNamePrefix) == 0 &&
                   !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            console.log('Deleting out-of-date cache "%s"', cacheName);
            return caches.delete(cacheName);
          })
        )
      });
    }).then(function() {
      if (typeof self.skipWaiting == 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim == 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command == 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method == 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    if (cacheName) {
      event.respondWith(
        // We can't call cache.match(event.request) since the entry in the cache will contain the
        // cache-busting parameter. Instead, rely on the fact that each cache should only have one
        // entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              return response || fetch(event.request).catch(function(e) {
                console.error('Fetch for "%s" failed: %O', urlWithoutIgnoredParameters, e);
              });
            });
          });
        }).catch(function(e) {
          console.error('Couldn\'t serve response for "%s" from cache: %O', urlWithoutIgnoredParameters, e);
          return fetch(event.request);
        })
      );
    }
  }
});

