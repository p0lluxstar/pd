'use client';

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import darkStyles from '../styles/components/priceChange/darkPriceChange.module.scss';
import lightStyles from '../styles/components/priceChange/lightPriceChange.module.scss';
import styles from '../styles/components/priceChange/priceChange.module.scss';

interface IProps {
  data: number[];
}

export default function PriceChange({ data }: IProps): JSX.Element | null {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  let message;
  let percentageChange;
  const startPrice = data[0];
  const endPrice = data[data.length - 1];

  if (data.length === 0) {
    return null;
  }

  if (startPrice > endPrice) {
    percentageChange = ((startPrice - endPrice - 1) / startPrice) * 100;
    message = (
      <>
        Продукт подешевел с {startPrice}р. до {endPrice}р.
        <span className={styles.percentMinus}> ⬊ {percentageChange.toFixed(2)}%</span>
      </>
    );
  } else if (startPrice < endPrice) {
    percentageChange = ((endPrice - startPrice - 1) / startPrice) * 100;
    message = (
      <>
        Продукт подорожал с {startPrice}р. до {endPrice}р.
        <span className={styles.percentPlus}> ⬈ {percentageChange.toFixed(2)}%</span>
      </>
    );
  } else {
    message = `Цена продукта не изменилась, ${startPrice}р.`;
  }

  return <div className={`${styles.priceMessage} ${themeStyles.priceMessage}`}>{message}</div>;
}
