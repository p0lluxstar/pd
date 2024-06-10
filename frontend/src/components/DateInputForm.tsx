'use client';

import { useRef, useState } from 'react';

interface IProps {
  lastDate: string;
  currentDate: string;
  onUpdateData: (startDateInput: string, endDateInput: string) => Promise<void>;
}

export default function DateInputForm({
  lastDate,
  currentDate,
  onUpdateData,
}: IProps): JSX.Element {
  const [startDate, setStartDate] = useState(lastDate);
  const [endDate, setEndDate] = useState(currentDate);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const handleUpdateData = (): void => {
    const startDateInput = startDateRef.current?.value;
    const endDateInput = endDateRef.current?.value;

    if (startDateInput != null && endDateInput != null) {
      void onUpdateData(startDateInput, endDateInput);
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
