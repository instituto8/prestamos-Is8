const C='isft8-v4';
const ARCHIVOS=['./','index.html','config.js','manifest.webmanifest','icon-192.png','icon-512.png'];
// Cada archivo se guarda por separado: si uno falla, el service worker se instala igual.
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(ARCHIVOS.map(a=>c.add(a).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request)))});
