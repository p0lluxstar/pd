import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import styles from '../styles/components/toggleSwitchTheme.module.scss';

export default function ToggleSwitchTheme(): JSX.Element {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <div className={styles.toggleSwitchWrapper}>
        <div className={styles.toggleSwitch}>
          <label className={styles.switchLabel}>
            <input
              className={styles.switchCheckbox}
              type="checkbox"
              checked={themeContext.theme === 'dark'}
              onChange={themeContext.toggleTheme}
            ></input>
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
    </>
  );
}
