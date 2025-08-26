'use client';

import { useRef, useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import darkStyles from '../styles/components/dateInputForm/darkDateInputForm.module.scss';
import styles from '../styles/components/dateInputForm/dateInputForm.module.scss';
import lightStyles from '../styles/components/dateInputForm/lightDateInputForm.module.scss';
import getCurrentAndLastDateFormatted from '../utils/getCurrentAndLastDateFormatted';

interface IProps {
  startDateProps: string;
  endDateProps: string;
  onUpdateData: () => void;
}

interface IParsedDate {
  startDate: string;
  endDate: string;
}

export default function DateInputForm({
  startDateProps,
  endDateProps,
  onUpdateData,
}: IProps): JSX.Element {
  const dates = getCurrentAndLastDateFormatted();
  const [startDate, setStartDate] = useState(startDateProps);
  const [endDate, setEndDate] = useState(endDateProps);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  useEffect(() => {
    const savedDate = localStorage.getItem('dateForm');
    if (savedDate != null) {
      const parsedDate: IParsedDate = JSON.parse(savedDate);
      setStartDate(parsedDate.startDate);
      setEndDate(parsedDate.endDate);
    } else {
      const initialDate = { startDate: dates.startDate, endDate: dates.endDate };
      localStorage.setItem('dateForm', JSON.stringify(initialDate));
    }
  }, []);

  const handleUpdateData = (): void => {
    const startDateInput = startDateRef.current?.value;
    const endDateInput = endDateRef.current?.value;

    if (startDateInput != null && endDateInput != null) {
      onUpdateData();

      const updatedDate = { startDate: startDateInput, endDate: endDateInput };
      localStorage.setItem('dateForm', JSON.stringify(updatedDate));
    }
  };

  return (
    <>
      <div className={styles.inputDateMain}>
        <span className={`${styles.inputDateTitle} ${themeStyles.inputDateTitle}`}>
          Выберите период
        </span>
        <div className={styles.inputDate}>
          <div className={`${styles.inputDateWrap} ${themeStyles.inputDateWrap}`}>
            <label className={styles.inputDateItem}>
              с:
              <input
                type="date"
                value={startDate}
                ref={startDateRef}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </label>
            <label className={styles.inputDateItem}>
              по:
              <input
                type="date"
                value={endDate}
                ref={endDateRef}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </label>
            <button className={styles.btnDate} onClick={handleUpdateData}>
              Применить
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
