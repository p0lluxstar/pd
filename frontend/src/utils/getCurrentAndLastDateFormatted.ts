import { type Dates } from '../types/interfaсes';

export default function getCurrentAndLastDateFormatted(): Dates {
  const today = new Date();

  // Получение текущей даты
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // месяцы в JavaScript начинаются с 0, поэтому добавляем 1
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;

  // Получение даты на год ранее
  const lastYear = year - 1;
  const lastDate = `${lastYear}-${month}-${day}`;

  return {
    startDate: lastDate,
    endDate: currentDate,
  };
}
