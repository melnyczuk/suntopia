import React, { FC, useEffect, useRef, useState } from 'react';
import {
  DoubleSide,
  Mesh,
  Texture,
  TextureLoader,
  Vector2,
  Vector3,
} from 'three';
import { ProjectItem } from '../../types';

type ImagePlaneProps = {
  projectItem: ProjectItem;
  dimensions: Vector2;
  position: Vector3;
  setProjectItem: (projectItem: ProjectItem) => void;
};

const ImagePlane: FC<ImagePlaneProps> = ({
  projectItem,
  dimensions,
  position,
  setProjectItem,
}) => {
  const ref = useRef<Mesh>();
  const [texture, setTexture] = useState<Texture | null>(null);

  useEffect(() => {
    new TextureLoader().load(projectItem.image, setTexture);
  }, [projectItem.image]);

  useEffect(() => {
    if (texture && ref.current) {
      ref.current.lookAt(0, 0, 0);
    }
  }, [ref, ref.current, texture]);

  return !texture ? null : (
    <mesh
      ref={ref}
      position={[position.x, position.y, position.z]}
      onClick={() => setProjectItem(projectItem)}
    >
      <planeGeometry args={[dimensions.x, dimensions.y]} />
      <meshBasicMaterial
        map={texture}
        side={DoubleSide}
        color={0xffffff}
        transparent={false}
      />
    </mesh>
  );
};

// Mesh {
//   public material: Material;
//   public geometry: PlaneGeometry;
//   public projectItem: ProjectItem;

//   constructor(
//     projectItem: ProjectItem,
//     { dimensions, position }: ImagePlaneArgs
//   ) {
//     super();

//     this.projectItem = projectItem;

//     this.positionPlane(position);

//     new TextureLoader().loadAsync(this.projectItem.image).then((texture) => {
//       this.geometry = new PlaneGeometry(dimensions.x, dimensions.y);
//       this.material = new MeshBasicMaterial({
//         map: texture,
//         side: DoubleSide,
//         color: 0xffffff,
//         transparent: false,
//       });
//     });
//   }

//   public positionPlane = (position: Vector3): void => {
//     this.position.set(position.x, position.y, position.z);
//     this.lookAt(new Vector3(0, 0, 0));
//     this.compute();
//   };

//   private compute() {
//     this.geometry.computeBoundingBox();
//     this.geometry.computeBoundingSphere();
//     this.geometry.computeVertexNormals();
//   }
// }

export default ImagePlane;
