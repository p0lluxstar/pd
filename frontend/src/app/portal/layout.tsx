import PageContent from '@/src/components/PageContent';
import Sidebar from '@/src/components/Sidebar';
import styles from '../../styles/pages/portal.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portal | PD',
  description: 'Description portal page',
};

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <>
      <main className={styles.main}>
        <Sidebar />
        <PageContent>{children}</PageContent>
      </main>
    </>
  );
}
