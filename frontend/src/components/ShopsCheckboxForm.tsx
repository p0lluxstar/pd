'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { shopsActions } from '../redux/slices/shopsSlice';
import { type IShop } from '../types/interfaсes';

type CheckedItems = Record<string, boolean>;

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function ShopsCheckboxForm(): JSX.Element {
  const dispatch = useDispatch();
  const [shops, setShops] = useState<IShop[]>([]);

  useEffect(() => {
    const fetchShops = async (): Promise<void> => {
      try {
        const response = await fetch(`${API_HOST}/shops`);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data: IShop[] = await response.json();
        setShops(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
    void fetchShops();
  }, []);

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
