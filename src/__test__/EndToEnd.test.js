import puppeteer from 'puppeteer';
import '@testing-library/jest-dom';
 

describe('show/hide an event details', () => {
    jest.setTimeout(30000);

    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow down by 250ms,
            timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
          });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event-box');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        await page.waitForSelector('.event-box');
        const eventDetails = await page.$('.event-box .description');
        expect(eventDetails).toBeNull();
      });

    test('User can expand an event to see its details', async () => {
        await page.click('.event-box .event-details-button');
        const eventDetails = await page.$('.event-box .description');
        expect(eventDetails).toBeDefined();
    });
    test('User can collapse an event to hide details', async () => {
        await page.click('.event-box .event-details-button');
        const eventDetails = await page.$('.event-box .description');
        expect(eventDetails).toBeNull();
      });
});