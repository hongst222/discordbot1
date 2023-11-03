const { Events, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
module.exports = {

    setupCommand: (client) => {
        // 명령어 관련 처리
        client.commands = new Collection();

        // commands 폴더 경로
        // /commands
        const foldersPath = path.join(__dirname,'..', 'commands');
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

                if ('data' in command && 'execute' in command) {
                    // map형식으로 저장 (명령어 이름, 명령어 모듈)
                    client.commands.set(command.data.name, command)
                } else {
                    console.log(`[경고] ${filePath}는 'data' 혹은 'execute'에 대한 정보가 꼭 있어야합니다.`);
                }
            }

        }
    },
    setupCommandHandler: (client) => {
        client.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) return;

            // 명령어 검색
            const command = interaction.client.commands.get(interaction.commandName);

            // 일치하는 명령어가 존재하지 않을 경우
            if (!command) {
                console.error(`No command Matching ${interaction.commandName} was found`);
                return;
            }
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    // ephemeral : true => 입력한 사용자에게만 보여줌
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }

        });
    }
}
