
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.enabled === true) {
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        if (activeTab && activeTab.url && activeTab.url.indexOf('http') == 0) {
          chrome.tabs.executeScript(null, {file: 'content.js'}, function() {
            chrome.tabs.sendMessage(activeTab.id, {text: 'get_content'}, function(response) {
              if (response) {
                console.log(response)
              }
            });
          });
        }
      });
    }
  });

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message.command)
    if (message.text == 'help_s') {
      const command = message.command;
      const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';
      const data = {
        'prompt': `A short explanation of ${command}`,
        'max_tokens': 60,
        'temperature': 0.3,
        'stop': null
      };
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`,
      };
  
      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        const text = data.choices[0].text.trim();
        console.log(text);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {text: 'update_input', value: text});
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    }
    else if (message.text == 'help') {
      const command = message.command;
      console.log('1st')
      let responses = `An explanation of ${command}`;
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {text: 'update_input', value: responses});
      });
    }
  });


      // Add a click event listener to the "Summarize" button
  document.getElementById('summarize').addEventListener('click', function() {
        // Send a message to the content script to summarize the page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {text: 'summarize'});
    });
  });
  }

else {
  console.log("Toggle is off")
}

});