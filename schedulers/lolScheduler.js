const lolPatch = require("../function/lolPatch.js");
const tftPatch = require("../function/tftPatch.js");
const cron = require("node-cron");




// 스케줄러 작성
module.exports = (client) => {
    cron.schedule('1 21 * * 6', async () => {
        const now = new Date();
        const firstRunDate = new Date(2023, 10, 7)

        if (now >= firstRunDate && now.getDay() === 6) {
            const links = {
                lolKR: await lolPatch("KR"),
                lolJP: await lolPatch("JP"),
                tftKR: await tftPatch("KR"),
                tftJP: await tftPatch("JP"),
            }

            const targetChannel = {
                kr: client.channels.cache.get(process.env.PATCH_KR),
                jp: client.channels.cache.get(process.env.PATCH_JP),
            }
            
            targetChannel['kr'].send(links['lolKR']);
            targetChannel['jp'].send(links['lolJP']);

            targetChannel['kr'].send(links['tftKR']);
            targetChannel['jp'].send(links['tftJP']);


        }
        //  첫번째 실행은 11월 7일
    })
}

