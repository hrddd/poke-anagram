import styles from "./index.module.css";
import React from "react";

type RangeProps = {
  min?: number,
  max: number,
  value: number,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
export const Range = (props: RangeProps) => {
  const { min = 0, max, value, onChange } = props;
  return (<div className={styles.Range}>
    <div className={styles.Range__tips} style={{ left: `${value / (max - min) * 100}%` }}>
      <div className={styles.Range__tipsInner}><span className={styles.Range__tipsHeading}>問題数</span><br />{value}</div>
    </div>
    <input
      className={styles.Range__input}
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
    />
  </div>)
};