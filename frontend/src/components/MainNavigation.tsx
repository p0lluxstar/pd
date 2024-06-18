import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/components/mainNavigation.module.scss';

export default function MainNavigation(): JSX.Element {
  const pathname = usePathname();

  const isShopsActive = pathname.startsWith('/portal/shops');
  const isCategory0001Active = pathname.startsWith('/portal/category-0001');
  const isCategory0002Active = pathname.startsWith('/portal/category-0002');

  return (
    <>
      <div className={styles.mainNav}>
        <ul>
          <li className={isShopsActive ? styles.active : ''}>
            <Link href="/portal/shops">Магазины</Link>
          </li>
          <li className={isCategory0001Active ? styles.active : ''}>
            <Link href="/portal/category-0001">Молоко, сыр, яйца</Link>
          </li>
          <li className={isCategory0002Active ? styles.active : ''}>
            <Link href="/portal/category-0002">Соки, воды, напитки</Link>
          </li>
          <li className={pathname === '/portal/about' ? styles.active : ''}>
            <Link href="/portal/about">О нас</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
