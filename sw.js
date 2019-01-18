importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute([
  {
    "url": "src/images/main-image-lg.jpg",
    "revision": "31b19bffae4ea13ca0f2178ddb639403"
  },
  {
    "url": "src/images/main-image-sm.jpg",
    "revision": "c6bb733c2f39c60e3c139f814d2d14bb"
  },
  {
    "url": "src/images/main-image.jpg",
    "revision": "5c66d091b0dc200e8e89e56c589821fb"
  },
  {
    "url": "src/images/sf-boat.jpg",
    "revision": "0f282d64b0fb306daf12050e812d6a19"
  },
  {
    "url": "src/css/app.css",
    "revision": "3242fd6e304c50ec2902400ecad69399"
  },
  {
    "url": "src/css/feed.css",
    "revision": "fdd163695d0282f769d9f16ca27a9e7d"
  },
  {
    "url": "src/css/help.css",
    "revision": "81922f16d60bd845fd801a889e6acbd7"
  },
  {
    "url": "src/js/app.js",
    "revision": "67decefeaef610f351c3a03ec717d326"
  },
  {
    "url": "src/js/feed.js",
    "revision": "af6e3d9b46e7950d903161ef2b46517b"
  },
  {
    "url": "src/js/idb.js",
    "revision": "edfbee0bb03a5947b5a680c980ecdc9f"
  },
  {
    "url": "src/js/idbHelper.js",
    "revision": "6d2996249f5ae5b499ffb0df64395215"
  },
  {
    "url": "src/js/material.min.js",
    "revision": "e68511951f1285c5cbf4aa510e8a2faf"
  },
  {
    "url": "src/js/requestHelper.js",
    "revision": "32b14653aebb0020987206580370621a"
  }
], {});