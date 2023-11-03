const Parser = require('rss-parser');
const axios = require('axios');
const parser = new Parser();

const lolPatch = async (region) => {
    const feedURL = region === 'KR' ? process.env.LOL_KR : region === 'JP' ? process.env.LOL_JP : null;
    try {
        const response = await axios.get(feedURL);
        const data = response.data;
        // XML 데이터를 JSON으로 파싱
        const feed = await parser.parseString(data);
        const item = feed.items[0];
        return item.link;
    } catch (error) {
        console.error(error);
    }

}
module.exports = lolPatch;