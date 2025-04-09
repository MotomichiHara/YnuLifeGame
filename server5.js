const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//変数
var nameCount = 0;
var turnCount = false;
var keyName=' ';
var players = new Array(2);
var rest=0;

//app.getだけではHTMLが読み込まれるだけなので
//これを用いてcss,pngのリンクにも接続できるようにする
app.use(express.static('images'));
app.use(express.static('rogin'));
app.use(express.static('matching'));
app.use(express.static('waiting'));
app.use(express.static('setting'));
app.use(express.static('game'));
app.use(express.static('result'));
app.use(express.static('data'));
app.use(express.static('explanation'));
app.use(express.static('result'));

//localhost上でget以降のリンクが要求された場合に指定のHTMLを表示する
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/rogin/index.html');
  });
app.get('/matching.html', (req, res) => {
    res.sendFile(__dirname + '/matching/matching.html');
})
app.get('/waiting.html', (req, res) => {
    res.sendFile(__dirname + '/waiting/waiting.html');
})
app.get('/setting.html', (req, res) => {
    res.sendFile(__dirname + '/setting/setting.html');
})
app.get('/game.html', (req, res) => {
    res.sendFile(__dirname + '/game/game.html');
})
app.get('/result.html', (req, res) => {
    res.sendFile(__dirname + '/result/result.html');
})

//クライアントからサーバに接続が行われた場合に発動。接続している間は
//互いに送信・受信を行う関数を指定できる
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('conclusion',(exp) => {
    socket.broadcast.emit('exp',exp);
  });

  //ゲーム時(各自ターンの交代)
  socket.on('turn',(msg) =>{
    console.log(msg);
    if(!turnCount){
        console.log(turnCount);
        //turnCount = true;
    }else{
        console.log(turnCount);
        socket.broadcast.emit('turnChange','あなたの順番です');
        //turnCount = false;
    }
    turnCount =true;
  })

  //ウェイティング時(名前の保存・1人目に2人目の名前を送信)
  socket.on('waiting',(player) => {
    players[nameCount]=player;
    if(nameCount === 0){
            
    }else{
        socket.broadcast.emit('player',players[1]);
    }
    nameCount++;
  });
  //マッチング時(キーの保存と入力したキーの仕分け)
  socket.on('key', (key) => {
    if(keyName === ' '){
        keyName = key;
        console.log('key'+':'+ key);
        socket.emit('keyCheck',1);
    }else if(keyName === key){
        socket.emit('keyCheck',1);
    }else{
        socket.emit('keyCheck',0);
    }
  });

  //マッチング時(1人目/2人目/3人目以降の区別)
  socket.on('restriction',(msg) => {
    console.log(msg+(rest+1)+'人目');
    if(rest === 0){
        socket.emit('restCheck',1);
        rest++;
    }else if(rest === 1){
        socket.emit('restCheck',2);
        rest++
    }else{
        socket.emit('restCheck',0);
    }
  });

  //マッチング時(2人目のプレイヤーに1人目の名前を渡す)
  socket.on('player',(msg) => {
    console.log(msg);
    socket.emit('player',players[0]);
  });

  //ログイン時(名前の表示・3人目以降が入ってもエラーにはならない)
  socket.on('name', (name) => {
    console.log('name:'+ name);
  });

  //接続切れ時(ページ変わるごとに切れちゃう)
  socket.on('disconnect', (socket) => {
    console.log('user disconnected');
  });

});

//サーバの設立
server.listen(3000, () => {
  console.log('listening on *:3000');
});