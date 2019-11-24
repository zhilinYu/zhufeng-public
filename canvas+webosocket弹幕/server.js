let WebSocket = require('ws');
// redis的客户端
let redis = require('redis');
let client = redis.createClient();// key value
let wss = new WebSocket.Server({ port: 3000 });
// 原生的websocket就两个常用的方法 on('message') send()
let clientsArr = [];
wss.on('connection', function (ws) {
  clientsArr.push(ws);
  client.lrange('barrages',0,-1,function (err,applies) {
    applies = applies.map(item => JSON.parse(item));
    ws.send(JSON.stringify({
      type:'INIT',
      data: applies
    }));
  })
  ws.on('message', function (data) {
    // "{value,time,color,speed}"
    client.rpush('barrages', data, redis.print);
    clientsArr.forEach(w=>{
      w.send(JSON.stringify({ type: 'ADD', data: JSON.parse(data) }));
    })
  });
  ws.on('close',function () {
    clientsArr = clientsArr.filter(client=>client!=ws);
  })
})