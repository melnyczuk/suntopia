import React, { FC, useMemo } from 'react';

import { ImagePlane } from './geometry';
import { ProjectItem } from '../types';
import { Vector2, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { FirstPersonControls } from './interaction';

type WorldViewProps = {
  projectItems: ProjectItem[];
  setProjectItem: (projectItem: ProjectItem) => void;
};

const WorldView: FC<WorldViewProps> = ({ projectItems, setProjectItem }) => {
  const positions = useMemo(() => fibSphere(32, projectItems), [projectItems]);
  const FPS = useMemo(
    () =>
      projectItems.length === 0
        ? null
        : new FirstPersonControls(null, {
            look: 0.1,
            movement: 0.0,
            turn: 0.0,
          }),
    [projectItems]
  );

  useFrame(({ camera }, delta) => {
    if (FPS) {
      FPS.camera = camera;
      FPS.update(delta);
    }
  });

  return (
    <>
      {projectItems.map((projectItem, i) => (
        <ImagePlane
          key={projectItem.title}
          dimensions={new Vector2(15, 10)}
          position={positions[i]}
          projectItem={projectItem}
          setProjectItem={() => setProjectItem(projectItem)}
        />
      ))}
    </>
  );
};

export default WorldView;

function fibSphere(radius: number, items: ProjectItem[]): Vector3[] {
  const phi = Math.PI * (3 - Math.sqrt(5));

  return items.map((_, i) => {
    const theta = phi * i;
    const x = Math.cos(theta) * radius;
    const y = radius - (i / items.length) * 2 * radius;
    const z = Math.sin(theta) * radius;
    return new Vector3(x, y, z);
  });
}
