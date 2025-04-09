'use strict';

function addToSessionStorage() {
    // テキストボックスの値を取得 
    var name = document.querySelector('.playerName').value;
    socket.emit('name', name);
    
    if(name === '')
    {
        alert('学生の名前を入力してください。');
        return false;
    }
    
    // セッションストレージにデータを追加
    sessionStorage.setItem('name', name);
    return true;
}

function showVerticalTabs() {
    var popupOverlay = document.getElementById("popup-overlay");
    popupOverlay.style.display = "flex";
}

function closePopup() {
    var popupOverlay = document.getElementById("popup-overlay");
    popupOverlay.style.display = "none";
}