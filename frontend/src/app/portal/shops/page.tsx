'use client';

export default function ShopsPage(): JSX.Element {
  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3001/api/data');

      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Shops</h1>
      <button
        onClick={() => {
          void fetchData();
        }}
      >
        Получить вcе магазины
      </button>
    </>
  );
}
