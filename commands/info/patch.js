const { SlashCommandBuilder } = require('discord.js');
const lolPatch = require('../../function/lolPatch.js');
const tftPatch = require('../../function/tftPatch.js');
const valPatch = require('../../function/valPatch.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('patch')
        .setDescription('최신 패치노트 링크를 보내줍니다.')
        .addStringOption(option =>
            option.setName('game')
                .setDescription('set game')
                .setRequired(true)
                .addChoices(
                    { name: 'LOL', value: 'LOL' },
                    { name: 'TFT', value: 'TFT' },
                    { name: 'VALORANT', value: 'VALORANT' }
                ))
        .addStringOption(option =>
            option.setName('region')
                .setDescription('set region')
                .setRequired(true)
                .addChoices(
                    { name: 'KR', value: 'KR' },
                    { name: 'JP', value: 'JP' }
                )),
    async execute(interaction) {
        const game = interaction.options.getString('game')
        const region = interaction.options.getString('region');

        let link = '';
        switch (game) {
            case 'LOL':
                link = await lolPatch(region);
                break;
            case 'TFT':
                link = await tftPatch(region);
                break;

            case 'VALORANT':
                link = await valPatch(region);
                break;
        }

        await interaction.reply(`${link}`);


    }
}