let toggleState = true;
let toggleextention = true;


chrome.storage.sync.get("toggleState", function (data) {
  if (data.toggleState != undefined) {
    toggleState = data.toggleState;
    updateButton_();
  }
});

function updateButton_() {
  const button = document.getElementById("toggle-button");
  if (toggleState) {
    button.textContent = "Input";
    button.style.backgroundColor = "#50C878";
  } else {
    button.textContent = "iFrame";
    button.style.backgroundColor = "#00A6F8";
  }
}

document.getElementById("toggle-button").addEventListener("click", function () {
  toggleState = !toggleState;
  chrome.storage.sync.set({ toggleState: toggleState }, function () {
    updateButton_();
  });
});

chrome.storage.sync.get("toggleextention", function (data) {
  if (data.toggleextention != undefined) {
    toggleextention = data.toggleextention;
    updateButton();
  }
});

function updateButton() {
  const button = document.getElementById("api-toggle");
  if (toggleextention) {
    button.textContent = "On";
    button.style.backgroundColor = "#008CBA";
  } else {
    button.textContent = "Off";
    button.style.backgroundColor = "#555";
  }
}

document.getElementById("api-toggle").addEventListener("click", function () {
  toggleextention = !toggleextention;
  chrome.storage.sync.set({ toggleextention: toggleextention }, function () {
    updateButton();
  });
});

