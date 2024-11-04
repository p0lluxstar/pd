import styles from '../styles/components/toggleSwitchTheme.module.scss';

export default function ToggleSwitchTheme(): JSX.Element {
  return (
    <div>
      <div className={styles.toggleSwitchWrapper}>
        <div className={styles.toggleSwitch}>
          <label className={styles.switchLabel}>
            <input className={styles.switchCheckbox} type="checkbox"></input>
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
    </div>
  );
}
