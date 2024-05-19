import Logo from '@/src/components/Logo';
import styles from '../../styles/pages/portal.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portal | PD',
  description: 'Description portal page',
};

const Portal = (): JSX.Element => (
  <>
    <main className={styles.main}>
      <div className={styles['col-1']}>
        <div className={styles.logo}>
          <Logo width={30} height={40} />
        </div>
        <div className={styles['main-nav']}>
          <ul>
            <li className={styles.active}>
              <a href="#">Магазины</a>
            </li>
            <li>
              <a href="#">Продукты</a>
            </li>
            <li>
              <a href="#">О нас</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles['col-2']}>&nbsp;</div>
    </main>
  </>
);

export default Portal;
