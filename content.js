
document.addEventListener('keydown', function(event) {
  if (event.key === 'help' && event.ctrlKey) {
    chrome.runtime.sendMessage({text: 'help'}, function(response) {
      // Handle the response from the popup script
    });
  }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.text == 'get_content') {
    var content = document.body.innerText;
    sendResponse({content: content});
    console.log('message being sent')
  }
});