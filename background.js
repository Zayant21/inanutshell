const dotenv = require('dotenv');
dotenv.config(); // load environment variables from .env file
const apiKey = process.env.API_KEY; // access API key from environment variable
 
 chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.enabled === true) {
//   chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     if (changeInfo.status == 'complete') {
//       chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         var activeTab = tabs[0];
//         if (activeTab && activeTab.url && activeTab.url.indexOf('http') == 0) {
//           chrome.tabs.executeScript(null, {file: 'content.js'}, function() {
//             chrome.tabs.sendMessage(activeTab.id, {text: 'get_content'}, function(response) {
//               if (response) {
//                 console.log(response)
//               }
//             });
//           });
//         }
//       });
//     }
//   });

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message.command)
    if (message.text == 'help_s') {
      const command = message.command;
      const url = 'https://api.openai.com/v1/chat/completions';
      const GPTresponse = {
        'model': 'gpt-3.5-turbo',
        'messages': [{'role': 'user', 'content': `${command} `}],
       'max_tokens': 50,
       'temperature': 0.2,
       'stop': null
     };
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${current.env.API_KEY}`,
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
      .catch(error => console.log(error));

    }
    else if (message.text == 'help') {
      const command = message.command;
      let responses = `An explanation of ${command}`;
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {text: 'update_input', value: responses});
      });
    }
  });


      // Add a click event listener to the "Summarize" button
  // document.getElementById('summarize').addEventListener('click', function() {
  //       // Send a message to the content script to summarize the page
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     var activeTab = tabs[0];
  //     chrome.tabs.sendMessage(activeTab.id, {text: 'summarize'});
  //   });
  // });
   }

 else {
   console.log("Toggle is off")
 }

 });