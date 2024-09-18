const { App } = require("@slack/bolt");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
});

app.command("/hello", async({ command, ack, say }) => {
    await ack();
    await say(`Hello, <@${command.user_id}>`);
});

app.command("/say_name", async({ command, ack, say }) => {
    await ack();
    const name = command.text;
    await say(`Hello, your name is ${name}`);
});

app.command("/add_numbers", async({ command, ack, say }) => {
    await ack();
    const numbers = command.text.split(" ");
    const sum = numbers.reduce((acc, num) => acc + parseInt(num), 0);
    await say(`The sum of the numbers is ${sum}`);
});

app.command("/random_quote", async({ command, ack, say }) => {
    await ack();
    const quotes = await fetch("https://swapi.dev/api/people");
    const response = await quotes.json();

    const randomIndex = Math.floor(Math.random() * response.results.length);
    const randomQuote = response.results[randomIndex].name;

    await say(randomQuote);
});

(async() => {
    await app.start(PORT);
    console.log(`⚡️ Bolt app is running on port ${PORT}!`);
})();