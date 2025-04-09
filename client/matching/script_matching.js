'use strict';
var socket = io();

function addToSessionStorage() {
    // テキストボックスの値を取得
    var key = document.querySelector('.key').value;
    //テキストボックスに何も打ち込まなかった場合
    if(key === ''){
        alert('合言葉を入力してください。');
    }
    //テキストボックスに文字を打ち込んだ場合
    if(key !== ''){
        socket.emit('key', key);  //文字をサーバへ
        socket.once('keyCheck',(keyCheck) =>{ //ホストのパスと違うと0が返る
            console.log(keyCheck);
            if(keyCheck === 0){
                alert('既に部屋が作られています。');
            }else{   
                //ホストがいない、パスが一緒だと1が返る
                socket.emit('restriction','マッチング希望');
                socket.on('restCheck',(restCheck) =>{
                //ホストがまだいない場合
                    if(restCheck === 1) {
                    // セッションストレージにデータを追加
                        sessionStorage.setItem('key', key);//パス
                        sessionStorage.setItem('opponent', '-');//相手の名前
                        sessionStorage.setItem('host',1);//ホスト
                        location.href = 'waiting.html';//次のページへ
                    }else if(restCheck === 2){  //既に1人入っているとき
                        socket.emit('player','相手を知りたいです');
                        socket.on('player',(opponent) =>{
                            sessionStorage.setItem('key', key);
                            sessionStorage.setItem('opponent',opponent);
                            sessionStorage.setItem('host',0);//非ホスト
                            location.href = 'waiting.html'
                        });
                    }else{   //既に2人入っているとき
                        alert('部屋の上限人数を超えています。ゲーム終了までお待ち下さい。');
                    }
                });
            }
        });
    }
}

function showVerticalTabs() {
    var popupOverlay = document.getElementById("popup-overlay");
    popupOverlay.style.display = "flex";
}

function closePopup() {
    var popupOverlay = document.getElementById("popup-overlay");
    popupOverlay.style.display = "none";
}