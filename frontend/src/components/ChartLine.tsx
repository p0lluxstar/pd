'use client';

import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useRef, useEffect } from 'react';

interface IProps {
  date: string[];
  price: number[];
}

Chart.register(ChartDataLabels);

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
                label: '',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                data: price,
                fill: true,
                pointStyle: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              datalabels: {
                align: -40,
                /* backgroundColor: '#f1f1f1', */
                offset: -5,
                font: { weight: 'bold' },
              },
              tooltip: { enabled: false }, // отключаем появление labeldata при наведении курсором
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Дата',
                  font: {
                    weight: 'bold',
                  },
                },
                border: {
                  width: 3, // толщина оси X
                },
              },
              y: {
                offset: true,
                title: {
                  display: true,
                  text: 'Цена (руб.)',
                  font: {
                    weight: 'bold',
                  },
                },
                grid: {
                  display: false, // скрыть линии по оси Y
                },
                border: {
                  width: 1, // толщина оси Y
                },
                ticks: {
                  display: false, // скрыть значения по оси Y
                },
              },
            },
          },
          plugins: [ChartDataLabels],
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

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartLine;
