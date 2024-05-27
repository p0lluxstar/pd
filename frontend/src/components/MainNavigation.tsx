import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/components/mainNavigation.module.scss';

export default function MainNavigation(): JSX.Element {
  const pathname = usePathname();

  const isShopsActive = pathname.startsWith('/portal/shops');

  return (
    <>
      <div className={styles.mainNav}>
        <ul>
          <li className={isShopsActive ? styles.active : ''}>
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
    </>
  );
}
