import styles from '../styles/components/pageContent.module.scss';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageContent({ children }: Props): JSX.Element {
  return <div className={styles.wrapper}>{children}</div>;
}
