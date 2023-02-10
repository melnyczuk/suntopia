import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
// import { FPSControls } from 'react-three-fpscontrols';

import { fetchItems, fetchText } from './api';
import WorldView from './world_view';
import { InfoButton, TextBox } from './overlay';

import { ProjectItem } from './types';

const INFO_URL = 'https://dl.dropbox.com/s/325pclzws7xdeem/index.json';

const info: ProjectItem = {
  title: 'Sun',
  text: 'Sun sun sun',
  image: '',
  assets: [],
};

const App = () => {
  const [target, setTarget] = useState<ProjectItem | null>(info);
  const [projectItems, setProjectItems] = useState<ProjectItem[]>([]);

  useEffect(() => {
    fetchItems(INFO_URL).then(async (rawItems) => {
      const enrichedItems = await Promise.all(
        rawItems.map(async ({ title, image, text, assets }) => ({
          title,
          image,
          text: await fetchText(text),
          assets,
        }))
      );
      console.log('items', enrichedItems);
      setProjectItems(enrichedItems);
    });
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {projectItems && (
        <Canvas
          flat
          linear
          onPointerMissed={() => {
            setTarget(null);
          }}
        >
          <WorldView projectItems={projectItems} setProjectItem={setTarget} />
        </Canvas>
      )}
      <InfoButton
        onClick={() => {
          setTarget(info);
        }}
      />
      {target && (
        <TextBox>
          <h2>{target.title}</h2>
          <p>{target.text}</p>
        </TextBox>
      )}
    </div>
  );
};

export default App;
