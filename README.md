

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)




![logo](https://github.com/Zayant21/inanutshell/blob/master/nutshell.png?raw=true)
# In a Nutshell

"In a Nutshell" is a Chrome extension uses the ChatGPT to provide assistance inside webpages. It provides several commands that can be used to get responses from the ChatGPT model.

## Usage

**```$man nutshell;```**: Displays the manual for the "In a Nutshell" extension commands.

**```$nutshell 'user prompt';```**: Returns a response message consisting of 0-400 tokens. The prompt is the user text.

**```$nutshell -s 'user prompt';```**: Returns a brief response message consisting of 0-100 tokens. The prompt is the user text.

**```$nutshell -lc 'user prompt';```**: Returns a response message consisting of 0-4096 tokens. The prompt is the webpage context + user text.

**```$nutshell -sum;```**: Returns a summarized response message consisting of 0-500 tokens. The prompt is the webpage context.

**```$nutshell -v;```**: Returns the version of the "In a Nutshell" extension.

## Examples
```$nutshell What is the capital of France?;```: Returns a response message with information about Paris.

```$nutshell -s What is the meaning of life?;```: Returns a brief response message with a philosophical answer.

```$nutshell -lc https://en.wikipedia.org/wiki/Artificial_intelligence What is AI?;```: Returns a response message with information about AI, using the context of the provided webpage.

```$nutshell -sum;```: Returns a summarized response message about the current webpage.

```$nutshell -v;```: Returns the current version of the "In a Nutshell" extension.
## Features
In **```Input```** mode, the extension is able to work with native DOM elements within the current webpage. This means that the extension can access and manipulate the content of the webpage in real time. The user can enter a prompt and receive a response from the ChatGPT model based on the content of the webpage.

in **```iframe mode```**, the extension is able to work with embedded documents that have different URL sources from the current webpage. This means that the extension can access and manipulate the content of the embedded documents in real time. The user can enter a prompt and receive a response from the ChatGPT model based on the content of the embedded document.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`


## Author
- [Zayan Tofeeq](https://www.github.com/Zayant21)
## 🚀 About Me
I love to make cool stuff. wanna support me [click here](https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley) .
