'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { shopsActions } from '../redux/slices/shopsSlice';
import styles from '../styles/components/shopsCheckboxForm.module.scss';

type CheckedItems = Record<string, boolean>;

const shops = [
  {
    id: 'shop-0003',
    name: 'Mагнит',
  },
  {
    id: 'shop-0001',
    name: 'Перекресток',
  },
  {
    id: 'shop-0002',
    name: 'Спар',
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

  useEffect(() => {
    initializeCheckedItems();
  }, []);

  return (
    <>
      <div className={styles.checkboxMain}>
        <span className={styles.checkboxTitle}>Выберите магазины</span>
        <div className={styles.checkboxShop}>
          {shops.map((shop) => (
            <div key={shop.id} className={styles.checkboxItem}>
              <label>
                <input
                  type="checkbox"
                  id={shop.id}
                  checked={!!checkedItems[shop.id]}
                  onChange={handleChange}
                />
                {shop.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
