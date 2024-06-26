'use client';

import { useRef, useState, useEffect } from 'react';
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

  useEffect(() => {
    const savedDate = localStorage.getItem('dateForm');
    if (savedDate != null) {
      const parsedDate: IParsedDate = JSON.parse(savedDate);
      setStartDate(parsedDate.startDate);
      setEndDate(parsedDate.endDate);
    } else {
      const initialDate = { startDate: dates.startDate, endDate: dates.endDate };
      console.log(initialDate);
      localStorage.setItem('dateForm', JSON.stringify(initialDate));
    }
  }, []);

  const handleUpdateData = (): void => {
    const startDateInput = startDateRef.current?.value;
    const endDateInput = endDateRef.current?.value;

    if (startDateInput != null && endDateInput != null) {
      void onUpdateData();
      const updatedDate = { startDate: startDateInput, endDate: endDateInput };
      localStorage.setItem('dateForm', JSON.stringify(updatedDate));
    }
  };

  return (
    <>
      <div>
        <label>
          Дата с:
          <input
            type="date"
            value={startDate}
            ref={startDateRef}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </label>
        <label>
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
        <button onClick={handleUpdateData}>Обновить данные</button>
      </div>
    </>
  );
}
