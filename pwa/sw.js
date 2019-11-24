// 需要缓存文件 静态文件 接口
const CACHE_NAME = 'CACHE_VERSION' + 1;
const CACHE_LIST = [
    '/index.html',
    'index.css',
    'index.js',
    '/api/list',
    '/'
]
// 需要劫持我们的所有请求
async function fetchAndUpdate(request) {
    let res = await fetch(request); // 响应流
    // 需要拿这个响应结果 更新缓存
    let resClone = res.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(request, res));
    return resClone
}
self.addEventListener('fetch', (e) => {
    // e 就是当前请求的事件
    console.log(e.request.url);

    // 拦截用户的请求
    // 先去取 如果取不到后 在拿缓存返还给你

    // 请求策略 我们希望先获取数据 数据获取到了 更新缓存

    if (e.request.url.includes('/api/list')) {
        // 需要更新缓存
        e.respondWith(
            fetchAndUpdate(e.request).catch(err => {
                // 把匹配的缓存的内容返还给你
                return caches.match(e.request);
            })
        );
        return;
    }


    e.respondWith(
        fetch(e.request).catch(err => {
            // 把匹配的缓存的内容返还给你
            return caches.match(e.request);
        })
    )
});

// 默认注册了serviceWorker 需要 跳过等待 否则就不会被激活
// 只有第二次访问才生效，第一次不会立马控制当前页面
// service Worker 的声明周期
// pwa 可以做webapp 桌面应用
// 在安卓上 隔五分钟访问同一个网站 可以自动弹出 安装框

// 两个生命周期 install activate

async function preCache() { // serviceWorker 可以自己定义缓存列表
    // cacheApi promise
    let cache = await caches.open(CACHE_NAME);
    return cache.addAll(CACHE_LIST); // 添加缓存
}
self.addEventListener('install', e => {
    // 安装后 直接替换掉老的serviceWorker 就可以了
    e.waitUntil(
        preCache().then(self.skipWaiting) // 跳过等待立马让当前的serviceWorker 变成激活态
    )
});

// 需要把没用的缓存删除掉
// 清除没用的缓存
async function clearCache() {
    // 需要拿到所有的缓存
    let keys = await caches.keys();
    return Promise.all(keys.filter(key => {
        if (key !== CACHE_NAME) { // 不是当前需要的都删除掉
            return caches.delete(key); // 删除缓存 
        }
    }));
}
self.addEventListener('activate', e => {
    e.waitUntil(
        Promise.all([
            clearCache(),
            self.clients.claim() // 立马让当前页面获得当前serviceWorker 获得控制权
        ])
    )
});


// serviceWorker 会监听文件的变化 ，文件变化后重新注册serviceWorker

// 推送消息 Notifaction