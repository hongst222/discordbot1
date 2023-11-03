const valPatch = require("../function/valPatch.js");
const cron = require("node-cron");

// 스케줄러 작성
module.exports = (client) => {
    cron.schedule('1 21 * * 6', async () => {
        const now = new Date();
        const firstRunDate = new Date(2023, 10, 14)

        if (now >= firstRunDate && now.getDay() === 6) {
            const links = {
                KR: await valPatch("KR"),
                JP: await valPatch("JP"),
            }

            const targetChannel = {
                kr: client.channels.cache.get(process.env.PATCH_KR),
                jp: client.channels.cache.get(process.env.PATCH_JP),
            }
            
            targetChannel['kr'].send(links['KR']);
            targetChannel['jp'].send(links['JP']);

        }
        //  첫번째 실행은 11월 7일
    })
}
