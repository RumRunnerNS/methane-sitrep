const V='v9',C='methane-'+V,A=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./epso-emblem.webp','./epso-emblem.png','./ehs-logo.webp','./ehs-logo.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A.map(u=>new Request(u,{cache:'reload'})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='version')e.source&&e.source.postMessage({version:V})});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
const nav=r.mode==='navigate'||/\/(index\.html)?$/.test(new URL(r.url).pathname);
if(nav){e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html').then(x=>x||caches.match('./'))));return}
e.respondWith(caches.match(r,{ignoreSearch:true}).then(x=>x||fetch(r)))});
