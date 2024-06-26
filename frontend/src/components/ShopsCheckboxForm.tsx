'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { shopsActions } from '../redux/slices/shopsSlice';

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
];

export default function ShopsCheckboxForm(): JSX.Element {
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(shopsActions.setShops(checkedItems));
  }, [checkedItems, dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, checked } = event.target;
    const updatedShopsCheckboxItems = {
      ...checkedItems,
      [id]: checked,
    };
    setCheckedItems(updatedShopsCheckboxItems);
    localStorage.setItem('shopsCheckboxItems', JSON.stringify(updatedShopsCheckboxItems));
    dispatch(shopsActions.setShops(updatedShopsCheckboxItems));
  };

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
    </form>
  );
}
