const nutshell = /\$nutshell\s+([^;]+)\s*;/;
const nutshell_s = /\$nutshell\s+-s\s+([^;]+)\s*;/;


document.addEventListener("input", function(event) {
  if (event.target.value.startsWith('$nutshell')) {
    const match_s = event.target.value.match(nutshell_s);
    const match = event.target.value.match(nutshell);
    if (match_s) {
      const command = match_s[1].trim();
      console.log(`Command: ${command}`);
      chrome.runtime.sendMessage({text: 'help_s',command: command }, function(response) {
      });
    } else if (match) {
      const command = match[1].trim();
      console.log(`Command: ${command}`);
      chrome.runtime.sendMessage({text: 'help',command: command }, function(response) {

      });
    }
    else {
      console.error('Extension context is invalid');
    }
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


