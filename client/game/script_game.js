'use strict';
const socket = io();
function showVerticalTabs() {
  var popupOverlay = document.getElementById("popup-overlay");
  popupOverlay.style.display = "flex";
}

function closePopup() {
  var popupOverlay = document.getElementById("popup-overlay");
  popupOverlay.style.display = "none";
}

function displaySessionData() {
  // jsonファイルを参照しないもの
  document.getElementById('name').textContent = sessionStorage.getItem('name');
  document.getElementById('money').textContent = sessionStorage.getItem('money');
  document.getElementById('energy').textContent = sessionStorage.getItem('energy');
  document.getElementById('sociability').textContent = sessionStorage.getItem('sociability');
  document.getElementById('specialty').textContent = sessionStorage.getItem('specialty');
  document.getElementById('exp').textContent = sessionStorage.getItem('exp');
  document.getElementById('studentID').textContent = sessionStorage.getItem('studentID');
  document.getElementById('credit').textContent = sessionStorage.getItem('credit');
  document.getElementById('icon').src = "icon" + sessionStorage.getItem('icon') + ".png";

  // jsonファイルを参照するもの
  fetch('status.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('ファイルの取得に失敗しました');
    }
    return response.json();
  })
  .then(jsonData => {
    document.getElementById('major').textContent = jsonData.major[sessionStorage.getItem('major')].name;
  })
  .catch(error => {
    console.error('エラー:', error);
  });
  fetch('circle.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('ファイルの取得に失敗しました');
    }
    return response.json();
  })
  .then(jsonData => {
    const circlenum = JSON.parse(sessionStorage.getItem('circle'));
    let circle = "";
    for(let i = 0; i < circlenum.length; i++)
    {
      circle = jsonData.circle[parseInt(circlenum[i])].circle;
      document.getElementById('circle-' + i.toString()).textContent = circle;
    }
    for(let i = circlenum.length; i < 3; i++)
    {
      document.getElementById('circle-' + i.toString()).textContent = '';
    }
  })
  .catch(error => {
    console.error('エラー:', error);
  });
  fetch('ptjob.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('ファイルの取得に失敗しました');
    }
    return response.json();
  })
  .then(jsonData => {
    const ptjobnum = JSON.parse(sessionStorage.getItem('ptjob'));
    let ptjob = "";
    for(let i = 0; i < ptjobnum.length; i++)
    {
      ptjob = jsonData.ptjob[parseInt(ptjobnum[i])].ptjob;
      document.getElementById('ptjob-' + i.toString()).textContent = ptjob;
    }
    for(let i = ptjobnum.length; i < 3; i++)
    {
      document.getElementById('ptjob-' + i.toString()).textContent = '';
    }
  })
  .catch(error => {
    console.error('エラー:', error);
  });
}

// jsonファイルを同期して参照
async function fetchMultipleJsonFiles(urls) {
  try {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const jsonResponses = await Promise.all(responses.map(response => response.json()));
    return jsonResponses;
  } catch (error) {
    console.error('Error fetching JSON files:', error);
    throw error;
  }
}

// --- マップボタン ---
// 現在表示されているページのボタンにactiveクラスを追加する関数
function setActiveButton(index) {
  var buttons = document.getElementsByClassName('btn');
  for (var i = 0; i < buttons.length; i++) {
    if (i === index) {
      buttons[i].classList.add('active');
    } else {
      buttons[i].classList.remove('active');
    }
  }
}

// ボタンがクリックされたときにactiveクラスを設定するイベントリスナーを追加
var buttons = document.getElementsByClassName('btn');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    setActiveButton(Array.prototype.indexOf.call(buttons, this));
  });
}

// ページが読み込まれたときに初期のアクティブなボタンを設定
window.onload = function() {
  setActiveButton(0); // 0番目のボタンをアクティブにする
}

// マップ表示変更
// 初期表示ではcontent1を表示する
document.getElementById('map1').style.display = "grid";

// 1年
document.getElementById("btn1").addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector('.main').style.backgroundImage = 'url("background1.png")';
  document.getElementById('map1').style.display = "grid";
  document.getElementById('map2').style.display = "none";
  document.getElementById('map3').style.display = "none";
  document.getElementById('map4').style.display = "none";
  document.getElementById('map5').style.display = "none";
});
function toMap1() {
  return new Promise(function(resolve) {
    document.querySelector('.main').style.backgroundImage = 'url("background1.png")';
    document.getElementById('map1').style.display = "grid";
    document.getElementById('map2').style.display = "none";
    document.getElementById('map3').style.display = "none";
    document.getElementById('map4').style.display = "none";
    document.getElementById('map5').style.display = "none";
    resolve();
  })
}

// 2年
document.getElementById("btn2").addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector('.main').style.backgroundImage = 'url("background2.png")';
  document.getElementById('map1').style.display = "none";
  document.getElementById('map2').style.display = "grid";
  document.getElementById('map3').style.display = "none";
  document.getElementById('map4').style.display = "none";
  document.getElementById('map5').style.display = "none";
});
function toMap2() {
  return new Promise(function(resolve) {
    document.querySelector('.main').style.backgroundImage = 'url("background2.png")';
    document.getElementById('map1').style.display = "none";
    document.getElementById('map2').style.display = "grid";
    document.getElementById('map3').style.display = "none";
    document.getElementById('map4').style.display = "none";
    document.getElementById('map5').style.display = "none";
    resolve();
  })
}

// 3年
document.getElementById("btn3").addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector('.main').style.backgroundImage = 'url("background3.png")';
  document.getElementById('map1').style.display = "none";
  document.getElementById('map2').style.display = "none";
  document.getElementById('map3').style.display = "grid";
  document.getElementById('map4').style.display = "none";
  document.getElementById('map5').style.display = "none";
});
function toMap3() {
  return new Promise(function(resolve) {
    document.querySelector('.main').style.backgroundImage = 'url("background3.png")';
    document.getElementById('map1').style.display = "none";
    document.getElementById('map2').style.display = "none";
    document.getElementById('map3').style.display = "grid";
    document.getElementById('map4').style.display = "none";
    document.getElementById('map5').style.display = "none";
    resolve();
  })
}

// 4年
document.getElementById("btn4").addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector('.main').style.backgroundImage = 'url("background4.png")';
  document.getElementById('map1').style.display = "none";
  document.getElementById('map2').style.display = "none";
  document.getElementById('map3').style.display = "none";
  document.getElementById('map4').style.display = "grid";
  document.getElementById('map5').style.display = "none";
});
function toMap4() {
  return new Promise(function(resolve) {
    document.querySelector('.main').style.backgroundImage = 'url("background4.png")';
    document.getElementById('map1').style.display = "none";
    document.getElementById('map2').style.display = "none";
    document.getElementById('map3').style.display = "none";
    document.getElementById('map4').style.display = "grid";
    document.getElementById('map5').style.display = "none";
    resolve();
  })
}

// 留学MAP
document.getElementById("btn5").addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector('.main').style.backgroundImage = 'url("background5.png")';
  document.getElementById('map1').style.display = "none";
  document.getElementById('map2').style.display = "none";
  document.getElementById('map3').style.display = "none";
  document.getElementById('map4').style.display = "none";
  document.getElementById('map5').style.display = "grid";
});
function toMap5() {
  return new Promise(function(resolve) {
    document.querySelector('.main').style.backgroundImage = 'url("background5.png")';
    document.getElementById('map1').style.display = "none";
    document.getElementById('map2').style.display = "none";
    document.getElementById('map3').style.display = "none";
    document.getElementById('map4').style.display = "none";
    document.getElementById('map5').style.display = "grid";
    resolve();
  })
}

// ステータス変化の文字列生成
async function makeStatusmsg(money, sociability, energy, specialty, exp) {
  return new Promise(function(resolve) {
    var msg = "";
    if(money > 0)
    {
      msg += "所持金+" + money;
    }
    else if(money < 0)
    {
      msg += "所持金" + money;
    }
    if(sociability > 0)
    {
      msg += "　社交性+" + sociability;
    }
    else if(sociability < 0)
    {
      msg += "　社交性" + sociability;
    }
    if(energy > 0)
    {
      msg += "　行動力+" + energy;
    }
    else if(energy < 0)
    {
      msg += "　行動力" + energy;
    }
    if(specialty > 0)
    {
      msg += "　専門性+" + specialty;
    }
    else if(specialty < 0)
    {
      msg += "　専門性" + specialty;
    }
    if(exp > 0)
    {
      msg += "　経験値+" + exp;
    }
    else if(exp < 0)
    {
      msg += "　経験値" + exp;
    }

    resolve(msg);
  })
}

// ステータス変化をセッションストレージに格納
async function setSessionStorage(money, sociability, energy, specialty, exp) {
  return new Promise(function(resolve) {
    // セッションストレージに格納
    sessionStorage.setItem('money', parseInt(sessionStorage.getItem('money')) + money);
    if((parseInt(sessionStorage.getItem('sociability')) + sociability) < 0)
    {
      sessionStorage.setItem('sociability', 0);
    }
    else
    {
      sessionStorage.setItem('sociability', parseInt(sessionStorage.getItem('sociability')) + sociability);
    }
    if((parseInt(sessionStorage.getItem('energy')) + energy) > 200)
    {
      sessionStorage.setItem('energy', 200);
    }
    else
    {
      sessionStorage.setItem('energy', parseInt(sessionStorage.getItem('energy')) + energy);
    }
    sessionStorage.setItem('specialty', parseInt(sessionStorage.getItem('specialty')) + specialty);
    sessionStorage.setItem('exp', parseInt(sessionStorage.getItem('exp')) + exp);

    resolve();
  })
}

// スタートメッセージ
async function startmsg() {
  return new Promise(function(resolve) {
    // HTML要素を作成
    var overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    document.body.appendChild(overlay);

    var message = document.createElement("div");
    message.textContent = "横国人生ゲームスタート！";
    message.classList.add("startmsg");
    document.body.appendChild(message);

    // メッセージを削除
    setTimeout(function() {
      document.body.removeChild(overlay);
      document.body.removeChild(message);
      resolve();
    }, 2000);
  })
}

// 毎ターンのステータス変化
async function statuschange() {
  return new Promise(function(resolve) {
    var money = 0;
    var sociability = 0;
    var energy = 0;
    var specialty = 0;
    var exp = 0;
  
    const jsonUrls = ['status.json', 'circle.json', 'ptjob.json'];
    fetchMultipleJsonFiles(jsonUrls)
    .then(async jsonResponses => {
      const statusjson = jsonResponses[0];
      const circlejson = jsonResponses[1];
      const ptjobjson = jsonResponses[2];
  
      const major = parseInt(sessionStorage.getItem('major'));
      const lifestyle = parseInt(sessionStorage.getItem('lifestyle'));
      var circlenum = JSON.parse(sessionStorage.getItem('circle'));
      var ptjobnum = JSON.parse(sessionStorage.getItem('ptjob'));
  
      money += statusjson.lifestyle[lifestyle].money;
      specialty += statusjson.major[major].getSpec;
      energy += statusjson.energy_recovery + statusjson.lifestyle[lifestyle].energy;
      exp += statusjson.lifestyle[lifestyle].exp;

      // サークルまたはバイトに所属しているかの確認
      function hasNonZeroElement(arr) {
        return arr.some(item => item !== 0);
      }
      if(hasNonZeroElement(circlenum) || hasNonZeroElement(ptjobnum)) {
        // サークルまたはバイトをしている場合
        // サークルバイトリストの作成
        var list = [];
        for(let i = 0; i < circlenum.length; i++)
        {
          if(circlenum[i] !== 0)
          {
            list.push(['circle', circlejson.circle[circlenum[i]].circle, circlenum[i]]);
          }
        }
        for(let i = 0; i < ptjobnum.length; i++)
        {
          if(ptjobnum[i] !== 0)
          {
            list.push(['ptjob', ptjobjson.ptjob[ptjobnum[i]].ptjob, ptjobnum[i]]);
          }
        }
        // 画面表示
        // ボタンを表示
        var div = document.createElement("div");
        div.id = "container1";
        div.style.position = "fixed";
        div.style.left = "50%";
        div.style.transform = "translateX(-50%)";
        div.style.bottom = "20%";
        var msg = document.createElement('p');
        msg.textContent = "今ターンの行動"
        msg.id = "turnmsg";
        div.appendChild(msg);
        // サークル・バイトの数だけ追加
        var div2 = [];
        for(let i = 0; i < list.length; i++)
        {
          div2[i] = document.createElement('div');
          div2[i].classList.add('container2');

          var name = document.createElement('p');
          name.textContent = list[i][1];
          div2[i].appendChild(name);

          var radio1 = document.createElement('input');
          radio1.type = 'radio';
          radio1.name = i.toString();
          radio1.value = 0;
          radio1.checked = true;
          var label1 = document.createElement('label');
          label1.textContent = '続ける';
          var radio2 = document.createElement('input');
          radio2.type = 'radio';
          radio2.name = i.toString();
          radio2.value = 1;
          var label2 = document.createElement('label');
          label2.textContent = '休む';
          var radio3 = document.createElement('input');
          radio3.type = 'radio';
          radio3.name = i.toString();
          radio3.value = 2;
          var label3 = document.createElement('label');
          label3.textContent = 'やめる';
          div2[i].appendChild(radio1);
          div2[i].appendChild(label1);
          div2[i].appendChild(radio2);
          div2[i].appendChild(label2);
          div2[i].appendChild(radio3);
          div2[i].appendChild(label3);

          div.appendChild(div2[i]);
        }
        var OkButton = document.createElement("button");
        OkButton.id = "OkButton";
        OkButton.textContent = "決定";
        div.appendChild(OkButton);
        document.body.appendChild(div);

        async function waitForButton7() {
          return new Promise(function(resolve) {
            OkButton.addEventListener("click", function() {
              resolve();
            });
          });
        }

        async function select7() {
          await waitForButton7();
          div.style.display = 'none'; // 非表示

          // ラジオボタンの値取得
          for(let i = 0; i < list.length; i++)
          {
            const radio = document.getElementsByName(i.toString());
            for(const radiobtn of radio)
            {
              if(radiobtn.checked)
              {
                list[i].push(radiobtn.value);
              }
            }
          }

          console.log(list);

          // listに応じてステ変化
          for(let i = 0; i < list.length; i++)
          {
            if(list[i][0] === 'circle' && list[i][3] === '0')
            {
              money += circlejson.circle[list[i][2]].money;
              sociability += circlejson.circle[list[i][2]].sociability;
              energy += circlejson.circle[list[i][2]].energy;
              specialty += circlejson.circle[list[i][2]].specialty;
              exp += circlejson.circle[list[i][2]].exp;
            }
            else if(list[i][0] == 'ptjob' && list[i][3] === '0')
            {
              money += ptjobjson.ptjob[list[i][2]].money;
              sociability += ptjobjson.ptjob[list[i][2]].sociability;
              energy += ptjobjson.ptjob[list[i][2]].energy;
              specialty += ptjobjson.ptjob[list[i][2]].specialty;
              exp += ptjobjson.ptjob[list[i][2]].exp;
            }
          }

          // 休み処理
          var msg1 = "";
          var flg1 = false;
          for(let i = 0; i < list.length; i++)
          {
            if(list[i][3] === '1')
            {
              if(flg1)
              {
                msg1 += "と";
              }
              msg1 += list[i][1];
              flg1 = true;
            }
          }
          msg1 += "を休んだ。";
          if(flg1){
            document.getElementById('msg').innerHTML += "<br>" + msg1 + "<br>";
          }

          // やめる処理
          var msg2 = "";
          var flg2 = false;
          for(let i = 0; i < list.length; i++)
          {
            if(list[i][3] === '2')
            {
              if(flg2)
              {
                msg2 += "と";
              }
              msg2 += list[i][1];
              flg2 = true;
            }
          }
          msg2 += "をやめた。";
          if(flg2){
            document.getElementById('msg').textContent += msg2;
          }
          for(let i = 0; i < list.length; i++)
          {
            if(list[i][3] === '2' && list[i][0] === 'circle') // サークルやめる処理
            {
              circlenum = circlenum.filter(item => item !== parseInt(list[i][2]));
            }
            else if(list[i][3] === '2' && list[i][0] === 'ptjob') // バイト辞める処理
            {
              ptjobnum = ptjobnum.filter(item => item !== parseInt(list[i][2]));
            }
          }
          if(circlenum.length === 0)
          {
            circlenum.push(0);
          }
          if(ptjobnum.length === 0)
          {
            ptjobnum.push(0);
          }
          sessionStorage.setItem('circle', "[" + circlenum + "]");
          sessionStorage.setItem('ptjob', "[" + ptjobnum + "]");

          div.remove();
        }

        await select7();

      }
      // セッションストレージを変更
      await setSessionStorage(money,sociability, energy, specialty, exp);
  
      // ステータス変化を表示
      var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
      

      setTimeout(function() {
        // 表示を変更
        displaySessionData();
      }, 1000);
  
      document.getElementById('statuschange').textContent = msg;
      console.log(msg);
      resolve();
    })
    .catch(error => {
      console.error(error);
    });
  })
}

// サイコロを振る
async function rollDice(randomNum) {
  return new Promise(function(resolve) {
    // HTML要素
    var button = document.createElement('button');
    button.classList.add("dicebtn");
    button.textContent = "サイコロを振る";
    document.body.appendChild(button);

    var image = document.createElement("img");
    image.id = 'dice';
    image.src = 'dice_1.png';
    image.style.position =  "fixed";
    image.style.bottom = "90px";
    image.style.right = "75px";
    image.style.width = "120px";
    image.style.height = "120px";
    document.body.appendChild(image);

    var images;
    if(sessionStorage.getItem('map') === "5") {
      images = new Array("dice_1.png", "dice_2.png", "dice_3.png");

    } 
    else {
      images = new Array("dice_1.png", "dice_2.png", "dice_3.png", "dice_4.png", "dice_5.png", "dice_6.png");

    }
    var num = -1;
    var counter = 0;
    var timer;

    function slideshow_timer() {
      if(counter < 18)
      {
        if(num == images.length - 1)
        {
          num = 0;
        }
        else
        {
          num++;
        }
        document.getElementById('dice').src = images[num];
        counter++;
      }
      else
      {
        clearInterval(timer);
        document.getElementById('dice').src = images[randomNum];
        document.getElementById('msg').textContent = "サイコロの目は" + (randomNum + 1) + "！ " + (randomNum + 1) + "マス進む。";
        setTimeout(function() {
          document.body.removeChild(image);
        }, 1500);
        resolve();
      }
    }

    button.addEventListener('click', function() {
      timer = setInterval(slideshow_timer, 100);
      document.body.removeChild(button);
    });
  })  
}

// サイコロの目に応じて画像を移動
async function moveImage(loc1, loc2) {
  return new Promise(function(resolve) {
    var tmp1 = loc1;
    var tmp2 = loc1 + 1;
    var image = document.getElementById("playicon");

    const interval = setInterval(() => {
      //console.log("." + tmp1.toString() + ", ." + tmp2.toString());
      document.getElementsByClassName(tmp1.toString())[0].removeChild(image);
      document.getElementsByClassName(tmp2.toString())[0].appendChild(image);
      tmp1++;
      tmp2++;

      if(tmp1 == loc2)
      {
        clearInterval(interval);
        resolve();
      }
    }, 500);
  })
}

// イベント条件を確認
async function checkCondition(type, num) {
  return new Promise(function(resolve) {
    fetch('event.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('ファイルの取得に失敗しました');
      }
      return response.json();
    })
    .then(jsonData => {
      console.log(jsonData[type][num].condition);
      if(jsonData[type][num].condition == null)//var type = mapjson.grid[location].type; // イベントタイプ
      {
        resolve(true);
      }   
      else
      {
        var flg = true; // true: 条件クリア
        for(let i = 0; i < jsonData[type][num].condition.length; i++)
        {
          // condition[i][0] : キー, condition[i][1~] : 条件(どれかを満たしていればよい)
          var status = jsonData[type][num].condition[i][0];
          const data = sessionStorage.getItem(status); // statusの数値
          if(status === "sociability")
          {
            // 条件が社交性の場合
            if(data < jsonData[type][num].condition[i][1])
            {
              // 条件を満たしていなければfalseに
              flg = false;
            }
          }
          else if(status === "ptjob")
          {
            // 条件がバイトの場合
            var list = JSON.parse(sessionStorage.getItem('ptjob'));
            if(list.includes(0))
            {
              flg = false;
            }
          }
          else if(status === "circle")
          {
            // 条件がサークルの場合
            var list = JSON.parse(sessionStorage.getItem('circle'));
            if(list.includes(0))
            {
              flg = false;
            }
          }
          else if(status === "major")
          {
             // 条件が学部の場合
             var major = parseInt(sessionStorage.getItem('major'));
             var tmp = false;
             for(let i = 1; i < jsonData[type][num].condition[0].length; i++)
             {
               if(major === jsonData[type][num].condition[0][i])
               {
                 tmp = true;
               }
             }
             if(!tmp)
             {
               flg = false;
             }
           }
           else
           {
            // 条件が上以外の場合
            var tmpflg = false;
            for(let j = 1; j < jsonData[type][num].condition[i].length; j++)
            {
              if(jsonData[type][num].condition[i][j] === data)
              {
                tmpflg = true;
              }
            }
            if(!tmpflg)
            {
              flg = false;
            }
          }
        }
        console.log("event条件:" + flg);
        resolve(flg);
      }
    })
    .catch(error => {
      console.error('エラー:', error);
    });
  })
}

// 進路選択
async function selectCourse(type, eventNum) {
  return new Promise(function(resolve) {
    var money = 0;
    var specialty = 0;
    var sociability = 330;
    var major = 3;
    var circle = 28;
    var exp = 0;
    
    let possible_course = ['フリーター'];

    //選択可能な進路を割り出す
    if(specialty > 150) possible_course.push('大学院進学');
    if(specialty > 100) possible_course.push('教員');
    if(sociability > 240 && exp > 100 && specialty > 30) possible_course.push('公務員');
    if(sociability > 330) possible_course.push('商社');
    if(sociability > 330) possible_course.push('コンサルタント');
    if(sociability > 330) possible_course.push('銀行');
    if(sociability > 330) possible_course.push('保険会社');
    if(specialty > 50) possible_course.push('エンジニア');
    if(specialty > 40) possible_course.push('建設会社');
    if(sociability > 300 && specialty > 40) possible_course.push('出版社');
    if(sociability > 300 && specialty > 60) possible_course.push('ITコンサル');
    if(specialty > 60) possible_course.push('ITエンジニア');
    if(specialty > 50) possible_course.push('自動車メーカー');
    if(sociability > 330 || specialty > 50) possible_course.push('鉄道会社');
    if(sociability > 330 || specialty > 40) possible_course.push('食品メーカー');
    if(sociability > 330 || specialty > 60) possible_course.push('医薬品メーカー');
    if(sociability > 330 || specialty > 50) possible_course.push('化学メーカー');
    if(sociability > 330 || specialty > 40) possible_course.push('不動産会社');
    if(sociability > 330) possible_course.push('広告代理店');
    if(sociability > 330) possible_course.push('テレビ局');
    if(sociability > 330) possible_course.push('保険会社');
    if(sociability > 330 || specialty > 50) possible_course.push('電力会社');
    if(sociability > 330 || specialty > 50) possible_course.push('インフラ会社');
    if(sociability > 250) possible_course.push('教育');
    if(sociability > 250) possible_course.push('福祉');
    if(specialty > 60) possible_course.push('医療');
    if(sociability > 330) possible_course.push('証券会社');
    if(specialty > 50) possible_course.push('機械メーカー');
    if(sociability > 330 || specialty > 50) possible_course.push('ゲーム会社');
    if(sociability > 300) possible_course.push('新聞社');
    if(money > 5000000) possible_course.push('冒険家');

    if(major === (0 || 1)){  //経営＆経済
        if(sociability > 330*0.90){
            if (possible_course.indexOf('商社') == -1){
	            possible_course.push('商社');
	          }
            if (possible_course.indexOf('コンサルタント') == -1){
	            possible_course.push('コンサルタント');
	          }
            if (possible_course.indexOf('銀行') == -1){
	            possible_course.push('銀行');
	          }
            if (possible_course.indexOf('テレビ局') == -1){
	            possible_course.push('テレビ局');
	          }
            if (possible_course.indexOf('証券会社') == -1){
	            possible_course.push('証券会社');
	          }
        }
        if(sociability > 250*0.90){
            if (possible_course.indexOf('保険会社') == -1){
              possible_course.push('保険会社');
            }
            if (possible_course.indexOf('広告代理店') == -1){
              possible_course.push('広告代理店');
            }
        }
    }
    if(major === 2){  //教育
        if (possible_course.indexOf('教員') == -1){
	        possible_course.push('教員');
	      }
        if(sociability > 250*0.8){
            if (possible_course.indexOf('教育') == -1){
	            possible_course.push('教育');
	          }
        }
    }
    if(major === 3){  //理工
        if (possible_course.indexOf('大学院進学') == -1){
	        possible_course.push('大学院進学');
	      }
        if(specialty > 60*0.8){
            if (possible_course.indexOf('ITエンジニア') == -1){
	            possible_course.push('ITエンジニア');
	          }
        }
        if(specialty > 60*0.8){
            if (possible_course.indexOf('エンジニア') == -1){
	            possible_course.push('エンジニア');
	          }
            if (possible_course.indexOf('機械メーカー') == -1){
	            possible_course.push('機械メーカー');
	          }
        }
        if(sociability > 330*0.8 || specialty > 60*0.8){
            if (possible_course.indexOf('ゲーム会社') == -1){
	            possible_course.push('ゲーム会社');
	          }
        }
        if(sociability > 300*0.8 && specialty > 70*0.8){
            if (possible_course.indexOf('ITコンサル') == -1){
	            possible_course.push('ITコンサル');
	          }
        }
        if(specialty > 60*0.8){
            if (possible_course.indexOf('自動車メーカー') == -1){
	            possible_course.push('自動車メーカー');
	          }
        }
        if(sociability > 330*0.8 || specialty > 60*0.8){
            if (possible_course.indexOf('鉄道会社') == -1){
	            possible_course.push('鉄道会社');
	          }
        }
        if(sociability > 330*0.8 || specialty > 50*0.8){
            if (possible_course.indexOf('食品メーカー') == -1){
	            possible_course.push('食品メーカー');
	          }
        }
        if(sociability > 330*0.8 || specialty > 70*0.8){
            if (possible_course.indexOf('医薬品メーカー') == -1){
	            possible_course.push('医薬品メーカー');
	          }
        }
        if(sociability > 330*0.8 || specialty > 60*0.8){
            if (possible_course.indexOf('化学メーカー') == -1){
	            possible_course.push('化学メーカー');
	          }
        }
        if(specialty > 70*0.95){
            if (possible_course.indexOf('医療') == -1){
	            possible_course.push('医療');
	          }
        }
    }
    if(major === 4){  //都市科学
        if (possible_course.indexOf('大学院進学') == -1){
	        possible_course.push('大学院進学');
	      }
        if(specialty > 30*0.8){
            if (possible_course.indexOf('建設会社') == -1){
	            possible_course.push('建設会社');
	          }
        }
        if(sociability > 330*0.8 || specialty > 60*0.8){
            if (possible_course.indexOf('鉄道会社') == -1){
	            possible_course.push('鉄道会社');
	          }
            if (possible_course.indexOf('電力会社') == -1){
	            possible_course.push('電力会社');
	          }
            if (possible_course.indexOf('インフラ会社') == -1){
	            possible_course.push('インフラ会社');
	          }
        }
        if(sociability > 330*0.8 || specialty > 50*0.8){
            if (possible_course.indexOf('不動産会社') == -1){
	            possible_course.push('不動産会社');
	          }
        }
        if(sociability > 300*0.8){
            if (possible_course.indexOf('新聞社') == -1){
	            possible_course.push('新聞社');
	          }
        }
    }
    for(var i = 0; i < circle.length; i++){
        if(circle[i] === 27){  //プログラミングサークル
            if(specialty > 70*0.8){
                if (possible_course.indexOf('ITエンジニア') == -1){
	                possible_course.push('ITエンジニア');
	              }
            }
            if(sociability > 330*0.8 || specialty > 60*0.8){
                if (possible_course.indexOf('ゲーム会社') == -1){
	                possible_course.push('ゲーム会社');
	              }
            }
        }
        if(circle[i] === 28){  //ロボットサークル
            if(specialty > 60*0.8){
                if (possible_course.indexOf('エンジニア') == -1){
	                possible_course.push('エンジニア');
	              }
                if (possible_course.indexOf('機械メーカー') == -1){
	                possible_course.push('機械メーカー');
	              }
            }
        }
        if(circle[i] === 29){  //資格サークル
            if(specialty > 120){
                if (Math.random() < 0.1){
	                possible_course.push('弁護士');
	              }
                if (Math.random() < 0.2){
	                possible_course.push('公認会計士');
	              }
            }
        }
        if(circle[i] === 20){  //ゲームサークル
            if(Math.random() < 0.1){
                possible_course.push('プロゲーマー');
            }
        }
        if(circle[i] === (1||2||3||4||5||30||31||32||33||34||35||36||37||38||39)){  //運動系サークル・部
            if(Math.random() < 0.1){
                possible_course.push('スポーツ選手');
            }
        }
        if(circle[i] === (7||11||24||25)){  //音楽系サークル
            if(Math.random() < 0.1){
                possible_course.push('音楽家');
            }
        }
        if(circle[i] === 9){  //美術サークル
            if(Math.random() < 0.1){
                possible_course.push('芸術家');
            }
        }
        if(circle[i] === 10){  //文芸サークル
            if(Math.random() < 0.1){
                possible_course.push('小説家');
            }
        }
        if(circle[i] === 13){  //登山サークル
            if(Math.random() < 0.2){
                possible_course.push('登山家');
            }
        }
        if(circle[i] === 6){  //ダンスサークル
            if(Math.random() < 0.2){
                possible_course.push('ダンサー');
            }
        }
        if(circle[i] === (18||19)){  //囲碁将棋サークル
            if(Math.random() < 0.1){
                possible_course.push('棋士');
            }
        }
        if(circle[i] === 15){  //麻雀サークル
            if(Math.random() < 0.1){
                possible_course.push('麻雀プロ');
            }
        }
        if(circle[i] === 17){  //茶道サークル
            if(Math.random() < 0.2){
                possible_course.push('茶道家');
            }
        }
        if(circle[i] === 26){  //写真サークル
            if(Math.random() < 0.2){
                possible_course.push('写真家');
            }
        }
    }

    var overlay = document.createElement('div');
    overlay.classList.add("overlay");
    overlay.id = "overlay";
    var article = document.createElement('article');
    article.textContent = "次の中から一つ進路を選択してください。";
    var list = document.createElement('ul');
    list.id = "optionList";
    list.classList.add("options-list");
    var btn = document.createElement('button');
    btn.id = "confirmButton";
    btn.disabled = true;
    btn.textContent = "決定"

    overlay.appendChild(article);
    overlay.appendChild(list);
    overlay.appendChild(btn);
    document.body.appendChild(overlay);

    let selectedOption = null;
    
    for (var i = 0; i < possible_course.length; i++) {  //選択可能な進路を表示
      var courseList = document.createElement('li'); 
      courseList.textContent = possible_course[i];
      list.appendChild(courseList); 
    };

    list.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        const previousSelected = list.querySelector('.selected');
        if (previousSelected) {
          previousSelected.classList.remove('selected');
        }

        event.target.classList.add('selected');
        selectedOption = event.target.textContent;
        btn.disabled = false;
      }
    });

    btn.addEventListener('click', () => {  //決定した進路を格納する
      if (selectedOption) {
        sessionStorage.setItem('course', selectedOption);
        document.body.removeChild(overlay);
        // ダイアログ表示
        fetch('event.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('ファイルの取得に失敗しました');
          }
          return response.json();
        })
        .then(jsonData => {
          document.getElementById('msg').textContent = jsonData[type][eventNum].msg["yes"] + selectedOption;
          resolve();
        })
        .catch(error => {
          console.error('エラー:', error);
        });
      }
    });
  })
}

// 各マスのイベント
async function doEvent(location) {
  return new Promise(function(resolve) {
    // type取得
    const jsonUrls = ['map.json', 'event.json', 'ptjob.json', 'circle.json', 'abroad.json', 'course.json'];
    fetchMultipleJsonFiles(jsonUrls)
    .then(async jsonResponses => {
      const mapjson = jsonResponses[0];
      const eventjson = jsonResponses[1];
      const ptjobjson = jsonResponses[2];
      const circlejson = jsonResponses[3];
      const abroadjson = jsonResponses[4];
      const coursejson = jsonResponses[5];

      var type = mapjson.grid[location].type; // イベントタイプ
      var num = mapjson.grid[location].num; // イベントの範囲
      var eventNum; // イベント番号

      // 通常
      if(type !== "start" && type !== "goal")
      {
        do{
          // イベントの範囲に指定があるか判断し、乱数で決定
          if(num === null)
          {
            eventNum = Math.floor(Math.random() * eventjson[type].length);
          }
          else if(num !== null)
          {
            if(num.length === 1)
            {
              eventNum = num[0];
            }
            else
            {
              eventNum = Math.floor(Math.random() * (num[1] - num[0] + 1) + num[0]);
            }
          }

          console.log(eventjson[type].length);
          console.log(type + ", " + num);
          console.log(eventNum);
        }while(!await checkCondition(type, eventNum)); // 指定したイベントの条件を満たしていない場合繰り返す

      
        // ルーレットがある場合、条件確認
        var version = "normal"; // clear: 条件を満たしていた場合に代入
        var random = Math.random();
        console.log("random:" + random);
        if(eventjson[type][eventNum].roulette !== null)
        {
          // 条件があるか確認
          if(eventjson[type][eventNum].roulette.condition !== null)
          {
            // 条件を確認してnormalかclearか判定 ["status", num]
            var status = eventjson[type][eventNum].roulette.condition[0]; // 数値
            if(parseInt(sessionStorage.getItem(status)) >= eventjson[type][eventNum].roulette.condition[1])
            {
              version = "clear";
            }
          }
        }

        // 特殊イベントの処理
        console.log(eventjson[type][eventNum].event);
        switch(eventjson[type][eventNum].event){
          case "デート":
            if(random >= eventjson[type][eventNum].roulette.prob[version][0])
            {
              // ダイアログ表示
              document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"] + eventjson[type][eventNum].msg["yes"];
            }
            else
            {
              // ダイアログ表示
              document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"] + eventjson[type][eventNum].msg["no"];
            }

            // ステータス変化の反映および表示
            var money = eventjson[type][eventNum].money;
            var sociability = eventjson[type][eventNum].sociability;
            var energy = eventjson[type][eventNum].energy;
            var specialty = eventjson[type][eventNum].specialty;
            var exp = eventjson[type][eventNum].exp;
            // セッションストレージに格納
            await setSessionStorage(money, sociability, energy, specialty, exp);
            // ステータス変化を表示
            var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
        
            setTimeout(function() {
              // 表示を変更
              displaySessionData();
            }, 1000);
        
            document.getElementById('statuschange').textContent = msg;
            console.log(msg);

            break;
          case "競馬":
            var getMoney;
            for(let i = 0; i < eventjson[type][eventNum].roulette.prob[version].length; i++)
            {
              if(random >= eventjson[type][eventNum].roulette.prob[version][i][0])
              {
                getMoney = eventjson[type][eventNum].roulette.prob[version][i][1];                
                break;
              }
            }
            // ダイアログ表示
            if(getMoney > 0)
            {
              document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"] + "+" + getMoney.toString();
            }
            else
            {
              document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"] + getMoney.toString();
            }
            // 所持金の変動

            // ステータス変化の反映および表示
            var money = eventjson[type][eventNum].money + getMoney;
            var sociability = eventjson[type][eventNum].sociability;
            var energy = eventjson[type][eventNum].energy;
            var specialty = eventjson[type][eventNum].specialty;
            var exp = eventjson[type][eventNum].exp;
            // セッションストレージに格納
            await setSessionStorage(money, sociability, energy, specialty, exp);
            // ステータス変化を表示
            var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
        
            setTimeout(function() {
              // 表示を変更
              displaySessionData();
            }, 1000);
        
            document.getElementById('statuschange').textContent = msg;
            console.log(msg);

            break;
          case "パチンコ":
            var getMoney;
            for(let i = 0; i < eventjson[type][eventNum].roulette.prob[version].length; i++)
            {
              if(random >= eventjson[type][eventNum].roulette.prob[version][i][0])
              {
                getMoney = eventjson[type][eventNum].roulette.prob[version][i][1];                
                break;
              }
            }
            // ダイアログ表示
            if(getMoney > 0)
            {
              document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"] + "+" + getMoney.toString();
            }
            else
            {
              document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"] + getMoney.toString();
            }
            // 所持金の変動
            // ステータス変化の反映および表示
            var money = eventjson[type][eventNum].money + getMoney;
            var sociability = eventjson[type][eventNum].sociability;
            var energy = eventjson[type][eventNum].energy;
            var specialty = eventjson[type][eventNum].specialty;
            var exp = eventjson[type][eventNum].exp;
            // セッションストレージに格納
            await setSessionStorage(money, sociability, energy, specialty, exp);
            // ステータス変化を表示
            var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
        
            setTimeout(function() {
              // 表示を変更
              displaySessionData();
            }, 1000);
        
            document.getElementById('statuschange').textContent = msg;
            console.log(msg);
            break;
          case "インターン": // 画面表示あり
            // ダイアログ表示
            document.getElementById('msg').innerHTML = eventjson[type][eventNum].msg["msg"];

            // ボタンを表示
            var div = document.createElement("div");
            div.id = "btnbox";
            div.style.position = "fixed";
            div.style.left = "50%";
            div.style.transform = "translateX(-50%)";
            div.style.bottom = "20%";
            var applyButton1 = document.createElement("button");
            applyButton1.id = "applyButton1";
            applyButton1.textContent = "有償インターンに応募する";
            applyButton1.style.marginRight = "20px"; // ボタン間の余白を追加
            var applyButton2 = document.createElement("button");
            applyButton2.id = "applyButton2";
            applyButton2.textContent = "無償インターンに応募する";
            applyButton2.style.marginRight = "20px"; // ボタン間の余白を追加
            var cancelButton = document.createElement("button");
            cancelButton.id = "cancelButton";
            cancelButton.textContent = "応募しない";
            div.appendChild(applyButton1);
            div.appendChild(applyButton2);
            div.appendChild(cancelButton);
            document.body.appendChild(div);

            async function waitForButton1() {
              return new Promise(function(resolve) {
                applyButton1.addEventListener("click", function() {
                  resolve("applyButton1");
                });
                applyButton2.addEventListener("click", function() {
                  resolve("applyButton2");
                });
                cancelButton.addEventListener("click", function() {
                  resolve("cancelButton");
                });
              });
            }
            async function select1() {
              var buttonId = await waitForButton1();
          
              if (buttonId === "applyButton1") // 有償
              {
                div.remove();
                // 合否判定
                if(random >= eventjson[type][eventNum].roulette.prob[version][0])
                {
                  // 合格
                  // ダイアログ表示
                  document.getElementById('msg').textContent = eventjson[type][eventNum].msg.pay.msg + eventjson[type][eventNum].msg.pay.yes;

                  // ステータス変化の反映および表示
                  var money = ptjobjson.internship[0].money;
                  var sociability = ptjobjson.internship[0].sociability;
                  var energy = ptjobjson.internship[0].energy;
                  var specialty = ptjobjson.internship[0].specialty;
                  var exp = ptjobjson.internship[0].exp;
                  // セッションストレージに格納
                  await setSessionStorage(money, sociability, energy, specialty, exp);
                  // ステータス変化を表示
                  var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

                  // インターンのターン数を追加
                  sessionStorage.setItem('internship', 2);
              
                  setTimeout(function() {
                    // 表示を変更
                    displaySessionData();
                  }, 1000);
              
                  document.getElementById('statuschange').textContent = msg;
                  console.log(msg);        
                }
                else
                {
                  // 不合格
                  // ダイアログ表示
                  document.getElementById('msg').textContent = eventjson[type][eventNum].msg.pay.msg + eventjson[type][eventNum].msg.pay.no;

                  // ステータス変化の反映および表示
                  var money = eventjson[type][eventNum].money;
                  var sociability = eventjson[type][eventNum].sociability;
                  var energy = eventjson[type][eventNum].energy;
                  var specialty = eventjson[type][eventNum].specialty;
                  var exp = eventjson[type][eventNum].exp;
                  // セッションストレージに格納
                  await setSessionStorage(money, sociability, energy, specialty, exp);
                  // ステータス変化を表示
                  var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
              
                  setTimeout(function() {
                    // 表示を変更
                    displaySessionData();
                  }, 1000);
              
                  document.getElementById('statuschange').textContent = msg;
                  console.log(msg); 

                }    
              } else if (buttonId === "applyButton2") // 無償
              {
                div.remove();
                // ダイアログ表示
                document.getElementById('msg').textContent = eventjson[type][eventNum].msg["free"];

                // ステータス変化の反映および表示
                var money = ptjobjson.internship[1].money;
                var sociability = ptjobjson.internship[1].sociability;
                var energy = ptjobjson.internship[1].energy;
                var specialty = ptjobjson.internship[1].specialty;
                var exp = ptjobjson.internship[1].exp;
                // セッションストレージに格納
                await setSessionStorage(money, sociability, energy, specialty, exp);
                // ステータス変化を表示
                var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

                setTimeout(function() {
                  // 表示を変更
                  displaySessionData();
                }, 1000);

                document.getElementById('statuschange').textContent = msg;
                console.log(msg);
              } else if (buttonId === "cancelButton") // 応募しない
              {
                div.remove();
                // ダイアログ表示
                document.getElementById('msg').textContent = eventjson[type][eventNum].msg["no"];

                // ステータス変化の反映および表示
                var money = eventjson[type][eventNum].money;
                var sociability = eventjson[type][eventNum].sociability;
                var energy = eventjson[type][eventNum].energy;
                var specialty = eventjson[type][eventNum].specialty;
                var exp = eventjson[type][eventNum].exp;
                // セッションストレージに格納
                await setSessionStorage(money, sociability, energy, specialty, exp);
                // ステータス変化を表示
                var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

                setTimeout(function() {
                  // 表示を変更
                  displaySessionData();
                }, 1000);

                document.getElementById('statuschange').textContent = msg;
                console.log(msg);
              }
          
              // switch文から抜ける
              return;
            }
            
            await select1();

            break;
          case "正月":
            var getMoney;
            for(let i = 0; i < eventjson[type][eventNum].roulette.prob[version].length; i++)
            {
              if(random >= eventjson[type][eventNum].roulette.prob[version][i][0])
              {
                getMoney = eventjson[type][eventNum].roulette.prob[version][i][1];                
                break;
              }
            }
            // ダイアログ表示
            document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"] + getMoney.toString() + eventjson[type][eventNum].msg["msg2"];
            // 所持金の変動
            // ステータス変化の反映および表示
            var money = eventjson[type][eventNum].money + getMoney;
            var sociability = eventjson[type][eventNum].sociability;
            var energy = eventjson[type][eventNum].energy;
            var specialty = eventjson[type][eventNum].specialty;
            var exp = eventjson[type][eventNum].exp;
            // セッションストレージに格納
            await setSessionStorage(money, sociability, energy, specialty, exp);
            // ステータス変化を表示
            var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
        
            setTimeout(function() {
              // 表示を変更
              displaySessionData();
            }, 1000);
        
            document.getElementById('statuschange').textContent = msg;
            console.log(msg);

            break;
          case "期末テスト":
            var nowCredit = 0;
            for(let i = 0; i < eventjson[type][eventNum].roulette.prob[version].length; i++)
            {
              if(random >= eventjson[type][eventNum].roulette.prob[version][i][0])
              {
                nowCredit = eventjson[type][eventNum].roulette.prob[version][i][1];
                break;                
              }
            }
            // additionalの確認
            for(let i = 0; i < eventjson[type][eventNum].roulette.additional.length; i++)
            {
              if(parseInt(sessionStorage.getItem('specialty')) >= eventjson[type][eventNum].roulette.additional[i][0])
              {
                nowCredit += eventjson[type][eventNum].roulette.additional[i][1];
                // 上限を超えている場合は上限に合わせる
                if(parseInt(sessionStorage.getItem('maxcredit')) < nowCredit)
                {
                  nowCredit = parseInt(sessionStorage.getItem('maxcredit'));
                }
                break;                
              }
            }
            // 今学期取得単位数を格納
            sessionStorage.setItem('nowcredit', nowCredit);
            console.log(nowCredit);
            // ダイアログ表示
            document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"];
            // ステータス変化の反映および表示
            var money = eventjson[type][eventNum].money;
            var sociability = eventjson[type][eventNum].sociability;
            var energy = eventjson[type][eventNum].energy;
            var specialty = eventjson[type][eventNum].specialty;
            var exp = eventjson[type][eventNum].exp;
            // セッションストレージに格納
            await setSessionStorage(money, sociability, energy, specialty, exp);
            // ステータス変化を表示
            var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
        
            setTimeout(function() {
              // 表示を変更
              displaySessionData();
            }, 1000);
        
            document.getElementById('statuschange').textContent = msg;
            console.log(msg);

            break;
          case "英語統一テスト":
            var getCredit = 0;
            if(random >= eventjson[type][eventNum].roulette.prob[version][0])
            {
              getCredit = 1; // 単位取得
              // ダイアログ表示
              document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"] + eventjson[type][eventNum].msg["yes"];
            }
            else
            {
              // ダイアログ表示
              document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"] + eventjson[type][eventNum].msg["no"];
            }
            // 上限を越さないように今学期取得単位数に追加
            if((parseInt(sessionStorage.getItem('nowcredit')) + getCredit) < parseInt(sessionStorage.getItem('maxcredit')))
            {
              sessionStorage.setItem('nowcredit', (parseInt(sessionStorage.getItem('nowcredit')) + getCredit));
            }

            // ステータス変化の反映および表示
            var money = eventjson[type][eventNum].money;
            var sociability = eventjson[type][eventNum].sociability;
            var energy = eventjson[type][eventNum].energy;
            var specialty = eventjson[type][eventNum].specialty;
            var exp = eventjson[type][eventNum].exp;
            // セッションストレージに格納
            await setSessionStorage(money, sociability, energy, specialty, exp);
            // ステータス変化を表示sessionStorage
            var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
        
            setTimeout(function() {
              // 表示を変更
              displaySessionData();
            }, 1000);
        
            document.getElementById('statuschange').textContent = msg;
            console.log(msg);


            break;
          case "サークル": // 画面表示あり
            // 既に3つ以上サークルに入っている場合
            var mylist = JSON.parse(sessionStorage.getItem('circle'));
            console.log("circle:" + mylist);
            if(mylist.length === 3)
            {
              // ダイアログ表示
              document.getElementById('msg').textContent = "これ以上サークルの掛け持ちは出来なさそうだ。";

              // ステータス変化の反映および表示
              var money = eventjson[type][eventNum].money;
              var sociability = eventjson[type][eventNum].sociability;
              var energy = eventjson[type][eventNum].energy;
              var specialty = eventjson[type][eventNum].specialty;
              var exp = eventjson[type][eventNum].exp;
              // セッションストレージに格納
              await setSessionStorage(money, sociability, energy, specialty, exp);
              // ステータス変化を表示
              var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

              setTimeout(function() {
                // 表示を変更
                displaySessionData();
              }, 1000);

              document.getElementById('statuschange').textContent = msg;
              console.log(msg);
            }
            else
            {
              // ダイアログ表示
              document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"];
              // 3つ未満の場合
              // サークルを5つ決定 かぶらないように
              var circlelist = [];
              var arr = [];
              for(let i = 1; i <= 39; i++)
              {
                if(!mylist.includes(i))
                {
                  arr.push(i);
                }
              }
              for(let i = 0; i < 5; i++) {
                var randomIndex = Math.floor(Math.random() * arr.length);
                var randomNumber = arr[randomIndex];
                arr.splice(randomIndex, 1);
                circlelist.push(randomNumber);
              }

              // ボタンを６つ(5:circle, 1:no)を表示
              var div = document.createElement("div");
              div.id = "btnbox";
              div.style.position = "fixed";
              div.style.left = "50%";
              div.style.transform = "translateX(-50%)";
              div.style.bottom = "20%";
              var btn1 = document.createElement("button");
              btn1.id = "circle1";
              btn1.textContent = circlejson.circle[circlelist[0]].circle;
              btn1.style.marginRight = "20px"; // ボタン間の余白を追加
              var btn2 = document.createElement("button");
              btn2.id = "circle2";
              btn2.textContent = circlejson.circle[circlelist[1]].circle;
              btn2.style.marginRight = "20px"; // ボタン間の余白を追加
              var btn3 = document.createElement("button");
              btn3.id = "circle3";
              btn3.textContent = circlejson.circle[circlelist[2]].circle;
              btn3.style.marginRight = "20px"; // ボタン間の余白を追加
              var btn4 = document.createElement("button");
              btn4.id = "circle4";
              btn4.textContent = circlejson.circle[circlelist[3]].circle;
              btn4.style.marginRight = "20px"; // ボタン間の余白を追加
              var btn5 = document.createElement("button");
              btn5.id = "circle5";
              btn5.textContent = circlejson.circle[circlelist[4]].circle;
              btn5.style.marginRight = "20px"; // ボタン間の余白を追加
              var btn6 = document.createElement("button");
              btn6.id = "circle6";
              btn6.textContent = "入らない";

              div.appendChild(btn1);
              div.appendChild(btn2);
              div.appendChild(btn3);
              div.appendChild(btn4);
              div.appendChild(btn5);
              div.appendChild(btn6);
              document.body.appendChild(div);

              async function waitForButton2() {
                return new Promise(function(resolve) {
                  btn1.addEventListener("click", function() {
                    resolve("circle1");
                  });
                  btn2.addEventListener("click", function() {
                    resolve("circle2");
                  });
                  btn3.addEventListener("click", function() {
                    resolve("circle3");
                  });
                  btn4.addEventListener("click", function() {
                    resolve("circle4");
                  });
                  btn5.addEventListener("click", function() {
                    resolve("circle5");
                  });
                  btn6.addEventListener("click", function() {
                    resolve("circle6");
                  });
                });
              }
              async function select2() {
                var buttonId = await waitForButton2();
                if (buttonId === "circle1") {
                  div.remove();
                  // ダイアログ表示
                  document.getElementById('msg').textContent = circlejson.circle[circlelist[0]].circle + eventjson[type][eventNum].msg["yes"];

                  // ステータス変化の反映および表示
                  var money = eventjson[type][eventNum].money;
                  var sociability = eventjson[type][eventNum].sociability;
                  var energy = eventjson[type][eventNum].energy;
                  var specialty = eventjson[type][eventNum].specialty;
                  var exp = eventjson[type][eventNum].exp;
                  // セッションストレージに格納
                  await setSessionStorage(money, sociability, energy, specialty, exp);
                  // ステータス変化を表示
                  var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

                  // サークルを追加
                  mylist.push(circlelist[0]);
                  var newlist = mylist.filter(function(element) {
                    return element !== 0;
                  });
                  sessionStorage.setItem('circle', "[" + newlist + "]");
              
                  setTimeout(function() {
                    // 表示を変更
                    displaySessionData();
                  }, 1000);
              
                  document.getElementById('statuschange').textContent = msg;
                  console.log(msg);          
                } else if (buttonId === "circle2") {
                  div.remove();
                  // ダイアログ表示
                  document.getElementById('msg').textContent = circlejson.circle[circlelist[1]].circle + eventjson[type][eventNum].msg["yes"];

                  // ステータス変化の反映および表示
                  var money = eventjson[type][eventNum].money;
                  var sociability = eventjson[type][eventNum].sociability;
                  var energy = eventjson[type][eventNum].energy;
                  var specialty = eventjson[type][eventNum].specialty;
                  var exp = eventjson[type][eventNum].exp;
                  // セッションストレージに格納
                  await setSessionStorage(money, sociability, energy, specialty, exp);
                  // ステータス変化を表示
                  var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

                  // サークルを追加
                  mylist.push(circlelist[1]);
                  var newlist = mylist.filter(function(element) {
                    return element !== 0;
                  });
                  sessionStorage.setItem('circle', "[" + newlist + "]");

                  setTimeout(function() {
                    // 表示を変更
                    displaySessionData();
                  }, 1000);

                  document.getElementById('statuschange').textContent = msg;
                  console.log(msg);
                } else if (buttonId === "circle3") {
                  div.remove();
                  // ダイアログ表示
                  document.getElementById('msg').textContent = circlejson.circle[circlelist[2]].circle + eventjson[type][eventNum].msg["yes"];

                  // ステータス変化の反映および表示
                  var money = eventjson[type][eventNum].money;
                  var sociability = eventjson[type][eventNum].sociability;
                  var energy = eventjson[type][eventNum].energy;
                  var specialty = eventjson[type][eventNum].specialty;
                  var exp = eventjson[type][eventNum].exp;
                  // セッションストレージに格納
                  await setSessionStorage(money, sociability, energy, specialty, exp);
                  // ステータス変化を表示
                  var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

                  // サークルを追加
                  mylist.push(circlelist[2]);
                  var newlist = mylist.filter(function(element) {
                    return element !== 0;
                  });
                  sessionStorage.setItem('circle', "[" + newlist + "]");

                  setTimeout(function() {
                    // 表示を変更
                    displaySessionData();
                  }, 1000);

                  document.getElementById('statuschange').textContent = msg;
                  console.log(msg);
                } else if (buttonId === "circle4") {
                  div.remove();
                  // ダイアログ表示
                  document.getElementById('msg').textContent = circlejson.circle[circlelist[3]].circle + eventjson[type][eventNum].msg["yes"];

                  // ステータス変化の反映および表示
                  var money = eventjson[type][eventNum].money;
                  var sociability = eventjson[type][eventNum].sociability;
                  var energy = eventjson[type][eventNum].energy;
                  var specialty = eventjson[type][eventNum].specialty;
                  var exp = eventjson[type][eventNum].exp;
                  // セッションストレージに格納
                  await setSessionStorage(money, sociability, energy, specialty, exp);
                  // ステータス変化を表示
                  var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

                  // サークルを追加
                  mylist.push(circlelist[3]);
                  var newlist = mylist.filter(function(element) {
                    return element !== 0;
                  });
                  sessionStorage.setItem('circle', "[" + newlist + "]");

                  setTimeout(function() {
                    // 表示を変更
                    displaySessionData();
                  }, 1000);

                  document.getElementById('statuschange').textContent = msg;
                  console.log(msg);
                } else if (buttonId === "circle5") {
                  div.remove();
                  // ダイアログ表示
                  document.getElementById('msg').textContent = circlejson.circle[circlelist[4]].circle + eventjson[type][eventNum].msg["yes"];

                  // ステータス変化の反映および表示
                  var money = eventjson[type][eventNum].money;
                  var sociability = eventjson[type][eventNum].sociability;
                  var energy = eventjson[type][eventNum].energy;
                  var specialty = eventjson[type][eventNum].specialty;
                  var exp = eventjson[type][eventNum].exp;
                  // セッションストレージに格納
                  await setSessionStorage(money, sociability, energy, specialty, exp);
                  // ステータス変化を表示
                  var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

                  // サークルを追加
                  mylist.push(circlelist[4]);
                  var newlist = mylist.filter(function(element) {
                    return element !== 0;
                  });
                  sessionStorage.setItem('circle', "[" + newlist + "]");
                  
                  setTimeout(function() {
                    // 表示を変更
                    displaySessionData();
                  }, 1000);

                  document.getElementById('statuschange').textContent = msg;
                  console.log(msg);
                } else if (buttonId === "circle6") {
                  div.remove();
                  // ダイアログ表示
                  document.getElementById('msg').textContent = eventjson[type][eventNum].msg["no"];

                  // ステータス変化の反映および表示
                  var money = eventjson[type][eventNum].money;
                  var sociability = eventjson[type][eventNum].sociability;
                  var energy = eventjson[type][eventNum].energy;
                  var specialty = eventjson[type][eventNum].specialty;
                  var exp = eventjson[type][eventNum].exp;
                  // セッションストレージに格納
                  await setSessionStorage(money, sociability, energy, specialty, exp);
                  // ステータス変化を表示
                  var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

                  setTimeout(function() {
                    // 表示を変更
                    displaySessionData();
                  }, 1000);

                  document.getElementById('statuschange').textContent = msg;
                  console.log(msg);
                }
            
                // switch文から抜ける
                return;
              }

              await select2();
            }

            break;
          case "バイト": // 画面表示あり
            // 既に3つ以上バイトをしている場合
            var list = JSON.parse(sessionStorage.getItem('ptjob'));
            console.log("ptjob:" + list);
            if(list.length === 3)
            {
              // ダイアログ表示
              document.getElementById('msg').textContent = "これ以上バイトの掛け持ちは出来なさそうだ。";

              // ステータス変化の反映および表示
              var money = eventjson[type][eventNum].money;
              var sociability = eventjson[type][eventNum].sociability;
              var energy = eventjson[type][eventNum].energy;
              var specialty = eventjson[type][eventNum].specialty;
              var exp = eventjson[type][eventNum].exp;
              // セッションストレージに格納
              await setSessionStorage(money, sociability, energy, specialty, exp);
              // ステータス変化を表示
              var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

              setTimeout(function() {
                // 表示を変更
                displaySessionData();
              }, 1000);

              document.getElementById('statuschange').textContent = msg;
              console.log(msg);
            }
            else
            {
              // 3未満の場合
              // バイトを決定
              var ptjobNum = Math.floor(Math.random() * 15) + 1;
              // ダイアログ表示
              document.getElementById('msg').textContent = ptjobjson.ptjob[ptjobNum].ptjob + eventjson[type][eventNum].msg["msg"];
              // ボタン表示
              var div = document.createElement("div");
              div.id = "btnbox";
              div.style.position = "fixed";
              div.style.left = "50%";
              div.style.transform = "translateX(-50%)";
              div.style.bottom = "20%";
              var applyButton = document.createElement("button");
              applyButton.id = "applyButton";
              applyButton.textContent = "応募する";
              applyButton.style.marginRight = "20px"; // ボタン間の余白を追加
              var cancelButton = document.createElement("button");
              cancelButton.id = "cancelButton";
              cancelButton.textContent = "応募しない";
              div.appendChild(applyButton);
              div.appendChild(cancelButton);
              document.body.appendChild(div);

              async function waitForButton3() {
                return new Promise(function(resolve) {
                  applyButton.addEventListener("click", function() {
                    resolve("applyButton");
                  });
            
                  cancelButton.addEventListener("click", function() {
                    resolve("cancelButton");
                  });
                });
              }
              async function select3() {
                var buttonId = await waitForButton3();
            
                if (buttonId === "applyButton") {
                  div.remove();
                  // ダイアログ表示
                  document.getElementById('msg').textContent = eventjson[type][eventNum].msg["yes"];

                  // ステータス変化の反映および表示
                  var money = eventjson[type][eventNum].money;
                  var sociability = eventjson[type][eventNum].sociability;
                  var energy = eventjson[type][eventNum].energy;
                  var specialty = eventjson[type][eventNum].specialty;
                  var exp = eventjson[type][eventNum].exp;
                  // セッションストレージに格納
                  await setSessionStorage(money, sociability, energy, specialty, exp);
                  // ステータス変化を表示
                  var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

                  // バイトを追加
                  list.push(ptjobNum);
                  var newlist = list.filter(function(element) {
                    return element !== 0;
                  });
                  sessionStorage.setItem('ptjob', "[" + newlist + "]");
              
                  setTimeout(function() {
                    // 表示を変更
                    displaySessionData();
                  }, 1000);
              
                  document.getElementById('statuschange').textContent = msg;
                  console.log(msg);          
                } else if (buttonId === "cancelButton") {
                  div.remove();
                  // ダイアログ表示
                  document.getElementById('msg').textContent = eventjson[type][eventNum].msg["no"];

                  // ステータス変化の反映および表示
                  var money = eventjson[type][eventNum].money;
                  var sociability = eventjson[type][eventNum].sociability;
                  var energy = eventjson[type][eventNum].energy;
                  var specialty = eventjson[type][eventNum].specialty;
                  var exp = eventjson[type][eventNum].exp;
                  // セッションストレージに格納
                  await setSessionStorage(money, sociability, energy, specialty, exp);
                  // ステータス変化を表示
                  var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

                  setTimeout(function() {
                    // 表示を変更
                    displaySessionData();
                  }, 1000);

                  document.getElementById('statuschange').textContent = msg;
                  console.log(msg);
                }
            
                // switch文から抜ける
                return;
              }

              await select3();
            }
                      
            break;
          case "進路決定": // 画面表示あり
            // ダイアログ表示
            document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"];
            await selectCourse(type, eventNum);
            // ステータス変化の反映および表示
            var money = eventjson[type][eventNum].money;
            var sociability = eventjson[type][eventNum].sociability;
            var energy = eventjson[type][eventNum].energy;
            var specialty = eventjson[type][eventNum].specialty;
            var exp = eventjson[type][eventNum].exp;
            // セッションストレージに格納
            await setSessionStorage(money, sociability, energy, specialty, exp);
            // ステータス変化を表示
            var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
        
            setTimeout(function() {
              // 表示を変更
              displaySessionData();
            }, 1000);
        
            document.getElementById('statuschange').textContent = msg;
            console.log(msg);

            break;
          case "単発バイト": // 画面表示あり
            // バイトを決定
            // 塾講師のバイトをしている場合0-10, そうでない場合0-9
            var list = JSON.parse(sessionStorage.getItem('ptjob'));
            var flg = false;
            var ptjobNum;
            for(let i = 0; i < list.length; i++){
              if(list[i] === 1){
                flg = true;
              }
            }
            if(flg){
              ptjobNum = Math.floor(Math.random() * 11);
            }
            else{
              ptjobNum = Math.floor(Math.random() * 10);
            }
            
            // ダイアログ表示
            document.getElementById('msg').textContent = ptjobjson.tempjob[ptjobNum].tempjob + eventjson[type][eventNum].msg["msg"];
            // ボタン表示
            var div = document.createElement("div");
            div.id = "btnbox";
            div.style.position = "fixed";
            div.style.left = "50%";
            div.style.transform = "translateX(-50%)";
            div.style.bottom = "20%";
            var applyButton = document.createElement("button");
            applyButton.id = "applyButton";
            applyButton.textContent = "応募する";
            applyButton.style.marginRight = "20px"; // ボタン間の余白を追加
            var cancelButton = document.createElement("button");
            cancelButton.id = "cancelButton";
            cancelButton.textContent = "応募しない";
            div.appendChild(applyButton);
            div.appendChild(cancelButton);
            document.body.appendChild(div);

            async function waitForButton4() {
              return new Promise(function(resolve) {
                applyButton.addEventListener("click", function() {
                  resolve("applyButton");
                });
          
                cancelButton.addEventListener("click", function() {
                  resolve("cancelButton");
                });
              });
            }
            async function select4() {
              var buttonId = await waitForButton4();
          
              if (buttonId === "applyButton") {
                div.remove();
                // ダイアログ表示
                document.getElementById('msg').textContent = eventjson[type][eventNum].msg["yes"];

                // ステータス変化の反映および表示
                var money = ptjobjson.tempjob[ptjobNum].money;
                var sociability = ptjobjson.tempjob[ptjobNum].sociability;
                var energy = ptjobjson.tempjob[ptjobNum].energy;
                var specialty = ptjobjson.tempjob[ptjobNum].specialty;
                var exp = ptjobjson.tempjob[ptjobNum].exp;
                // セッションストレージに格納
                await setSessionStorage(money, sociability, energy, specialty, exp);
                // ステータス変化を表示
                var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
            
                setTimeout(function() {
                  // 表示を変更
                  displaySessionData();
                }, 1000);
            
                document.getElementById('statuschange').textContent = msg;
                console.log(msg);          
              } else if (buttonId === "cancelButton") {
                div.remove();
                // ダイアログ表示
                document.getElementById('msg').textContent = eventjson[type][eventNum].msg["no"];

                // ステータス変化の反映および表示
                var money = eventjson[type][eventNum].money;
                var sociability = eventjson[type][eventNum].sociability;
                var energy = eventjson[type][eventNum].energy;
                var specialty = eventjson[type][eventNum].specialty;
                var exp = eventjson[type][eventNum].exp;
                // セッションストレージに格納
                await setSessionStorage(money, sociability, energy, specialty, exp);
                // ステータス変化を表示
                var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

                setTimeout(function() {
                  // 表示を変更
                  displaySessionData();
                }, 1000);

                document.getElementById('statuschange').textContent = msg;
                console.log(msg);
              }
          
              // switch文から抜ける
              return;
            }

            await select4();

            break;
          case "留学": // 画面表示あり
            // ダイアログ表示
            document.getElementById('msg').innerHTML = eventjson[type][eventNum].msg["msg"];

            // ボタンを表示
            var div = document.createElement("div");
            div.id = "btnbox";
            div.style.position = "fixed";
            div.style.left = "50%";
            div.style.transform = "translateX(-50%)";
            div.style.bottom = "20%";
            var applyButton = document.createElement("button");
            applyButton.id = "applyButton";
            applyButton.textContent = "行く";
            applyButton.style.marginRight = "20px"; // ボタン間の余白を追加
            var cancelButton = document.createElement("button");
            cancelButton.id = "cancelButton";
            cancelButton.textContent = "行かない";
            div.appendChild(applyButton);
            div.appendChild(cancelButton);
            document.body.appendChild(div);

            async function waitForButton5() {
              return new Promise(function(resolve) {
                applyButton.addEventListener("click", function() {
                  resolve("applyButton");
                });
                cancelButton.addEventListener("click", function() {
                  resolve("cancelButton");
                });
              });
            }
            async function select5() {
              var buttonId = await waitForButton5();
          
              if (buttonId === "applyButton") // 行く
              {
                div.remove();
                // ダイアログ表示
                document.getElementById('msg').textContent = eventjson[type][eventNum].msg.yes;

                // 国決め
                // ボタンを表示
                var div2 = document.createElement("div");
                div2.id = "btnbox";
                div2.style.position = "fixed";
                div2.style.left = "50%";
                div2.style.transform = "translateX(-50%)";
                div2.style.bottom = "20%";
                var country1 = document.createElement("button");
                country1.id = "country1";
                country1.textContent = "オーストラリア";
                country1.style.marginRight = "20px"; // ボタン間の余白を追加
                var country2 = document.createElement("button");
                country2.id = "country2";
                country2.textContent = "イギリス";
                country2.style.marginRight = "20px"; // ボタン間の余白を追加
                var country3 = document.createElement("button");
                country3.id = "country3";
                country3.textContent = "カナダ";
                country3.style.marginRight = "20px"; // ボタン間の余白を追加
                var country4 = document.createElement("button");
                country4.id = "country4";
                country4.textContent = "中国";
                div2.appendChild(country1);
                div2.appendChild(country2);
                div2.appendChild(country3);
                div2.appendChild(country4);
                document.body.appendChild(div2);

                async function waitForButton6() {
                  return new Promise(function(resolve) {
                    country1.addEventListener("click", function() {
                      resolve("country1");
                    });
                    country2.addEventListener("click", function() {
                      resolve("country2");
                    });
                    country3.addEventListener("click", function() {
                      resolve("country3");
                    });
                    country4.addEventListener("click", function() {
                      resolve("country4");
                    });
                  });
                }
                async function select6() {
                  var buttonId = await waitForButton6();
              
                  if (buttonId === "country1") 
                  {
                    div2.remove();
                    // ダイアログ表示
                    document.getElementById('msg').textContent = abroadjson.abroad[0].country + eventjson[type][eventNum].msg.msg2;
  
                    // ステータス変化の反映および表示
                    var money = eventjson[type][eventNum].money;
                    var sociability = eventjson[type][eventNum].sociability;
                    var energy = eventjson[type][eventNum].energy;
                    var specialty = eventjson[type][eventNum].specialty;
                    var exp = eventjson[type][eventNum].exp;
                    // セッションストレージに格納
                    await setSessionStorage(money, sociability, energy, specialty, exp);
                    // ステータス変化を表示
                    var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

                    // 留学先を格納
                    sessionStorage.setItem('abroad', 0);
                
                    setTimeout(function() {
                      // 表示を変更
                      displaySessionData();
                    }, 1000);

                    // 現在地を取得して格納
                    sessionStorage.setItem('exmap', sessionStorage.getItem('map'));
                    sessionStorage.setItem('exgrid', location);
                    // MAP移動
                    var image = document.getElementById("playicon");
                    document.getElementsByClassName(location.toString())[0].removeChild(image);
                    document.getElementsByClassName("145")[0].appendChild(image);
                    setActiveButton(4);
                    toMap5();
                    sessionStorage.setItem('map', 5);
                
                    document.getElementById('statuschange').textContent = msg;
                    console.log(msg);        
   
                  } else if (buttonId === "country2") 
                  {
                    div2.remove();
                    // ダイアログ表示
                    document.getElementById('msg').textContent = abroadjson.abroad[1].country + eventjson[type][eventNum].msg.msg2;
   
                    // ステータス変化の反映および表示
                    var money = eventjson[type][eventNum].money;
                    var sociability = eventjson[type][eventNum].sociability;
                    var energy = eventjson[type][eventNum].energy;
                    var specialty = eventjson[type][eventNum].specialty;
                    var exp = eventjson[type][eventNum].exp;
                    // セッションストレージに格納
                    await setSessionStorage(money, sociability, energy, specialty, exp);
                    // ステータス変化を表示
                    var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
    
                    // 留学先を格納
                    sessionStorage.setItem('abroad', 1);
                    
                    setTimeout(function() {
                      // 表示を変更
                      displaySessionData();
                    }, 1000);

                    // 現在地を取得して格納
                    sessionStorage.setItem('exmap', sessionStorage.getItem('map'));
                    sessionStorage.setItem('exgrid', location);
                    // MAP移動
                    var image = document.getElementById("playicon");
                    document.getElementsByClassName(location.toString())[0].removeChild(image);
                    document.getElementsByClassName("145")[0].appendChild(image);
                    setActiveButton(4);
                    toMap5();
                    sessionStorage.setItem('map', 5);
    
                    document.getElementById('statuschange').textContent = msg;
                    console.log(msg);
                  } else if (buttonId === "country3") 
                  {
                    div2.remove();
                    // ダイアログ表示
                    document.getElementById('msg').textContent = abroadjson.abroad[2].country + eventjson[type][eventNum].msg.msg2;
   
                    // ステータス変化の反映および表示
                    var money = eventjson[type][eventNum].money;
                    var sociability = eventjson[type][eventNum].sociability;
                    var energy = eventjson[type][eventNum].energy;
                    var specialty = eventjson[type][eventNum].specialty;
                    var exp = eventjson[type][eventNum].exp;
                    // セッションストレージに格納
                    await setSessionStorage(money, sociability, energy, specialty, exp);
                    // ステータス変化を表示
                    var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
    
                    // 留学先を格納
                    sessionStorage.setItem('abroad', 2);

                    setTimeout(function() {
                      // 表示を変更
                      displaySessionData();
                    }, 1000);

                    // 現在地を取得して格納
                    sessionStorage.setItem('exmap', sessionStorage.getItem('map'));
                    sessionStorage.setItem('exgrid', location);
                    // MAP移動
                    var image = document.getElementById("playicon");
                    document.getElementsByClassName(location.toString())[0].removeChild(image);
                    document.getElementsByClassName("145")[0].appendChild(image);
                    setActiveButton(4);
                    toMap5();
                    sessionStorage.setItem('map', 5);
    
                    document.getElementById('statuschange').textContent = msg;
                    console.log(msg);
                  } else if (buttonId === "country4") 
                  {
                    div2.remove();
                    // ダイアログ表示
                    document.getElementById('msg').textContent = abroadjson.abroad[4].country + eventjson[type][eventNum].msg.msg2;
    
                    // ステータス変化の反映および表示
                    var money = eventjson[type][eventNum].money;
                    var sociability = eventjson[type][eventNum].sociability;
                    var energy = eventjson[type][eventNum].energy;
                    var specialty = eventjson[type][eventNum].specialty;
                    var exp = eventjson[type][eventNum].exp;
                    // セッションストレージに格納
                    await setSessionStorage(money, sociability, energy, specialty, exp);
                    // ステータス変化を表示
                    var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
    
                    // 留学先を格納
                    sessionStorage.setItem('abroad', 3);
                    
                    setTimeout(function() {
                      // 表示を変更
                      displaySessionData();
                    }, 1000);

                    // 現在地を取得して格納
                    sessionStorage.setItem('exmap', sessionStorage.getItem('map'));
                    sessionStorage.setItem('exgrid', location);
                    // MAP移動
                    var image = document.getElementById("playicon");
                    document.getElementsByClassName(location.toString())[0].removeChild(image);
                    document.getElementsByClassName("145")[0].appendChild(image);
                    setActiveButton(4);
                    toMap5();
                    sessionStorage.setItem('map', 5);
    
                    document.getElementById('statuschange').textContent = msg;
                    console.log(msg);
                  }
              
                  // switch文から抜ける
                  return;
                }

                await select6();

                // ステータス変化の反映および表示
                var money = ptjobjson.internship[0].money;
                var sociability = ptjobjson.internship[0].sociability;
                var energy = ptjobjson.internship[0].energy;
                var specialty = ptjobjson.internship[0].specialty;
                var exp = ptjobjson.internship[0].exp;
                // セッションストレージに格納
                await setSessionStorage(money, sociability, energy, specialty, exp);
                // ステータス変化を表示
                var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
            
                setTimeout(function() {
                  // 表示を変更
                  displaySessionData();
                }, 1000);
            
                document.getElementById('statuschange').textContent = msg;
                console.log(msg);        
              } 
              else if (buttonId === "cancelButton") // 行かない
              {
                div.remove();
                // ダイアログ表示
                document.getElementById('msg').textContent = eventjson[type][eventNum].msg["no"];

                // ステータス変化の反映および表示
                var money = eventjson[type][eventNum].money;
                var sociability = eventjson[type][eventNum].sociability;
                var energy = eventjson[type][eventNum].energy;
                var specialty = eventjson[type][eventNum].specialty;
                var exp = eventjson[type][eventNum].exp;
                // セッションストレージに格納
                await setSessionStorage(money, sociability, energy, specialty, exp);
                // ステータス変化を表示
                var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

                setTimeout(function() {
                  // 表示を変更
                  displaySessionData();
                }, 1000);

                document.getElementById('statuschange').textContent = msg;
                console.log(msg);
              }
          
              // switch文から抜ける
              return;
            }

            await select5();

            break;
          case "成績発表":
            // ダイアログ表示
            document.getElementById('msg').innerHTML = eventjson[type][eventNum].msg["msg"] + sessionStorage.getItem('nowcredit');

            // ステータス変化の反映および表示
            var money = eventjson[type][eventNum].money;
            var sociability = eventjson[type][eventNum].sociability;
            var energy = eventjson[type][eventNum].energy;
            var specialty = eventjson[type][eventNum].specialty;
            var exp = eventjson[type][eventNum].exp;
            // セッションストレージに格納
            await setSessionStorage(money, sociability, energy, specialty, exp);
            // ステータス変化を表示
            var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
            
            sessionStorage.setItem('credit', (parseInt(sessionStorage.getItem('nowcredit')) + parseInt(sessionStorage.getItem('credit')))); // creditにnowcreditを追加
            sessionStorage.setItem('excredit', sessionStorage.getItem('nowcredit')); // excreditにnowcreditを代入
            if(parseInt(sessionStorage.getItem('excredit')) >= 21) // excreditからmaxcreditを計算
            {
              sessionStorage.setItem('maxcredit', 28); // 21以上なら28に
            }
            else
            {
              sessionStorage.setItem('maxcredit', 24); // 21未満なら24に
            }

            if(location === 143)
            {
              // 4年次なら卒業判定
              // 124単位取得できていなかったら4年次のスタートマスへ
              if(parseInt(sessionStorage.getItem('credit')) < 124)
              {
                document.getElementById('msg').innerHTML += "<br>124単位取得できていないので留年だ、、、。<br>4年スタートに戻る。";
                var image = document.getElementById("playicon");
                document.getElementsByClassName("143")[0].removeChild(image);
                document.getElementsByClassName("113")[0].appendChild(image);
              }
              else
              {
                // 124単位取得済み→卒業可能
                document.getElementById('msg').innerHTML += "<br>124単位以上取得しているので卒業可能だ！";
              }
            }
        
            setTimeout(function() {
              // 表示を変更
              displaySessionData();
            }, 1000);
        
            document.getElementById('statuschange').textContent = msg;
            console.log(msg);
            break;
          case "バイトがクビに":
            // ダイアログ表示
            document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"];

            // ステータス変化の反映および表示
            var money = eventjson[type][eventNum].money;
            var sociability = eventjson[type][eventNum].sociability;
            var energy = eventjson[type][eventNum].energy;
            var specialty = eventjson[type][eventNum].specialty;
            var exp = eventjson[type][eventNum].exp;
            // セッションストレージに格納
            await setSessionStorage(money, sociability, energy, specialty, exp);
            // ステータス変化を表示
            var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

            // バイトを1つ減らす
            var arr = JSON.parse(sessionStorage.getItem('ptjob'));
            var list = [];
            if(arr.length === 1)
            {
              list[0] = 0;
            }
            else
            {
              for(let i = 0; i < arr.length - 1; i++)
              {
                list.push(arr[i]);
              }
            }
            sessionStorage.setItem('ptjob', "[" + list + "]");
        
            setTimeout(function() {
              // 表示を変更
              displaySessionData();
            }, 1000);
        
            document.getElementById('statuschange').textContent = msg;
            console.log(msg);
            break;
          case "実験":
          case "泥酔":
            // ダイアログ表示
            document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"];

            // ステータス変化の反映および表示
            var money = eventjson[type][eventNum].money;
            var sociability = eventjson[type][eventNum].sociability;
            var energy = eventjson[type][eventNum].energy;
            var specialty = eventjson[type][eventNum].specialty;
            var exp = eventjson[type][eventNum].exp;
            // セッションストレージに格納
            await setSessionStorage(money, sociability, energy, specialty, exp);
            // ステータス変化を表示
            var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

            // 1回休み
            sessionStorage.setItem('break', 1)
        
            setTimeout(function() {
              // 表示を変更
              displaySessionData();
            }, 1000);
        
            document.getElementById('statuschange').textContent = msg;
            console.log(msg);
            break;
          case "ソウルフードを食べる１":
             // ダイアログ表示
             document.getElementById('msg').textContent = abroadjson.abroad[parseInt(sessionStorage.getItem('abroad'))].food[0] + eventjson[type][eventNum].msg["msg"];

             // ステータス変化の反映および表示
             var money = eventjson[type][eventNum].money;
             var sociability = eventjson[type][eventNum].sociability;
             var energy = eventjson[type][eventNum].energy;
             var specialty = eventjson[type][eventNum].specialty;
             var exp = eventjson[type][eventNum].exp;
             // セッションストレージに格納
             await setSessionStorage(money, sociability, energy, specialty, exp);
             // ステータス変化を表示
             var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
         
             setTimeout(function() {
               // 表示を変更
               displaySessionData();
             }, 1000);
         
             document.getElementById('statuschange').textContent = msg;
             console.log(msg);
            break;
          case "ソウルフードを食べる２":
             // ダイアログ表示
             document.getElementById('msg').textContent = abroadjson.abroad[parseInt(sessionStorage.getItem('abroad'))].food[1] + eventjson[type][eventNum].msg["msg"];

             // ステータス変化の反映および表示
             var money = eventjson[type][eventNum].money;
             var sociability = eventjson[type][eventNum].sociability;
             var energy = eventjson[type][eventNum].energy;
             var specialty = eventjson[type][eventNum].specialty;
             var exp = eventjson[type][eventNum].exp;
             // セッションストレージに格納
             await setSessionStorage(money, sociability, energy, specialty, exp);
             // ステータス変化を表示
             var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
         
             setTimeout(function() {
               // 表示を変更
               displaySessionData();
             }, 1000);
         
             document.getElementById('statuschange').textContent = msg;
             console.log(msg);
            break;
          case "ソウルフードを食べる３":
             // ダイアログ表示
             document.getElementById('msg').textContent = abroadjson.abroad[parseInt(sessionStorage.getItem('abroad'))].food[2] + eventjson[type][eventNum].msg["msg"];

             // ステータス変化の反映および表示
             var money = eventjson[type][eventNum].money;
             var sociability = eventjson[type][eventNum].sociability;
             var energy = eventjson[type][eventNum].energy;
             var specialty = eventjson[type][eventNum].specialty;
             var exp = eventjson[type][eventNum].exp;
             // セッションストレージに格納
             await setSessionStorage(money, sociability, energy, specialty, exp);
             // ステータス変化を表示
             var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
         
             setTimeout(function() {
               // 表示を変更
               displaySessionData();
             }, 1000);
         
             document.getElementById('statuschange').textContent = msg;
             console.log(msg);
            break;
          case "観光１":
             // ダイアログ表示
             document.getElementById('msg').textContent = abroadjson.abroad[parseInt(sessionStorage.getItem('abroad'))].sightseeing[0] + eventjson[type][eventNum].msg["msg"];

             // ステータス変化の反映および表示
             var money = eventjson[type][eventNum].money;
             var sociability = eventjson[type][eventNum].sociability;
             var energy = eventjson[type][eventNum].energy;
             var specialty = eventjson[type][eventNum].specialty;
             var exp = eventjson[type][eventNum].exp;
             // セッションストレージに格納
             await setSessionStorage(money, sociability, energy, specialty, exp);
             // ステータス変化を表示
             var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
         
             setTimeout(function() {
               // 表示を変更
               displaySessionData();
             }, 1000);
         
             document.getElementById('statuschange').textContent = msg;
             console.log(msg);
            break;
          case "観光２":
             // ダイアログ表示
             document.getElementById('msg').textContent = abroadjson.abroad[parseInt(sessionStorage.getItem('abroad'))].sightseeing[1] + eventjson[type][eventNum].msg["msg"];

             // ステータス変化の反映および表示
             var money = eventjson[type][eventNum].money;
             var sociability = eventjson[type][eventNum].sociability;
             var energy = eventjson[type][eventNum].energy;
             var specialty = eventjson[type][eventNum].specialty;
             var exp = eventjson[type][eventNum].exp;
             // セッションストレージに格納
             await setSessionStorage(money, sociability, energy, specialty, exp);
             // ステータス変化を表示
             var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
         
             setTimeout(function() {
               // 表示を変更
               displaySessionData();
             }, 1000);
         
             document.getElementById('statuschange').textContent = msg;
             console.log(msg);
            break;
          case "観光３":
             // ダイアログ表示
             document.getElementById('msg').textContent = abroadjson.abroad[parseInt(sessionStorage.getItem('abroad'))].sightseeing[2] + eventjson[type][eventNum].msg["msg"];

             // ステータス変化の反映および表示
             var money = eventjson[type][eventNum].money;
             var sociability = eventjson[type][eventNum].sociability;
             var energy = eventjson[type][eventNum].energy;
             var specialty = eventjson[type][eventNum].specialty;
             var exp = eventjson[type][eventNum].exp;
             // セッションストレージに格納
             await setSessionStorage(money, sociability, energy, specialty, exp);
             // ステータス変化を表示
             var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
         
             setTimeout(function() {
               // 表示を変更
               displaySessionData();
             }, 1000);
         
             document.getElementById('statuschange').textContent = msg;
             console.log(msg);
            break;
          case "観光４":
             // ダイアログ表示
             document.getElementById('msg').textContent = abroadjson.abroad[parseInt(sessionStorage.getItem('abroad'))].sightseeing[3] + eventjson[type][eventNum].msg["msg"];

             // ステータス変化の反映および表示
             var money = eventjson[type][eventNum].money;
             var sociability = eventjson[type][eventNum].sociability;
             var energy = eventjson[type][eventNum].energy;
             var specialty = eventjson[type][eventNum].specialty;
             var exp = eventjson[type][eventNum].exp;
             // セッションストレージに格納
             await setSessionStorage(money, sociability, energy, specialty, exp);
             // ステータス変化を表示
             var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
         
             setTimeout(function() {
               // 表示を変更
               displaySessionData();
             }, 1000);
         
             document.getElementById('statuschange').textContent = msg;
             console.log(msg);
            break;      
          default:
            // 特殊イベントではないもの
            // ダイアログ表示
            document.getElementById('msg').textContent = eventjson[type][eventNum].msg["msg"];

            // ステータス変化の反映および表示
            var money = eventjson[type][eventNum].money;
            var sociability = eventjson[type][eventNum].sociability;
            var energy = eventjson[type][eventNum].energy;
            var specialty = eventjson[type][eventNum].specialty;
            var exp = eventjson[type][eventNum].exp;
            // セッションストレージに格納
            await setSessionStorage(money, sociability, energy, specialty, exp);
            // ステータス変化を表示
            var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
        
            setTimeout(function() {
              // 表示を変更
              displaySessionData();
            }, 1000);
        
            document.getElementById('statuschange').textContent = msg;
            console.log(msg);
            break;
        }
      }
     
      resolve();
    })
    .catch(error => {
      console.error(error);
    });
  })
}

// 次のターンへ
async function nextTurn() {
  return new Promise(function(resolve) {
    var button = document.createElement('button');
    button.classList.add("gonextbtn");
    button.textContent = "ターン終了";
    document.body.appendChild(button);

    button.addEventListener('click', function() {
      document.body.removeChild(button);
      resolve();
    });
  })
}

// 結果画面へのボタン
async function goResult() {
  return new Promise(function(resolve) {
    var link = document.createElement('a');
    link.textContent = "結果画面へ";
    link.href = 'result.html';
    link.style.position = "fixed";
    link.style.top = "60%";
    link.style.left = "50%";
    link.style.transform = "translateX(-50%)";
    link.style.width = "350px";
    link.style.height = "100px";
    link.style.color = "#0a1a55";
    link.style.fontSize = "50px";
    link.style.textAlign = "center";
    link.style.justifySelf = "center";
    link.style.background = "#ffffff";
    link.style.borderRadius = "5px";

    var message = document.createElement("p");
    message.textContent = "ゲーム終了！";
    message.classList.add("endmsg");

    var overlay = document.createElement('div');
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";


    document.body.appendChild(overlay);
    document.body.appendChild(message);
    document.body.appendChild(link);
    resolve();
  })

}

async function finishCheck(){
  if(loc2 !== 144){
    await game();
  }else{
    if(onceFin === true){
      onceFin = false;
      socket.emit('finish',sessionStorage.getItem('name')+"ゲーム終了しました");
      socket.on('finish',() => {
          adjustment(); 
      });
    }
    sessionStorage.setItem('exp',parseInt(sessionStorage.getItem('exp'))+10);
    await turnChange();
  }
}

// 全員ゴールしているか判定
var loc1 = 0; // 現在地のクラス
var loc2 = 0; // 移動後のマスのクラス
var myTurn = 1;
var onceFin = true;

// 横国人生ゲーム
async function gameStart() {
  // ゲーム開始msg
  document.getElementById('msg').textContent = "ご入学おめでとうございます。大学生活を楽しんでください！";
  await startmsg();
  var icon = document.createElement("img");
  icon.classList.add("playicon");
  icon.id = "playicon";
  icon.src = "icon" + sessionStorage.getItem('icon') + ".png";
  icon.alt = "icon";
  document.getElementById("event1-0-1").appendChild(icon);

  socket.on('exp',(exp) =>{
    sessionStorage.setItem('oppoexp', exp);
  });

  if(sessionStorage.getItem('host') === '0'){
    /*socket.emit('turn', '相手のターン');
    socket.once('turnChange',(turn) =>{
      document.getElementById('msg').textContent = turn;
      game();
    });*/
    await turnChange();
  }else{
    await game();
  }
}
  async function game(){
    // ターンを表示
    document.getElementById('msg').textContent = sessionStorage.getItem('name') + "のターンです。";

    // 学部、サークル、バイトに応じたステータス変化
    await statuschange();

    // 各マップの終了地点にいたら次マップの開始地点へ
    if(loc2 === 50 || 81 || 112 || 157){
      switch(loc2){
      case 50:
       setActiveButton(1);
       await toMap2();
       await moveImage(loc2, loc2 + 1);
       sessionStorage.setItem('map', 2);
       break;
     case 81:
       setActiveButton(2);
        await toMap3();
        await moveImage(loc2, loc2 + 1);
        sessionStorage.setItem('map', 3);
        break;
      case 112:
        setActiveButton(3);
        await toMap4();
        await moveImage(loc2, loc2 + 1);
        sessionStorage.setItem('map', 4);
        break;
      case 157:
        sessionStorage.setItem('map', sessionStorage.getItem('exmap'));
        setActiveButton((parseInt(sessionStorage.getItem('map')) - 1));
        switch(sessionStorage.getItem('map')){
            case "1":
              toMap1();
              break;
            case "2":
              toMap2();
              break;
            case "3":
              toMap3();
              break;
            case "4":
              toMap4();
              break;
          }
          var image = document.getElementById("playicon");
          document.getElementsByClassName(loc2.toString())[0].removeChild(image);
          document.getElementsByClassName(sessionStorage.getItem('exgrid'))[0].appendChild(image);
          break;
      }
    }

    // ターン開始時に行動力がマイナスになっていないか確認、有償インターンまたは1回休みかどうか確認
    if(parseInt(sessionStorage.getItem('energy')) < 0)
    {

      //await statuschange();
      // 行動力がマイナスの場合
      // １ターン休みで行動力+60、所持金-20000, 社交性-20

      // ダイアログ表示
      document.getElementById('msg').innerHTML = "行動力が無くなってしまった、、。<br>１ターン休み。"

      // ステータス変化の反映および表示
      var money = -20000;
      var sociability = -20;
      var energy = 60;
      var specialty = 0;
      var exp = 0;
      // セッションストレージに格納
      await setSessionStorage(money, sociability, energy, specialty, exp);
      // ステータス変化を表示
      var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);
  
      setTimeout(function() {
        // 表示を変更
        displaySessionData();
      }, 1000);
  
      document.getElementById('statuschange').textContent = msg;
      console.log(msg);
    }
    else if(parseInt(sessionStorage.getItem('internship')) !== 0)
    {
      // 有償インターン中の場合
      // ダイアログ表示
      document.getElementById('msg').textContent = document.getElementById('msg').textContent + "有償インターン中だ。";

      // ステータス変化の反映および表示
      fetch('ptjob.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('ファイルの取得に失敗しました');
        }
        return response.json();
      })
      .then(async jsonData => {
        var money = jsonData.internship[0].money;
        var sociability = jsonData.internship[0].sociability;
        var energy = jsonData.internship[0].energy;
        var specialty = jsonData.internship[0].specialty;
        var exp = jsonData.internship[0].exp;
        // セッションストレージに格納
        await setSessionStorage(money, sociability, energy, specialty, exp);
        // ステータス変化を表示
        var msg = await makeStatusmsg(money, sociability, energy, specialty, exp);

        // インターンのターン数を減らす
        sessionStorage.setItem('internship', (parseInt(sessionStorage.getItem('internship')) - 1));
    
        setTimeout(function() {
          // 表示を変更
          displaySessionData();
        }, 1000);
    
        document.getElementById('statuschange').textContent = msg;
        console.log(msg);
      })
      .catch(error => {
        console.error('エラー:', error);
      });
    }
    else if(parseInt(sessionStorage.getItem('break')) !== 0)
    {
      // 休みの場合, break - 1
      sessionStorage.setItem('break', (parseInt(sessionStorage.getItem('break')) - 1));
      // ダイアログ表示
      document.getElementById('msg').textContent = document.getElementById('msg').textContent + "1回休み";
    }
    else
    {
      // 通常時
      // サイコロを振る
      var random;
      if(sessionStorage.getItem('map') === "5")
      {
        random = Math.floor(Math.random() * 3);
      }
      else
      {
        random = Math.floor(Math.random() * 6);
      }
      var dice = random + 1;
      console.log("dice:" + dice);
      await rollDice(random);

      // サイコロの目に応じてで移動
      var now = document.getElementById('playicon').parentNode.className;
      var array = now.split(" ");
      loc1 = parseInt(array[1]); 
      loc2 = loc1 + dice; 
      const stop = [22, 30, 42, 44, 50, 61, 66, 76, 81, 92, 97, 107, 112, 118, 123, 128, 138, 143, 144, 157];
      for(let i = 0; i < stop.length; i++)
      {
        if(loc1 < stop[i] && loc2 > stop[i])
        {
          loc2 = stop[i];
        }
      }
      console.log("." + loc1.toString() + ", ." + loc2.toString());
      await moveImage(loc1, loc2);

      // 各マスのイベント
      await doEvent(loc2);
    }

    // ターン終了ボタン
    await nextTurn();
    //await finishCheck();
    await turnChange();
  }

  async function turnChange(){
    socket.emit('turn', sessionStorage.getItem('host')+'のターンになったら呼んでくれ');
    socket.once('turnChange',(turn) =>{
      document.getElementById('msg').textContent = turn;
      finishCheck();
    });
  }

  async function adjustment(){
  // ゴール時に所持金清算
  if(parseInt(sessionStorage.getItem('money')) < 0)
  {
    while(parseInt(sessionStorage.getItem('money')) < 0)
    {
      sessionStorage.setItem('exp', (parseInt(sessionStorage.getItem('exp')) - 10));
      sessionStorage.setItem('money', (parseInt(sessionStorage.getItem('money')) + 50000));
    }
  }
  // 結果画面へのボタン表示
  socket.emit('conclusion',sessionStorage.getItem('exp'));
  await goResult();
}




// 人生ゲーム実行
gameStart();