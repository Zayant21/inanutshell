
//const man_nutshell = /.*::man ns;.*/;
const nutshell = /.*::ns\s+([^;-]+)\s*;.*/;
const nutshell_s = /.*::ns\s+-s\s+([^;]+)\s*;.*/;
const nutshell_lc = /.*::ns\s+-lc\s+([^;]+);\s*.*/;
const nutshell_sum = /.*\s*::ns\s+-sum;\s*.*/;
const nutshell_version = /::ns\s+-v;/;

const man_nutshell_match = /::man ns;/;
const nutshell_match = /\::ns\s+([^;-]+)\s*;/;
const nutshell_s_match = /\::ns\s+-s\s+([^;]+)\s*;/;
const nutshell_lc_match = /\::ns\s+-lc\s+([^;]+)\s*;/;
const nutshell_sum_match = /::ns\s+-sum;/;
const nutshell_version_match = /::ns\s+-v;/;

const currentversion = 'v 1.0.0'
const man = 
`NAME 
in-a-nutshell - Chrome extension that uses ChatGPT to provide assistance inside webpages
SYNOPSIS
::ns 'user prompt';
::ns -s 'user prompt';
::ns -lc 'user prompt';
::ns -sum;
::ns -v;`;

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
  
  if (event.target.textContent.includes('::ns')){
    const match = event.target.textContent.match(nutshell);
    if (match) {
      const command = match[1].trim();
      console.log(`Command: ${command}`);
      chrome.runtime.sendMessage({text: 'ns',command: command }, function(response) {

      });
    }
    else {
      console.error('invalid ::ns command');
    }
  }

  if (event.target.textContent.includes('::ns -')) {
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
      var title = document.querySelectorAll('title');
      var headings = document.querySelectorAll('h1')||document.querySelectorAll('h2');
      var paragraphs = document.querySelectorAll('p');
      var rawData = "";
      for (var i = 0; i < title.length; i++) {
        rawData += `Title: ${title[i].innerText}`;
        }
      for (var i = 0; i < headings.length; i++) {
      rawData += `Heading: ${headings[i].innerText}`;
      }
      for (var i = 0; i < paragraphs.length; i++) {
      rawData += paragraphs[i].innerText ;
      }
      if (rawData){
      const combined = `${command} ${rawData}`.replace(new RegExp(`(${command}|${rawData})`, 'gi'), '').trim();
      chrome.runtime.sendMessage({text: 'ns_lc',command: command, rawData: combined}, function(response) {
      });
    }
    else{
      var errorstr= 'Cant find any useful content on the website!';
      console.error(errorstr)
      const textContent = document.activeElement.textContent.replace(nutshell_lc_match, errorstr);
      document.activeElement.textContent = textContent;
    }
    }

    if (match_sum) {
      console.log(`Command is sum`);
      var title = document.querySelectorAll('title');
      var headings = document.querySelectorAll('h1')||document.querySelectorAll('h2');
      var paragraphs = document.querySelectorAll('p');
      var rawData = "";
      for (var i = 0; i < title.length; i++) {
        rawData += `Title: ${title[i].innerText}`;
        }
      for (var i = 0; i < headings.length; i++) {
      rawData += `Heading: ${headings[i].innerText}`;
      }
      for (var i = 0; i < paragraphs.length; i++) {
      rawData += paragraphs[i].innerText ;
      }
      if (rawData){
      chrome.runtime.sendMessage({text: 'ns_sum', rawData: rawData}, function(response) {
      });
    }
    else{
      var errorstr= 'Cant find any useful content on the website!';
      console.error(errorstr)
      const textContent = document.activeElement.textContent.replace(nutshell_sum_match, errorstr);
      document.activeElement.textContent = textContent;
    }
    }

    if (match_version) {
      const textContent = document.activeElement.textContent.replace(nutshell_version_match, currentversion);
      document.activeElement.textContent = textContent;
      }
      
    else {
      console.error('invalid ::ns -command');
    }
  }
  if (event.target.textContent.includes('::man ns;')){
    const textContent = document.activeElement.textContent.replace(man_nutshell_match, man);
    document.activeElement.textContent = textContent;
  }
  
  else {
    console.error('invalid command');
  }
});


  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.text == 'update_input') {
      console.log( document.activeElement.textContent)
      const textContent = document.activeElement.textContent.replace(nutshell_match, message.value).replace(nutshell_s_match, message.value)
                                        .replace(nutshell_lc_match, message.value).replace(nutshell_sum_match, message.value);
                                        console.log(textContent)
      document.activeElement.textContent = textContent;
}
});
} else {
    document.addEventListener("input", function(event) {
  
      if (event.target.value.includes('::ns')){
        const match = event.target.value.match(nutshell);
        if (match) {
          const command = match[1].trim();
          console.log(`Command: ${command}`);
          chrome.runtime.sendMessage({text: 'ns',command: command }, function(response) {
    
          });
        }
        else {
          console.error('invalid ::ns command');
        }
      }
    
      if (event.target.value.includes('::ns -')) {
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
          var title = document.querySelectorAll('title');
          var headings = document.querySelectorAll('h1')||document.querySelectorAll('h2');
          var paragraphs = document.querySelectorAll('p');
          var rawData = "";
          for (var i = 0; i < title.length; i++) {
            rawData += `Title: ${title[i].innerText}`;
            }
          for (var i = 0; i < headings.length; i++) {
          rawData += `Heading: ${headings[i].innerText}`;
          }
          for (var i = 0; i < paragraphs.length; i++) {
          rawData += paragraphs[i].innerText ;
          }
          if (rawData){
          const combined = `${command} ${rawData}`.replace(new RegExp(`(${command}|${rawData})`, 'gi'), '').trim();
          chrome.runtime.sendMessage({text: 'ns_lc',command: command, rawData: combined}, function(response) {
          });
        }
        else{
          var errorstr= 'Cant find any useful content on the website!';
          console.error(errorstr)
          const value = document.activeElement.value.replace(nutshell_lc_match, errorstr);
          document.activeElement.value = value;
        }
        }
    
        if (match_sum) {
          console.log(`Command is sum`);
          var title = document.querySelectorAll('title');
          var headings = document.querySelectorAll('h1')||document.querySelectorAll('h2');
          var paragraphs = document.querySelectorAll('p');
          var rawData = "";
          for (var i = 0; i < title.length; i++) {
            rawData += `Title: ${title[i].innerText}`;
            }
          for (var i = 0; i < headings.length; i++) {
          rawData += `Heading: ${headings[i].innerText}`;
          }
          for (var i = 0; i < paragraphs.length; i++) {
          rawData += paragraphs[i].innerText ;
          }
        if(rawData){
          chrome.runtime.sendMessage({text: 'ns_sum', rawData: rawData}, function(response) {
          });
        }
        else{
          var errorstr = 'Cant find any useful content on the website!';
          const value = document.activeElement.value.replace(nutshell_sum_match, errorstr);
          document.activeElement.value = value;
        }
        }
    
        if (match_version) {
          const value = document.activeElement.value.replace(nutshell_version_match, currentversion);
          document.activeElement.value = value;
          }
        
        else {
          console.error('invalid ::ns -command');
        }
      }
      if (event.target.value.includes('::man ns;')){
        const value = document.activeElement.value.replace(man_nutshell_match, man);
        document.activeElement.value = value;
      }
      
      else {
        console.error('invalid command');
      }
    });
    
    
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      if (message.text == 'update_input') {
        const value = document.activeElement.value.replace(nutshell_match, message.value).replace(nutshell_s_match, message.value)
                                          .replace(nutshell_lc_match, message.value).replace(nutshell_sum_match, message.value);
        document.activeElement.value = value;
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