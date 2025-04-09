document.getElementById('name1').textContent = sessionStorage.getItem('name');
document.getElementById('score1').textContent = sessionStorage.getItem('exp');

// セッションストレージをクリア
document.querySelector('a').addEventListener('click', function(event) {
    event.preventDefault();
    sessionStorage.clear();
    window.location.href = event.target.href;
});

function showVerticalTabs() {
    var popupOverlay = document.getElementById("popup-overlay");
    popupOverlay.style.display = "flex";
  }
  
  function closePopup() {
    var popupOverlay = document.getElementById("popup-overlay");
    popupOverlay.style.display = "none";
  }