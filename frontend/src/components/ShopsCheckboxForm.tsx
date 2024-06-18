'use clinet';

import { useEffect, useState } from 'react';

type CheckedItems = Record<string, boolean>;

const shops = [
  {
    id: 'shop-0001',
    name: 'perekrestok',
  },
  {
    id: 'shop-0002',
    name: 'spar',
  },
  {
    id: 'shop-0003',
    name: 'magnit',
  },
];

interface IProps {
  updateDataCharts: () => void;
}

export default function ShopsCheckboxForm({ updateDataCharts }: IProps): JSX.Element {
  const initializeCheckedItems = (): CheckedItems => {
    const savedShopsCheckedItems = localStorage.getItem('shopsCheckboxItems');
    if (savedShopsCheckedItems != null) {
      return JSON.parse(savedShopsCheckedItems);
    } else {
      const initialCheckedItems: CheckedItems = {};
      shops.forEach((shop) => {
        initialCheckedItems[shop.id] = true; // Все чекбоксы выбраны по умолчанию
      });
      localStorage.setItem('shopsCheckboxItems', JSON.stringify(initialCheckedItems));
      return initialCheckedItems;
    }
  };

  const [checkedItems, setCheckedItems] = useState<CheckedItems>(initializeCheckedItems);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, checked } = event.target;
    const updatedShopsCheckboxItems = {
      ...checkedItems,
      [id]: checked,
    };
    setCheckedItems(updatedShopsCheckboxItems);
    localStorage.setItem('shopsCheckboxItems', JSON.stringify(updatedShopsCheckboxItems));
  };

  useEffect(() => {
    // При монтировании компонента загружаем данные из localStorage (если они есть)
    const savedShopsCheckboxItems = localStorage.getItem('shopsCheckboxItems');
    if (savedShopsCheckboxItems != null) {
      setCheckedItems(JSON.parse(savedShopsCheckboxItems) as CheckedItems);
    }
  }, []);

  return (
    <form>
      {shops.map((shop) => (
        <label key={shop.id}>
          <input
            type="checkbox"
            id={shop.id}
            checked={!!checkedItems[shop.id]}
            onChange={handleChange}
          />
          {shop.name}
        </label>
      ))}
       <button type="button" onClick={updateDataCharts}>Обновить</button>
    </form>
  );
}
