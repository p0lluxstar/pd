import Image from 'next/image';
import styles from '../styles/components/greeting.module.scss';

const Greeting = (): JSX.Element => (
  <>
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Image src="/img/logo.png" width="60" height="80" alt="logo" />
          <span>Price Dynamic</span>
        </div>
        <div className={styles.welcomeMessage}>
          <p>
            <span className={styles.trancText}>
              Мы рады приветствовать вас на нашем ресурсе, посвященном
            </span>{' '}
            анализу и отслеживанию изменений цен
            <span className={styles.trancText}> на продукты питания</span>
          </p>
        </div>
        <div className={styles.btnToApp}>
          {' '}
          <a className={styles.btn} href='/portal'>Перейти в приложение</a>
        </div>
      </div>
    </div>
  </>
);

export default Greeting;
