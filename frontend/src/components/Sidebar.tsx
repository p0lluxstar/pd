import Link from 'next/link';
import Logo from '@/src/components/Logo';
import styles from '../styles/components/sidebar.module.scss';

export default function Sidebar(): JSX.Element {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Logo width={30} height={40} />
        </div>
        <div className={styles['main-nav']}>
          <ul>
            <li className={styles.active}>
              <Link href="/portal/shops">Магазины</Link>
            </li>
            <li>
              <Link href="/portal/products">Продукты</Link>
            </li>
            <li>
              <Link href="/portal/about">О нас</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
