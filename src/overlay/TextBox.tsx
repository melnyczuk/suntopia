import React from 'react';
import styles from './styles.module.scss';

const TextBox = ({ children }: React.PropsWithChildren) => {
  return <div className={styles['text-box']}>{children}</div>;
};

export default TextBox;
