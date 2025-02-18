import { type IDatesFromLS } from '../types/interfaсes';
import getCurrentAndLastDateFormatted from './getCurrentAndLastDateFormatted';

export default function getDatesFromLS(): IDatesFromLS {
  const dates = getCurrentAndLastDateFormatted();

  let datesFromLS: IDatesFromLS = {
    startDate: dates.startDate,
    endDate: dates.endDate,
  };

  if (typeof window !== 'undefined') {
    const getDateFormLS = localStorage.getItem('dateForm');
    datesFromLS =
      getDateFormLS != null
        ? JSON.parse(getDateFormLS)
        : { startDate: dates.startDate, endDate: dates.endDate };
  }

  return datesFromLS;
}
