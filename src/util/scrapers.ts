import puppeteer from 'puppeteer-extra';

export const scrape = async (urls: string[]): Promise<string | void> => {
  const browser = await puppeteer.launch({
    /* headless: false, */
  });
  const page = await browser.newPage();

  try {
    for (const url of urls) {
      await page.goto(url);
      const price: string | null = await page.$eval(
        '.product-details__price span',
        (span) => span.textContent
      );
      console.log(price);

      if (price) {
        return price;
      }
    }
  } catch (err) {
    console.error('Ошибка при попытке парсинга страницы:', err);
  } finally {
    await browser.close();
  }
};
