import React from 'react';
import styles from './styles.module.scss';

type InfoButtonProps = {
  onClick: () => void;
};

const InfoButton = ({ onClick }: InfoButtonProps) => {
  return (
    <button
      className={styles['info-button']}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      Info
    </button>
  );
};

export default InfoButton;
