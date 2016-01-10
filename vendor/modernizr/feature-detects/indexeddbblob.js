/*!
{
  "name": "IndexedDB Blob",
  "property": "indexeddbblob"
}
!*/
define(["Modernizr","addTest","prefixed","test/indexeddb"],function(e,t,d){e.addAsyncTest(function(){var n,o,r=d("indexedDB",window),s="detect-blob-support",a=!1;if(!e.indexeddb||!e.indexeddb.deleteDatabase)return!1;try{r.deleteDatabase(s).onsuccess=function(){n=r.open(s,1),n.onupgradeneeded=function(){n.result.createObjectStore("store")},n.onsuccess=function(){o=n.result;try{o.transaction("store","readwrite").objectStore("store").put(new Blob,"key"),a=!0}catch(e){a=!1}finally{t("indexeddbblob",a),o.close(),r.deleteDatabase(s)}}}}catch(c){t("indexeddbblob",!1)}})});