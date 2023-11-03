require('dotenv').config();
const puppeteer = require('puppeteer');
module.exports = async (region) => {
    const feedURL = region === 'KR' ? process.env.VAL_KR : region === 'JP' ? process.env.VAL_J : null
   
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(feedURL);
        
        const item = await page.$('li.ContentListing-module--contentListingItem--J9pju');
        const link = await item.$eval('a', (element) => element.getAttribute('href'));
        const result = 'https://playvalorant.com'+link;
        await browser.close();
        return result;
        
    } catch (error) {
        console.error(error);
    }
}