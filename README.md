

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)




![logo](https://github.com/Zayant21/inanutshell/blob/master/nutshell.png?raw=true)
# In a Nutshell

"In a Nutshell" is a Chrome extension uses the ChatGPT to provide assistance inside webpages. It provides several commands that can be used to get responses from the ChatGPT model.

## Usage

**```::man ns;```**: Displays the manual for the "In a Nutshell" extension commands.

**```::ns 'user prompt';```**: Returns a response message to user prompt. The prompt is the user text with the cap limit of 1000 words.

**```::ns -s 'user prompt';```**: Returns a brief response message to user promt. The prompt is the user text with the cap limit of 75 words.

**```::ns -lc 'user prompt';```**: Returns a response message to user prompt based on webpage context. The prompt is the user text with the cap limit of 75 words.

**```::ns -sum;```**: Returns a summarized response message of webpage context. The prompt is the webpage context which is limited to 1000 words.

**```::ns -v;```**: Returns the version of the "In a Nutshell" extension.

## Examples
```::ns What is the capital of France?;```: Returns a response message with information about Paris.

```::ns -s What is the meaning of life?;```: Returns a brief response message with a philosophical answer.

```::ns -lc https://en.wikipedia.org/wiki/Artificial_intelligence What is AI?;```: Returns a response message with information about AI, using the context of the provided webpage.

```::ns -sum;```: Returns a summarized response message about the current webpage.

```::ns -v;```: Returns the current version of the "In a Nutshell" extension.

![example](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTVhMmVkMGM5MGZhMTZhM2U5NGUxZjIxZDY2MWY2MDg0ZDU0ZTA2MiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/TeEyWvTRAnVFeE2PJL/giphy.gif)


## Features
 In **```Input```** mode, the extension is able to work with native DOM elements within the current webpage. This means that the extension can access and manipulate the content of the webpage in real time. The user can enter a prompt and receive a response from the ChatGPT model based on the content of the webpage.

 In **```iframe```** mode, the extension is able to work with embedded documents that have different URL sources from the current webpage. This means that the extension can access and manipulate the content of the embedded documents in real time. The user can enter a prompt and receive a response from the ChatGPT model based on the content of the embedded document.

 **``` command recoganitaion/parsing```** works with all commands, which allow the commands to execute irrespetive of text before or after as long as the prompt syntax matches the command syntax. The resulting reponse will replace the command prompt without harming the text outside of the prompt.

```for example```

**``` 'any text ::ns 'user prompt'; any text'```** will result **```any text `response message` any text```**

**``` '::ns 'user prompt'; any text'```** will result **``` `response message` any text```**

## Requirments

To run this project, you will need to add the following variables to your background.js file. To learn more about [API_KEY](https://platform.openai.com/docs/api-reference/introduction)

`API_KEY` 


## Author
- [Zayan Tofeeq](https://www.github.com/Zayant21)
## 🚀 About Me
I love to make cool stuff. wanna support me [click here](https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley).
