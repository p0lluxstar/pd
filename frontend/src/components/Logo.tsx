import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/components/logo.module.scss';

interface Props {
  width: number;
  height: number;
}

export default function Logo(props: Props): JSX.Element {
  return (
    <div className={styles.logoWrapper}>
      <Link className={styles.link} href="/portal/shops">
        <Image
          className={styles.logoImg}
          src="/img/logo/logo.png"
          width={props.width}
          height={props.height}
          alt="logo"
        />
        <span>Price Dynamic</span>
      </Link>
    </div>
  );
}
