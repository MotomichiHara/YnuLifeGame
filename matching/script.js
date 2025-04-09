'use script';

function addToSessionStorage() {
    // テキストボックスの値を取得
    var key = document.querySelector('.key').value;
    
    if(key === '')
    {
        alert('合言葉を入力してください。');
        return false;
    }

    // セッションストレージにデータを追加
    sessionStorage.setItem('key', key);
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