import * as fs from 'fs';
import * as path from 'path';

export default function loggerScraper(logMessage: string):void {
    try {
      const logDir = path.join(process.cwd(), 'logs'); // Путь к папке logs
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true }); // Создаем папку с флагом recursive
      }

      const currentDate = new Date().toISOString().split('T')[0]; // Получаем текущую дату
      const logFilePath = path.join(logDir, `scraper-${currentDate}.log`); // Путь к файлу лога с датой

      const logEntry = `${new Date().toISOString()} - ${logMessage}\n`; // Формат записи с таймстампом
      fs.appendFileSync(logFilePath, logEntry, 'utf8'); // Записываем сообщение в файл
    } catch (err) {
      console.error('Ошибка при записи лога в файл:', err);
    }
  }