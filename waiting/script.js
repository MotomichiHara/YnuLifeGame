document.getElementById('first').textContent = sessionStorage.getItem('name');

function showVerticalTabs() {
    var popupOverlay = document.getElementById("popup-overlay");
    popupOverlay.style.display = "flex";
  }
  
  function closePopup() {
    var popupOverlay = document.getElementById("popup-overlay");
    popupOverlay.style.display = "none";
  }