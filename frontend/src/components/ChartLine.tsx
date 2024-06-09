'use client';

import { Chart, registerables } from 'chart.js';
import { useRef, useEffect } from 'react';

interface IProps {
  date: string[];
  price: number[];
}

const ChartLine: React.FC<IProps> = ({ date, price }: IProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const myChartRef = useRef<Chart | null>(null);

  useEffect(() => {
    // Регистрация всех компонентов Chart.js
    Chart.register(...registerables);

    if (chartRef.current != null) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx != null) {
        // Если график уже существует, уничтожьте его
        if (myChartRef.current != null) {
          myChartRef.current.destroy();
        }

        // Создайте новый график
        myChartRef.current = new Chart(ctx, {
          type: 'line', // Указываем тип графика как 'line'
          data: {
            labels: date,
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: price,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    }

    // Очистка графика при размонтировании компонента
    return () => {
      if (myChartRef.current != null) {
        myChartRef.current.destroy();
      }
    };
  }, [price]);

  return <canvas ref={chartRef} />;
};

export default ChartLine;
