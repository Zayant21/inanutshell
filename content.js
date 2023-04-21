console.log('test')

document.addEventListener('keydown', function(event) {
  if (event.key === 'help' && event.ctrlKey) {
    chrome.runtime.sendMessage({text: 'help'}, function(response) {



    });
  }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.text == 'get_content') {
    var content = document.body.innerText;
    sendResponse({content: content});
    console.log('2nd message being sent')
  }
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.text == 'summarize') {
    console.log('got summarize content js')
  }
});