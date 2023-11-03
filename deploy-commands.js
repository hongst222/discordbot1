const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json')
const fs = require('node:fs');
const path = require('node:path');

const commands = [];


// commands 폴더 경로
// /commands
const foldersPath = path.join(__dirname, 'commands');
// info,utility
const commandsFolders = fs.readdirSync(foldersPath);

for (const folder of commandsFolders) {
    // '/commands/info' or '/commands/utility'
    const commandsPath = path.join(foldersPath, folder);
    // 'commands/info' 안의 '.js' 확장자 파일을 읽음
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandsFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        
        if ('data' in command && 'execute' in command){
            // map형식으로 저장 (명령어 이름, 명령어 모듈)
            commands.push(command.data.toJSON());
            // console.log(`[경고] ${filePath}는 'data' 혹은 'execute'에 대한 정보가 꼭 있어야합니다.`);
        }
    }
    
}

const rest = new REST().setToken(token);

(async () => {
    try{
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands},
        );
        console.log(`성공적으로 ${data.length} 개의 명렁어(/)를 로드하였습니다.`);
    } catch (error) {
        console.error(error);
    }
})();