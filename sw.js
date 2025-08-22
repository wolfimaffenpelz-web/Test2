const CACHE = "wfrp-v2";
const CORE = [
  "/", "/index.html", "/manifest.json",
  "/icon-192.png", "/icon-512.png",
  "/src/main.jsx", "/src/App.jsx", "/src/WFRPCharakterbogen.jsx",
  "/src/components/Section.jsx", "/src/components/Tabs.jsx", "/src/utils.js"
];
self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener("activate", e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE&&caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e=>{
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});
