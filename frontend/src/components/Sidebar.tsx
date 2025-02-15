'use client';

import { useContext } from 'react';
import Logo from '@/src/components/Logo';
import { ThemeContext } from '../context/ThemeContextProvider';
import darkStyles from '../styles/components/sidebar/darkSiderbar.module.scss';
import lightStyles from '../styles/components/sidebar/lightSiderbar.module.scss';
import styles from '../styles/components/sidebar/sidebar.module.scss';
import MainNavigation from './MainNavigation';

export default function Sidebar(): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  return (
    <>
      <div className={`${styles.wrapper} ${themeStyles.wrapper}`}>
        <div className={styles.logo}>
          <Logo width={30} height={40} />
        </div>
        <MainNavigation />
      </div>
    </>
  );
}
