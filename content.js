
const man_nutshell = /^\$man nutshell;$/;
const nutshell = /\$nutshell\s+([^;-]+)\s*;/;
const nutshell_s = /\$nutshell\s+-s\s+([^;]+)\s*;/;
const nutshell_lc = /^\$nutshell\s+-lc\s+([^;]+);\s*$/ ;
const nutshell_sum = /^\$nutshell\s+-sum;\s*$/;
const nutshell_version = /^\$nutshell\s+-v;\s*$/;

const currentversion = 'v1.0.0'
const man = 
`NAME 
in-a-nutshell - Chrome extension that uses ChatGPT to provide assistance inside webpages
SYNOPSIS
$nutshell 'user prompt';
$nutshell -s 'user prompt';
$nutshell -lc 'user prompt';
$nutshell -sum;
$nutshell -v;`;

let toggleState = true;



chrome.storage.sync.get("toggleState", function (data) {
  if (data.toggleState != undefined) {
    toggleState = data.toggleState;
    updateContent();
  }
});

function updateContent() {
  if (toggleState) {

document.addEventListener("input", function(event) {
  
  if (event.target.textContent.startsWith('$nutshell')){
    const match = event.target.textContent.match(nutshell);
    if (match) {
      const command = match[1].trim();
      console.log(`Command: ${command}`);
      chrome.runtime.sendMessage({text: 'ns',command: command }, function(response) {

      });
    }
    else {
      console.error('invalid $nutshell command');
    }
  }

  if (event.target.textContent.startsWith('$nutshell -')) {
    const match_s = event.target.textContent.match(nutshell_s);
    const match_lc = event.target.textContent.match(nutshell_lc);
    const match_sum = event.target.textContent.match(nutshell_sum);
    const match_version = event.target.textContent.match(nutshell_version);
    
    
    if (match_s) {
      const command = match_s[1].trim();
      console.log(`Command: ${command}`);
      chrome.runtime.sendMessage({text: 'ns_s',command: command }, function(response) {
      });
    }

    if (match_lc) {
      const command = match_lc[1].trim();
      console.log(`Command: ${command}`);
      var headings = document.querySelectorAll('h1');
      var paragraphs = document.querySelectorAll('p');
      var rawData = "";
      for (var i = 0; i < headings.length; i++) {
      rawData += headings[i].textContent;
      }
      for (var j = 0; j < paragraphs.length; j++) {
      rawData += paragraphs[j].textContent ;
      }
      if (rawData){
      const combined = `${command} ${rawData}`.replace(new RegExp(`(${command}|${rawData})`, 'gi'), '').trim();
      chrome.runtime.sendMessage({text: 'ns_lc',command: command, rawData: combined}, function(response) {
      });
    }
    else{
      console.error('Cant find any content data!')
    }
    }

    if (match_sum) {
      console.log(`Command: -sum`);
      var headings = document.querySelectorAll('h1');
      var paragraphs = document.querySelectorAll('p');
      var rawData = "";
      for (var i = 0; i < headings.length; i++) {
      rawData += headings[i].textContent;
      }
      for (var j = 0; j < paragraphs.length; j++) {
      rawData += paragraphs[j].textContent ;
      }
      if (rawData){
      chrome.runtime.sendMessage({text: 'ns_sum', rawData: rawData}, function(response) {
      });
    }
    else{
      console.error('Cant find any content data!')
    }
    }

    if (match_version) {
      document.activeElement.textContent = currentversion;
      }
    

    else {
      console.error('invalid $nutshell -command');
    }
  }
  if (event.target.textContent.startsWith('$man nutshell;')){
    document.activeElement.textContent = man;
  }
  
  else {
    console.error('invalid command');
  }
});


  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.text == 'update_input') {
      document.activeElement.textContent = message.value;
}
});
} else {
    document.addEventListener("input", function(event) {
  
      if (event.target.value.startsWith('$nutshell')){
        const match = event.target.value.match(nutshell);
        if (match) {
          const command = match[1].trim();
          console.log(`Command: ${command}`);
          chrome.runtime.sendMessage({text: 'ns',command: command }, function(response) {
    
          });
        }
        else {
          console.error('invalid $nutshell command');
        }
      }
    
      if (event.target.value.startsWith('$nutshell -')) {
        const match_s = event.target.value.match(nutshell_s);
        const match_lc = event.target.value.match(nutshell_lc);
        const match_sum = event.target.value.match(nutshell_sum);
        const match_version = event.target.value.match(nutshell_version);
        
        
        if (match_s) {
          const command = match_s[1].trim();
          console.log(`Command: ${command}`);
          chrome.runtime.sendMessage({text: 'ns_s',command: command }, function(response) {
          });
        }
    
        if (match_lc) {
          const command = match_lc[1].trim();
          console.log(`Command: ${command}`);
          var headings = document.querySelectorAll('h1');
          var paragraphs = document.querySelectorAll('p');
          var rawData = "";
          for (var i = 0; i < headings.length; i++) {
          rawData += headings[i].value;
          }
          for (var j = 0; j < paragraphs.length; j++) {
          rawData += paragraphs[j].value ;
          }
          if (rawData){
          const combined = `${command} ${rawData}`.replace(new RegExp(`(${command}|${rawData})`, 'gi'), '').trim();
          chrome.runtime.sendMessage({text: 'ns_lc',command: command, rawData: combined}, function(response) {
          });
        }
        else{
          console.error('Cant find any content data!')
        }
        }
    
        if (match_sum) {
          console.log(`Command: -sum`);
          var headings = document.querySelectorAll('h1');
          var paragraphs = document.querySelectorAll('p');
          var rawData = "";
          for (var i = 0; i < headings.length; i++) {
          rawData += headings[i].value;
          }
          for (var j = 0; j < paragraphs.length; j++) {
          rawData += paragraphs[j].value ;
          }
          if (rawData){
          chrome.runtime.sendMessage({text: 'ns_sum', rawData: rawData}, function(response) {
          });
        }
        else{
          console.error('Cant find any content data!')
        }
        }
    
        if (match_version) {
          document.activeElement.value = currentversion;
          }
        
    
        else {
          console.error('invalid $nutshell -command');
        }
      }
      if (event.target.value.startsWith('$man nutshell;')){
        document.activeElement.value = man;
      }
      
      else {
        console.error('invalid command');
      }
    });
    
    
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      if (message.text == 'update_input') {
        document.activeElement.value = message.value;
  }
  });
  
}
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let key in changes) {
    if (key === "toggleState") {
      toggleState = changes[key].newValue;
      updateContent();
    }
  }
})