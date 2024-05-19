import '../styles/_normalize.scss';
import '../styles/global.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Main | PD',
  description: 'Description main page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
