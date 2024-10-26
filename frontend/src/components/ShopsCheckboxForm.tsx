'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { shopsActions } from '../redux/slices/shopsSlice';
import styles from '../styles/components/shopsCheckboxForm.module.scss';

/* import { type IShop } from '../types/interfaсes'; */

type CheckedItems = Record<string, boolean>;

/* const API_HOST = process.env.NEXT_PUBLIC_API_HOST; */

const shops = [
  {
    id: 'shop-0001',
    name: 'Перекресток',
  },
  {
    id: 'shop-0002',
    name: 'Спар',
  },
  {
    id: 'shop-0003',
    name: 'Mагнит',
  },
  {
    id: 'shop-0004',
    name: 'Ашан',
  },
  {
    id: 'shop-0005',
    name: 'Глобус',
  },
  {
    id: 'shop-0006',
    name: 'Лента',
  },
  {
    id: 'shop-0007',
    name: 'Пятерочка',
  },
];

export default function ShopsCheckboxForm(): JSX.Element {
  const dispatch = useDispatch();

  // закоментирован код когда массив shops получаем из запроса
  /*  const [shops, setShops] = useState<IShop[]>([]);

  useEffect(() => {
    const fetchShops = async (): Promise<void> => {
      console.log('useEffect');
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
  }, []); */

  const initializeCheckedItems = (): CheckedItems => {
    if (typeof window !== 'undefined') {
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
    }
    return {}; // Возвращаем пустой объект на серверной стороне
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
                {`«${shop.name}»`}
                {/* <Image
                  className={styles.cardImg}
                  src={`/img/shops/${shop.id}.png`}
                  width={100}
                  height={50}
                  alt="shop"
                /> */}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
