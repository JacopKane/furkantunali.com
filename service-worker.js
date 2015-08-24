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



var PrecacheConfig = [["example-basic.html","b7a395e1f73baf08310c564cc256c1b1"],["example.html","4d5472d5628ba778dcdd63cceba94d86"],["fonts/34508d43-56ab-48bc-8027-0bdfcff3b98a.woff","059cbac2c7bab59d3e26d0e393850c9e"],["fonts/3b454eab-05ee-46da-954b-24cfb42655de.woff","07277822aa64ad1884ae34d6806d23d7"],["fonts/42dad980-6822-4538-b14d-24f7edc8bbc8.woff","456f4cbb0206b0323a1533e0a27d6b78"],["fonts/4721c5d1-d32a-4c98-b31c-c38dc4d7d4b6.woff","5b826712df3716faeedb528debcd72ed"],["fonts/4833d369-2466-4f20-90a2-2dc67da099cb.woff","bcc2d07f970310def3e6ceeea6c03116"],["fonts/58af206c-4125-4ed1-964c-3f2a565c57b3.woff","a650a1e7de17e9a401e97e9a75c7726a"],["fonts/6a77c29b-2ff5-43d0-90f8-495d83004b3b.woff","f5b78fc54577c046248493eede4c7385"],["fonts/948f0dca-ee24-4b8d-9d39-e6647e0c10bd.woff","8b9635e9b84364f26785ecd0cd4a2ace"],["fonts/caef1298-748a-48f2-9338-27f3bddcee89.woff","fa2e3f7dbd0cf96166a02d7d870beaa5"],["fonts/ce849112-fea8-4723-ae38-3a0f2ce6eaa8.woff","b02b43b429a0cbcc1a1d8c6400583297"],["fonts/d0256a34-2988-45d7-8093-104216fc319d.woff","ae709b5e0a49f03d635ddbcf80658d4a"],["fonts/d5e38cca-491f-4b1e-9877-876743c50258.woff","13303a213510cb65b7b9a0d113021449"],["fonts/dc599214-8fb0-45bc-857b-774c98893c2e.woff","65ad61e059d44a3e45da1cfa5d961b44"],["fonts/fdb8d9a1-706a-43f1-9b12-5e87cea644a3.woff","45fb91a48cbe7937c2dfebfdbfbb5ee1"],["images/hamburger.svg","d2cb0dda3e8313b990e8dcf5e25d2d0f"],["images/icons/icons-hinted.ttf","d41d8cd98f00b204e9800998ecf8427e"],["images/icons/icons.eot","742c4affdabd597249ab4d8f32ceb5d9"],["images/icons/icons.svg","46661d6d65debc63884004fed6e37e5c"],["images/icons/icons.ttf","43ac9104d6fac184272ba3784167577d"],["images/icons/icons.woff","e470c7159d62bbeedf51a7d98e65ca4d"],["images/icons/icons.woff2","1a75a1500dc4614b85523f4183cdeef7"],["images/icons/placeholder--medium.png","baa033665c8a070a9e5a66c2bd8b0474"],["images/icons/placeholder--small.png","d5efa06871740522ebb8ae5da95b7737"],["images/icons/placeholder--wide.png","0f9f6ff52eac6a13ab562341c6e329d1"],["images/touch/apple-touch-icon.png","7326f54bfe6776293f08b34c3a5fde7b"],["images/touch/chrome-touch-icon-192x192.png","571f134f59f14a6d298ddd66c015b293"],["images/touch/icon-128x128.png","7c46d686765c49b813ac5eb34fabf712"],["images/touch/ms-touch-icon-144x144-precomposed.png","452d90b250d6f41a0c8f9db729113ffd"],["index.html","0d2aeee3db3c9a5d2fd31f52cc8f0981"],["manifest.json","d83aafba187e449abd4960bcc45b2fe6"],["resume.html","1151e680776d646eb259564cc4b5925c"],["scripts/main.min.js","89b9261d9a2253af1359a2d38b97febe"],["styles/common.css","86974a8c76e6b8953ab90198086b001f"],["styles/fonts-async.css","0a03a9a34814778e727de9f50a4aa871"],["styles/main.css","f4939bd52fcd62dfdbbd999d656fcb07"],["styles/resume.css","5f8c062e5e5c346ab2793d114667b70c"],["styles/smart-underline.css","291b0cb84a8cf54c4f83a3177409c80c"],["vendor/font-awesome/css/font-awesome.css","dd61067e91386ff67fc7ab51cb1cad0d"],["vendor/font-awesome/css/font-awesome.min.css","08fcd272486d3268b2ec8c283f4f5fd5"],["vendor/font-awesome/scss/font-awesome.css","56031361f6c008fa7af175b4a83365d0"],["vendor/polymer/polymer-micro.html","5e47529a45bea67ba9b2fbaf9eb2562f"],["vendor/polymer/polymer-mini.html","3fd13aa5632cd35b62e35fd90619354d"],["vendor/polymer/polymer.html","ef1322171fdbd45fe4607fb8e34d029d"],["vendor/social-media-icons/demo.html","44fd6e969b4007c81345c6b2125ae2cc"],["vendor/social-media-icons/index.html","1e9b9502569786ab290cf39e70ea660a"],["vendor/social-media-icons/social-media-icons.html","b7c56be66beb4ca003b744c96b574ff9"],["vendor/system.js/dist/system-csp-production.js","64eaf02106b394da3c990c0121d8776c"],["vendor/system.js/dist/system-csp-production.src.js","5c9e0fb26eb4339fd449fda4821b7d02"],["vendor/system.js/dist/system-polyfills.js","fc606a7eb0e596a2a20da402ef1a9d08"],["vendor/system.js/dist/system-polyfills.src.js","c2b368ff7c083d137adcda42c3cdbbdf"],["vendor/system.js/dist/system-register-only.js","120673a1d347166204dc3fb7297ca083"],["vendor/system.js/dist/system-register-only.src.js","e52295f4c2e3fc53eb0283ac9cc13a8c"],["vendor/system.js/dist/system.js","373b6dd7443d63e1dd6ee7b867de6ef7"],["vendor/system.js/dist/system.src.js","69ebcb8602e52e89e966647e0560a1eb"],["vendor/webcomponentsjs/CustomElements.js","61b8050f16f609c92b1444ccaa6a6c6f"],["vendor/webcomponentsjs/CustomElements.min.js","61b8050f16f609c92b1444ccaa6a6c6f"],["vendor/webcomponentsjs/HTMLImports.js","c99ae7ccf843dfd8f4c533367fdfdcc8"],["vendor/webcomponentsjs/HTMLImports.min.js","f4669b27379a4629269d7d0801291f05"],["vendor/webcomponentsjs/MutationObserver.js","7a624715a4e8ca9d35aaf66a5225c8b8"],["vendor/webcomponentsjs/MutationObserver.min.js","7a624715a4e8ca9d35aaf66a5225c8b8"],["vendor/webcomponentsjs/ShadowDOM.js","6958fee7007b5ea22255524b2f8a1ef4"],["vendor/webcomponentsjs/ShadowDOM.min.js","6d163428d2a856aae65ec7e3398d8cd4"],["vendor/webcomponentsjs/webcomponents-lite.js","965294997c7c8e8abf2e9ccbd4dc3472"],["vendor/webcomponentsjs/webcomponents-lite.min.js","1c0863c2beb90f38dce8888b989d88a9"],["vendor/webcomponentsjs/webcomponents.js","413d38cf8d343a5c7a65cab592ca635c"],["vendor/webcomponentsjs/webcomponents.min.js","245e32a3baf0a7087ff67d4e9aa93f52"]];
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

