/*!
{
  "name": "IndexedDB",
  "property": "indexeddb",
  "caniuse": "indexeddb",
  "tags": ["storage"],
  "polyfills": ["indexeddb"]
}
!*/
define(["Modernizr","prefixed"],function(e,d){var a=d("indexedDB",window);e.addTest("indexeddb",!!a),a&&e.addTest("indexeddb.deletedatabase","deleteDatabase"in a)});