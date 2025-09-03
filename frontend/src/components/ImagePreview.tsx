'use client';

import Image from 'next/image';
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import darkStyles from '../styles/components/imagePreview/darkImagePreview.module.scss';
import styles from '../styles/components/imagePreview/imagePreview.module.scss';
import lightStyles from '../styles/components/imagePreview/lightImagePreview.module.scss';

interface IProps {
  url: string;
  width: number;
  height: number;
}

export default function ImagePreview({ url, width, height }: IProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  const handleOpen = (): void => {
    setIsOpen(true);
  };
  const handleClose = (): void => {
    setIsOpen(false);
  };

  return (
    <div className={`${styles.previewContainer} ${themeStyles.previewContainer}`}>
      <Image
        className={styles.previewThumbnail}
        src={url}
        width={width}
        height={height}
        alt="shop"
        onClick={handleOpen}
      />
      {isOpen && (
        <div className={styles.previewModal}>
          <div className={styles.previewModalContent}>
            <Image
              className={styles.previewFull}
              src={url}
              width={600}
              height={600}
              alt="full"
              onClick={handleOpen}
            />
            <button className={styles.previewClose} onClick={handleClose}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
