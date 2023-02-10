import { Camera, Event, Object3D, Raycaster as RC, Vector2 } from 'three';

class Raycaster extends RC {
  camera: Camera;
  objects: Object3D<Event>[];

  constructor(camera: Camera) {
    super();
    this.camera = camera;
    this.objects = [];
  }

  public setObjects(objects: Object3D<Event>[]): void {
    this.objects = objects;
  }

  public getClickedObject(pointer: Vector2): Object3D<Event> | null {
    this.setFromCamera(pointer, this.camera);
    const intersects = this.intersectObjects(this.objects, true);
    return intersects?.[0]?.object || null;
  }
}

export default Raycaster;
