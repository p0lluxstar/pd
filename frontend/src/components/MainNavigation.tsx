'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaStore } from 'react-icons/fa';
import { GiChipsBag, GiKetchup, GiFruitBowl, GiMilkCarton, GiManualJuicer } from 'react-icons/gi';
import { IoPeople } from 'react-icons/io5';
import styles from '../styles/components/mainNavigation.module.scss';

export default function MainNavigation(): JSX.Element {
  const pathname = usePathname();

  const isShopsActive = pathname.startsWith('/portal/shops');
  const isCategory0001Active = pathname.startsWith('/portal/category-0001');
  const isCategory0002Active = pathname.startsWith('/portal/category-0002');
  const isCategory0003Active = pathname.startsWith('/portal/category-0003');
  const isCategory0004Active = pathname.startsWith('/portal/category-0004');
  const isCategory0005Active = pathname.startsWith('/portal/category-0005');
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
              <GiMilkCarton className={styles.navIcons} />
              Молоко, сыр, яйца
            </Link>
          </li>
          <li className={`${styles.navItem} ${isCategory0002Active ? styles.active : ''}`}>
            <Link className={styles.navItemLink} href="/portal/category-0002">
              <GiManualJuicer className={styles.navIcons} />
              Соки, воды, напитки
            </Link>
          </li>
          <li className={`${styles.navItem} ${isCategory0003Active ? styles.active : ''}`}>
            <Link className={styles.navItemLink} href="/portal/category-0003">
              <GiChipsBag className={styles.navIcons} />
              Макароны, крупы, масло
            </Link>
          </li>
          <li className={`${styles.navItem} ${isCategory0004Active ? styles.active : ''}`}>
            <Link className={styles.navItemLink} href="/portal/category-0004">
              <GiKetchup className={styles.navIcons} />
              Соусы, кетчупы, майонезы
            </Link>
          </li>
          <li className={`${styles.navItem} ${isCategory0005Active ? styles.active : ''}`}>
            <Link className={styles.navItemLink} href="/portal/category-0005">
              <GiFruitBowl className={styles.navIcons} />
              Овощи, фрукты, ягоды
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
