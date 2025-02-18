'use client';

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import darkStyles from '../styles/components/pageContent/darkPageContent.module.scss';
import lightStyles from '../styles/components/pageContent/lightPageContent.module.scss';
import styles from '../styles/components/pageContent/pageContent.module.scss';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageContent({ children }: Props): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  return <div className={`${styles.wrapper} ${themeStyles.wrapper}`}>{children}</div>;
}
