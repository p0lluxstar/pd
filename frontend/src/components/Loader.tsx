import Image from 'next/image';
import styles from '../styles/components/loader.module.scss';

export default function Loader(): JSX.Element {
  return (
    <>
      <div className={styles.loader}>
        <Image src="/img/loader/loader.gif" width={30} height={30} alt="loader" />
      </div>
    </>
  );
}
