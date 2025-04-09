'use script';
var socket = io();

function addToSessionStorage() {
    // 選択されたラジオボタンの値を取得
    var major = document.querySelector('input[name="major"]:checked').value;
    var lifestyle = document.querySelector('input[name="lifestyle"]:checked').value;
    var icon = document.querySelector('input[name="icon"]:checked').value;
    //socket.emit('event', major );
    //console.log(major,lifestyle,icon);
    var id = "";
    const date = new Date();
    const year = date.getFullYear();
    var num = String(year).substring(2, 4);
    id += num;
    switch(major){
        case "0":
            id += "2";
            break;
        case "1":
            id += "3";
            break;
        case "2":
            id += "7";
            break;
        case "3":
            id += "6";
            break;
        case "4":
            id += "8";
            break;
    }
    id += "0001";

    // jsonファイルを参照するもの
    var money;
    var sociability;
    var energy;
    var specialty;

    fetch('status.json')
    .then(response => {
        if (!response.ok) {
        throw new Error('ファイルの取得に失敗しました');
        }
        return response.json();
    })
    .then(jsonData => {
        money = jsonData.major[parseInt(major)].money;
        sociability = jsonData.major[parseInt(major)].sociability;
        energy = jsonData.major[parseInt(major)].energy;
        specialty = jsonData.major[parseInt(major)].specialty;
        sessionStorage.setItem('money', money);
        sessionStorage.setItem('sociability', sociability);
        sessionStorage.setItem('energy', energy);
        sessionStorage.setItem('specialty', specialty);
    })
    .catch(error => {
        console.error('エラー:', error);
    });
            
    // セッションストレージにデータを追加
    const circle = [0];
    const ptjob = [0];
    sessionStorage.setItem('major', major);
    sessionStorage.setItem('lifestyle', lifestyle);
    sessionStorage.setItem('icon', icon);
    sessionStorage.setItem('circle', JSON.stringify(circle));
    sessionStorage.setItem('ptjob', JSON.stringify(ptjob));
    sessionStorage.setItem('course', null);
    sessionStorage.setItem('exp', 0);
    sessionStorage.setItem('studentID', id);
    sessionStorage.setItem('credit', 0);
    sessionStorage.setItem('excredit', 0);
    sessionStorage.setItem('nowcredit', 0);
    sessionStorage.setItem('maxcredit', 24);
    sessionStorage.setItem('map', 1);
    sessionStorage.setItem('grid', 0);
    sessionStorage.setItem('exmap', 0);
    sessionStorage.setItem('exgrid', 0);
    sessionStorage.setItem('turn', null);
    sessionStorage.setItem('myturn', false);
    sessionStorage.setItem('internship', 0);
    sessionStorage.setItem('break', 0);
}

function showVerticalTabs() {
    var popupOverlay = document.getElementById("popup-overlay");
    popupOverlay.style.display = "flex";
  }
  
  function closePopup() {
    var popupOverlay = document.getElementById("popup-overlay");
    popupOverlay.style.display = "none";
  }