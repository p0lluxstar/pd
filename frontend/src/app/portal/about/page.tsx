import Link from 'next/link';
import { IoLogoGithub } from 'react-icons/io';
import styles from '../../../styles/pages/about/aboutPage.module.scss';

export default function AboutPage(): JSX.Element {
  return (
    <>
      <h1>О нас</h1>
      <p className={styles.text}>
        Репозиторий проекта на{' '}
        <Link
          className={styles.aboutLink}
          href="https://github.com/p0lluxstar/pd"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
          <IoLogoGithub className={styles.icon} />
        </Link>
      </p>
    </>
  );
}
