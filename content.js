console.log('test')

document.addEventListener("input", function(event) {
  if (event.target.value.startsWith('::help'))  {
    var activevalue = document.activeElement.value;
    console.log('Help key was pressed!');
    chrome.runtime.sendMessage({text: 'help'}, function(response) {

    });
  }
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.text == 'update_input') {
    document.activeElement.value = message.value;
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