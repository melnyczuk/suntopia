import React, { FC } from 'react';
import InfoButton from './InfoButton';
import TextBox from './TextBox';
import { ProjectItem } from '../types';
import styles from './styles.module.scss';

type OverlayProps = {
  projectItem: ProjectItem | null;
  onInfoClick: () => void;
};

const Overlay: FC<OverlayProps> = ({ projectItem, onInfoClick }) => {
  return (
    <div className={styles.overlay}>
      <InfoButton onClick={onInfoClick} />
      {projectItem && (
        <TextBox>
          <h2>{projectItem.title}</h2>
          {(projectItem.assets || []).map(({ type, src }) => {
            if (type === 'VIDEO') {
              return (
                <a href={src} target="_blank">
                  watch the video
                </a>
              );
              // return (
              // <video
              //   key={src}
              //   className={styles.video}
              //   playsInline
              //   preload="auto"
              //   controls
              //   src={src}
              // />
              // );
            }
            if (type === 'IMAGE') {
              return <img key={src} className={styles.image} src={src} />;
            }
            return null;
          })}
          {projectItem.text.split('\n').map((line, i) => (
            <p key={`${i}-${line.slice(0, 10).replace(' ', '')}`}>{line}</p>
          ))}
        </TextBox>
      )}
    </div>
  );
};

export default Overlay;
