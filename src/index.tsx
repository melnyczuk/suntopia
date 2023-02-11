import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

import { fetchData, fetchText } from './api';
import WorldView from './world_view';
import { Overlay } from './overlay';
import { InfoJson, ProjectItem } from './types';

const INFO_URL = 'https://dl.dropbox.com/s/325pclzws7xdeem/index.json';

const fallbackInfo: ProjectItem = {
  title: '🌞',
  text: '',
  image: '',
  assets: [],
};

const App = () => {
  const [info, setInfo] = useState<InfoJson['info']>(fallbackInfo);
  const [target, setTarget] = useState<ProjectItem | null>(info);
  const [projectItems, setProjectItems] = useState<ProjectItem[]>([]);

  useEffect(() => {
    fetchData(INFO_URL).then(async ({ info: rawInfo, items: rawItems }) => {
      setInfo(rawInfo);
      setTarget(rawInfo);
      const enrichedItems = await Promise.all(
        rawItems.map(async ({ title, image, text: rawText, assets = [] }) => {
          const text = await fetchText(rawText);
          return { title, image, text, assets };
        })
      );
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
      <Overlay projectItem={target} onInfoClick={() => setTarget(info)} />
    </div>
  );
};

export default App;
