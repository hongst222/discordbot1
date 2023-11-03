const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('서버에 대한 정보를 제공합니다.'),
    async execute(interaction) {
        await interaction.reply(`해당 서버의 이름은 ${interaction.guild.name} 이며 ${interaction.guild.memberCount}명의 멤버가 있습니다.`);
    }
}