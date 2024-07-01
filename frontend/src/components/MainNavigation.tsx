import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaStore } from 'react-icons/fa';
import { IoPeople } from 'react-icons/io5';
import { LuMilk } from 'react-icons/lu';
import { TbBottle } from 'react-icons/tb';
import styles from '../styles/components/mainNavigation.module.scss';

export default function MainNavigation(): JSX.Element {
  const pathname = usePathname();

  const isShopsActive = pathname.startsWith('/portal/shops');
  const isCategory0001Active = pathname.startsWith('/portal/category-0001');
  const isCategory0002Active = pathname.startsWith('/portal/category-0002');
  const isAbout = pathname.startsWith('/portal/about');

  return (
    <>
      <div className={styles.mainNav}>
        <ul className={styles.navItems}>
          <li className={`${styles.navItem} ${isShopsActive ? styles.active : ''}`}>
            <Link className={styles.navItemLink} href="/portal/shops">
              <FaStore className={styles.navIcons} />
              Магазины
            </Link>
          </li>
          <li className={`${styles.navItem} ${isCategory0001Active ? styles.active : ''}`}>
            <Link className={styles.navItemLink} href="/portal/category-0001">
              <LuMilk className={styles.navIcons} />
              Молоко, сыр, яйца
            </Link>
          </li>
          <li className={`${styles.navItem} ${isCategory0002Active ? styles.active : ''}`}>
            <Link className={styles.navItemLink} href="/portal/category-0002">
              <TbBottle className={styles.navIcons} />
              Соки, воды, напитки
            </Link>
          </li>
          <li className={`${styles.navItem} ${isAbout ? styles.active : ''}`}>
            <Link className={styles.navItemLink} href="/portal/about">
              <IoPeople className={styles.navIcons} />О нас
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
