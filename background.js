const API_KEY = ``;

let toggleextention = true;

chrome.storage.sync.get("toggleextention", function (data) {
  if (data.toggleextention != undefined) {
    toggleextention = data.toggleextention;
    updateContent();
  }
});
function updateContent() {
  if (toggleextention) {

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.text == 'ns') {
      const command = message.command;
      const url = 'https://api.openai.com/v1/chat/completions';
      const GPTresponse = {
        'model': 'gpt-3.5-turbo',
        'messages': [{'role': 'user', 'content': `${command} `}],
       'max_tokens': 1333,
       'temperature': 0.5,
       'stop': null
     };
     const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    };
     fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(GPTresponse)
    })
    .then(response => response.json())
    .then(GPTresponse => {
      const text = GPTresponse.choices[0].message.content.trim();
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {text: 'update_input', value: text});
      });
    })
    .catch(error => chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {text: 'update_input', value: {error: error.message}});
    }) );
    }

     if (message.text == 'ns_s') {
      const command = message.command;
      const url = 'https://api.openai.com/v1/chat/completions';
      const GPTresponse = {
        'model': 'gpt-3.5-turbo',
        'messages': [{'role': 'user', 'content': `Summarize Shortly: ${command} `}],
       'max_tokens': 100,
       'temperature': 0.5,
       'stop': null
     };
     const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    };
     fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(GPTresponse)
    })
    .then(response => response.json())
    .then(GPTresponse => {
      const text = GPTresponse.choices[0].message.content.trim();
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {text: 'update_input', value: text});
      });
    })
    .catch(error => chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {text: 'update_input', value: {error: error.message}});
    }) );
    }

     if (message.text == 'ns_lc') {
      const command = message.command;
      const webContent = message.rawData;
      console.log(command)
      console.log(webContent)
                const url = 'https://api.openai.com/v1/chat/completions';
                const GPTresponse = {
                  'model': 'gpt-3.5-turbo',
                  'messages': [{'role': 'user', 'content': `given this content: ${webContent}, Answer:${command} `}],
                'max_tokens': 100,
                'temperature': 0.5,
                'stop': null
                };
                const headers = {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${API_KEY}`
                };
                fetch(url, {
                  method: 'POST',
                  headers: headers,
                  body: JSON.stringify(GPTresponse)
                })
                .then(response => response.json())
                .then(GPTresponse => {
                  const text = GPTresponse.choices[0].message.content.trim();
                  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {text: 'update_input', value: text});
                  });
                })
                .catch(error => chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                  chrome.tabs.sendMessage(tabs[0].id, {text: 'update_input', value: {error: error.message}});
                }) );

    }

     if (message.text == 'ns_sum') {
      const webContent = message.rawData;
                const url = 'https://api.openai.com/v1/chat/completions';
                const GPTresponse = {
                  'model': 'gpt-3.5-turbo',
                  'messages': [{'role': 'user', 'content': `summarize the webpage with following content: ${webContent} `}],
                'max_tokens': 1333,
                'temperature': 0.5,
                'stop': null
                };
                const headers = {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${API_KEY}`
                };
                fetch(url, {
                  method: 'POST',
                  headers: headers,
                  body: JSON.stringify(GPTresponse)
                })
                .then(response => response.json())
                .then(GPTresponse => {
                  const text = GPTresponse.choices[0].message.content.trim();
                  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {text: 'update_input', value: text});
                  });
                })
                .catch(error => chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                  chrome.tabs.sendMessage(tabs[0].id, {text: 'update_input', value: {error: error.message}});
                }) );
    }
  
  });
} else {
  console.log("extention is off !!")
}
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let key in changes) {
    if (key === "toggleextention") {
      toggleextention = changes[key].newValue;
      updateContent();
    }
  }
});
