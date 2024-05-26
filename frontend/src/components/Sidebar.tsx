'use client';

import Logo from '@/src/components/Logo';
import styles from '../styles/components/sidebar.module.scss';
import MainNavigation from './MainNavigation';

export default function Sidebar(): JSX.Element {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Logo width={30} height={40} />
        </div>
        <MainNavigation />
      </div>
    </>
  );
}
