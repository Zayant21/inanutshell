import { config } from "dotenv";
config()

import { Configuration, OpenAIApi } from "openai";
import readline from "readline";


const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}))

const userIterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

userIterface.prompt()

openai.createChatCompletion({
    model: "gpt-3.5-turbo"

})

console.log(process.env.API_KEY)


