import { scrape } from '../util/scrapers';
import cron from 'node-cron';
import fs from 'fs';
import path from 'path';

const urls = ['https://magnit.ru/catalog/1812450017/'];

export const product2 = () => {
  const scrapeProduct2 = async (): Promise<string | void> => {
    const data = await scrape(urls);

    const content = typeof data === 'string' ? data : ''; // Проверяем тип данных

    const filePath = path.join(__dirname, '..', '..', 'db', 'dataProduct2.txt');

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    fs.appendFile(filePath, `${formattedDate} ${content}\n`, (err) => {
      if (err) {
        console.error('Ошибка при записи в файл:', err);
        return;
      }
      console.log('Данные успешно записаны в файл');
    });
  };

  cron.schedule('*/605 * * * *', scrapeProduct2);
};
