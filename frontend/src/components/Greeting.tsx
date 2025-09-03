'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import darkStyles from '../styles/components/greeting/darkGreeting.module.scss';
import styles from '../styles/components/greeting/greeting.module.scss';
import lightStyles from '../styles/components/greeting/lightGreeting.module.scss';

import Logo from './Logo';

export default function Greeting(): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  return (
    <>
      <div className={`${themeStyles.main} ${styles.main}`}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Logo width={60} height={80} />
          </div>
          <div className={styles.welcomeMessage}>
            <p>
              <span className={styles.trancText}>
                Мы рады приветствовать вас на нашем ресурсе, посвященном
              </span>{' '}
              анализу и отслеживанию изменений цен
              <span className={styles.trancText}> на продукты питания</span>
            </p>
          </div>
          <div className={styles.btnToApp}>
            {' '}
            <Link className={styles.btn} href="/portal/shops">
              Перейти в приложение
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
