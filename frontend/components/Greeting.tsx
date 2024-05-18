import Image from 'next/image';
import styles from '../styles/components/greeting.module.scss';

const Greeting = (): JSX.Element => (
  <>
    <div className={styles.greeting}>
      <div className={styles.wrapper}>wrapper</div>
      <div className={styles.logo}>
        <Image src="/img/logo.png" width="60" height="80" alt="logo" />
        <span>price dynamic</span>
      </div>
    </div>
  </>
);

export default Greeting;
