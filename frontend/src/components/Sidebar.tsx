'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/src/components/Logo';
import styles from '../styles/components/sidebar.module.scss';

export default function Sidebar(): JSX.Element {
  const pathname = usePathname();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Logo width={30} height={40} />
        </div>
        <div className={styles['main-nav']}>
          <ul>
            <li className={pathname === '/portal/shops' ? styles.active : ''}>
              <Link href="/portal/shops">Магазины</Link>
            </li>
            <li className={pathname === '/portal/products' ? styles.active : ''}>
              <Link href="/portal/products">Продукты</Link>
            </li>
            <li className={pathname === '/portal/about' ? styles.active : ''}>
              <Link href="/portal/about">О нас</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
