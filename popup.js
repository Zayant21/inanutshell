// Get the toggle checkbox and the summarize button
const toggle = document.getElementById("toggle");
const summarizeBtn = document.getElementById("summarize");

// Listen to the toggle checkbox onchange event
toggle.onchange = function() {
  if (toggle.checked) {
    // If the checkbox is checked, enable the summarize button and save the state
    summarizeBtn.disabled = false;
    chrome.storage.sync.set({ enabled: true });
    chrome.runtime.sendMessage({ enabled: true });
  } else {
    // If the checkbox is not checked, disable the summarize button and save the state
    summarizeBtn.disabled = true;
    chrome.storage.sync.set({ enabled: false });
  }
};

// Get the saved state from the storage and set the toggle checkbox and the summarize button accordingly
chrome.storage.sync.get("enabled", function(data) {
  if (data.enabled !== undefined) {
    toggle.checked = data.enabled;
    summarizeBtn.disabled = !data.enabled;
  } else {
    toggle.checked = true;
  }
});
