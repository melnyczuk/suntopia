// import { Mesh, SphereGeometry, ShaderMaterial, BackSide, Clock } from 'three';
// import fragmentShader from './data/frag.c';
// import vertexShader from './data/vert.c';

import { Mesh } from 'three';

class BgSphere extends Mesh {
  // geometry: SphereGeometry;
  // material: ShaderMaterial;
  // private clock: Clock;
  // constructor() {
  //   super();
  //   this.name = 'background sphere';
  //   this.clock = new Clock(true);
  //   this.geometry = new SphereGeometry(64, 32, 32);
  //   this.material = new ShaderMaterial({
  //     uniforms: { iTime: { value: 0.0 } },
  //     vertexShader,
  //     fragmentShader,
  //     side: BackSide,
  //   });
  // }
  // public update = (): void => {
  //   this.material.uniforms.iTime.value = this.clock.getElapsedTime();
  // };
}

export default BgSphere;
