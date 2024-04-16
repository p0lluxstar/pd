import puppeteer from 'puppeteer-extra';
import { ProductInfo } from '../types/interfaces';
import fs from 'fs';
import path from 'path';

export const scraper = async (
  productInfo: ProductInfo[],
  pathToFile: string
): Promise<string[] | void> => {
  const browser = await puppeteer.launch({
    /* headless: false, */
  });
  const page = await browser.newPage();
  const filePath = path.join(__dirname, '..', '..', 'db', pathToFile);

  try {
    for (const info of productInfo) {
      await page.goto(info.url);
      const price: string | null = await page.$eval(info.element, (span) => span.textContent);
      /* console.log(price, info.shop); */

      if (price) {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

        fs.appendFile(
          filePath,
          `${formattedDate}; ${price.replace(/[^\d,]/g, '')}; ${info.shop}\n`,
          (err) => {
            if (err) {
              console.error('Ошибка при записи в файл:', err);
              return;
            }
            console.log('Данные успешно записаны в файл');
          }
        );
      }
    }
  } catch (err) {
    console.error('Ошибка при попытке парсинга страницы');
  } finally {
    await browser.close();
  }
};
