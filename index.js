require('dotenv').config();

const { Client, Events, GatewayIntentBits } = require('discord.js');
const {token} = require('./config.json');
const commandController = require('./controllers/commandController.js');
const lolSheduler = require('./schedulers/lolScheduler.js');
const valScheduler = require('./schedulers/valScheduler.js');
// 새로운 client 인스턴스 생성
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
commandController.setupCommand(client);
commandController.setupCommandHandler(client);
lolSheduler(client);
valScheduler(client);
// 성공적으로 로그인 후 준비 상태가 되었을 때 발생하는 이벤트
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
})

// 토큰을 통한 로그인
client.login(token);