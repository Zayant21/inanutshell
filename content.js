
const man_nutshell = /^\$man nshell;$/;
const nutshell = /\$nshell\s+([^;-]+)\s*;/;
const nutshell_s = /\$nshell\s+-s\s+([^;]+)\s*;/;
const nutshell_lc = /^\$nshell\s+-lc\s+([^;]+);\s*$/ ;
const nutshell_sum = /^\$nshell\s+-sum;\s*$/;
const nutshell_version = /^\$nshell\s+-v;\s*$/;

const currentversion = 'v1.0.0'
const man = 
`NAME 
in-a-nutshell - Chrome extension that uses ChatGPT to provide assistance inside webpages
SYNOPSIS
$nshell 'user prompt';
$nshell -s 'user prompt';
$nshell -lc 'user prompt';
$nshell -sum;
$nshell -v;`;

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
  
  if (event.target.textContent.startsWith('$nshell')){
    const match = event.target.textContent.match(nutshell);
    if (match) {
      const command = match[1].trim();
      console.log(`Command: ${command}`);
      chrome.runtime.sendMessage({text: 'ns',command: command }, function(response) {

      });
    }
    else {
      console.error('invalid $nshell command');
    }
  }

  if (event.target.textContent.startsWith('$nshell -')) {
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
      console.error('invalid $nshell -command');
    }
  }
  if (event.target.textContent.startsWith('$man nshell;')){
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
  
      if (event.target.value.startsWith('$nshell')){
        const match = event.target.value.match(nutshell);
        if (match) {
          const command = match[1].trim();
          console.log(`Command: ${command}`);
          chrome.runtime.sendMessage({text: 'ns',command: command }, function(response) {
    
          });
        }
        else {
          console.error('invalid $nshell command');
        }
      }
    
      if (event.target.value.startsWith('$nshell -')) {
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
          console.error('invalid $nshell -command');
        }
      }
      if (event.target.value.startsWith('$man nshell;')){
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