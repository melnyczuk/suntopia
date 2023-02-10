import { Camera, MathUtils, Vector2, Vector3 } from 'three';

type Speed = {
  look: number;
  movement: number;
  turn: number;
};

/**
 * FirstPersonControls class
 *
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */
class FirstPersonControls {
  camera: Camera;
  target: Vector3;
  domElement: Document;
  enabled: boolean;

  speed: Speed;

  lookVertical: boolean;
  autoForward: boolean;

  heightSpeed: boolean;
  heightCoef: number;
  heightMin: number;
  heightMax: number;

  constrainVertical: boolean;

  verticalMin: number;
  verticalMax: number;

  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;

  autoSpeedFactor: number;

  mouse: Vector2;
  mouseDragOn: boolean;

  viewHalf: Vector2;

  lat: number;
  lon: number;
  phi: number;
  theta: number;

  moveUp: boolean;
  moveDown: boolean;

  _contextMenu: (this: Document, ev: Event) => unknown;
  _onMouseMove: (this: Document, ev: MouseEvent) => unknown;
  _onMouseDown: (this: Document, ev: MouseEvent) => unknown;
  _onMouseUp: (this: Document, ev: MouseEvent) => unknown;
  _onKeyDown: (this: Document, ev: KeyboardEvent) => unknown;
  _onKeyUp: (this: Document, ev: KeyboardEvent) => unknown;

  /**
   * Constructor
   * @param  {camera} camera     Camera
   */
  constructor(camera: Camera, speed: Speed) {
    this.camera = camera;
    this.target = new Vector3(0, 0, 0);

    this.domElement = document;

    this.enabled = true;

    this.speed = speed;

    this.lookVertical = true;
    this.autoForward = false;

    this.heightSpeed = false;
    this.heightCoef = 1.0;
    this.heightMin = 0.0;
    this.heightMax = 1.0;

    this.constrainVertical = false;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;

    this.autoSpeedFactor = 0.0;

    this.mouse = new Vector2(0, 0);

    this.lat = 0;
    this.lon = 0;
    this.phi = 0;
    this.theta = 0;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;

    this.mouseDragOn = false;

    this.viewHalf = new Vector2(0, 0);

    this._contextMenu = this.contextMenu.bind(this);
    this._onMouseMove = this.onMouseMove.bind(this);
    this._onMouseDown = this.onMouseDown.bind(this);
    this._onMouseUp = this.onMouseUp.bind(this);
    this._onKeyDown = this.onKeyDown.bind(this);
    this._onKeyUp = this.onKeyUp.bind(this);

    this.handleResize();
    this.bindEvents();
  }

  /**
   * HandleResize function
   */
  public handleResize(): void {
    this.viewHalf.set(window.innerWidth / 2, window.innerHeight / 2);
  }

  /**
   * BindEvents function
   */
  public bindEvents(): void {
    this.domElement.addEventListener('contextmenu', this._contextMenu, false);
    this.domElement.addEventListener('mousemove', this._onMouseMove, false);
    this.domElement.addEventListener('mousedown', this._onMouseDown, false);
    this.domElement.addEventListener('mouseup', this._onMouseUp, false);

    window.addEventListener('keydown', this._onKeyDown, false);
    window.addEventListener('keyup', this._onKeyUp, false);
  }

  /**
   * OnMouseDown function
   * @param  {object} event Event
   */
  public onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    switch (event.button) {
      case 0:
        this.moveForward = true;
        break;
      case 2:
        this.moveBackward = true;
        break;
    }

    this.mouseDragOn = true;
  }

  /**
   * OnMouseUp function
   * @param  {object} event Event
   */
  public onMouseUp(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    switch (event.button) {
      case 0:
        this.moveForward = false;
        break;
      case 2:
        this.moveBackward = false;
        break;
    }

    this.mouseDragOn = false;
  }

  /**
   * OnMouseMove function
   * @param  {object} event Event
   */
  public onMouseMove(event: MouseEvent): void {
    this.mouse.set(
      event.pageX - this.viewHalf.x,
      event.pageY - this.viewHalf.y
    );
  }

  /**
   * OnKeyDown function
   * @param  {object} event Event
   */
  public onKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':
        this.look(
          new Vector2(this.camera.rotation.x, this.camera.rotation.y - 1),
          this.speed.turn
        );
        break;

      case 'w':
        this.moveForward = true;
        break;

      case 'ArrowLeft':
        this.look(
          new Vector2(this.camera.rotation.x - 1, this.camera.rotation.y),
          this.speed.turn
        );
        break;

      case 'a':
        this.moveLeft = true;
        break;

      case 'ArrowDown':
        this.look(
          new Vector2(this.camera.rotation.x, this.camera.rotation.y + 1),
          this.speed.turn
        );
        break;

      case 's':
        this.moveBackward = true;
        break;

      case 'ArrowRight':
        this.look(
          new Vector2(this.camera.rotation.x + 1, this.camera.rotation.y),
          this.speed.turn
        );
        break;

      case 'd':
        this.moveRight = true;
        break;

      case 'r':
        this.moveUp = true;
        break;

      case 'f':
        this.moveDown = true;
        break;
    }
  }

  /**
   * OnKeyUp function
   * @param  {object} event Event
   */
  public onKeyUp(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':
      case 'w':
        /*W*/ this.moveForward = false;
        break;

      case 'ArrowLeft': /*left*/
      case 'a':
        /*A*/ this.moveLeft = false;
        break;

      case 'ArrowDown': /*down*/
      case 's':
        /*S*/ this.moveBackward = false;
        break;

      case 'ArrowRight': /*right*/
      case 'd':
        /*D*/ this.moveRight = false;
        break;

      case 'r':
        /*R*/ this.moveUp = false;
        break;

      case 'f':
        /*F*/ this.moveDown = false;
        break;
    }
  }

  /**
   * Update function
   * @param  {object} delta Delta
   */
  public update(delta: number): void {
    if (this.enabled === false) return;

    if (this.heightSpeed) {
      const y = MathUtils.clamp(
        this.camera.position.y,
        this.heightMin,
        this.heightMax
      );
      const heightDelta = y - this.heightMin;

      this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);
    } else {
      this.autoSpeedFactor = 0.0;
    }

    const actualMoveSpeed = delta * this.speed.movement;

    if (this.moveForward || (this.autoForward && !this.moveBackward))
      this.camera.translateZ(-(actualMoveSpeed + this.autoSpeedFactor));
    if (this.moveBackward) this.camera.translateZ(actualMoveSpeed);

    if (this.moveLeft) this.camera.translateX(-actualMoveSpeed);
    if (this.moveRight) this.camera.translateX(actualMoveSpeed);

    if (this.moveUp) this.camera.translateY(actualMoveSpeed);
    if (this.moveDown) this.camera.translateY(-actualMoveSpeed);

    const actualLookSpeed = delta * this.speed.look;
    this.look(this.mouse, actualLookSpeed);
  }

  public look(direction: Vector2, rate: number) {
    const verticalLookRatio = !this.constrainVertical
      ? 1
      : Math.PI / (this.verticalMax - this.verticalMin);

    this.lon += direction.x * rate;

    if (this.lookVertical) {
      this.lat -= direction.y * rate * verticalLookRatio;
    }

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = MathUtils.degToRad(90 - this.lat);

    this.theta = MathUtils.degToRad(this.lon);

    if (this.constrainVertical) {
      this.phi = MathUtils.mapLinear(
        this.phi,
        0,
        Math.PI,
        this.verticalMin,
        this.verticalMax
      );
    }

    const targetPosition = this.target;
    const position = this.camera.position;

    targetPosition.set(
      position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta),
      position.y + 100 * Math.cos(this.phi),
      position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta)
    );

    this.camera.lookAt(targetPosition);
  }

  public turn(direction: Vector2, rate: number) {
    const verticalLookRatio = !this.constrainVertical
      ? 1
      : Math.PI / (this.verticalMax - this.verticalMin);

    this.lon += direction.x * rate;

    if (this.lookVertical) {
      this.lat -= direction.y * rate * verticalLookRatio;
    }

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = MathUtils.degToRad(90 - this.lat);

    this.theta = MathUtils.degToRad(this.lon);

    if (this.constrainVertical) {
      this.phi = MathUtils.mapLinear(
        this.phi,
        0,
        Math.PI,
        this.verticalMin,
        this.verticalMax
      );
    }

    const targetPosition = this.target;
    const position = this.camera.position;

    targetPosition.set(
      position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta),
      position.y + 100 * Math.cos(this.phi),
      position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta)
    );

    this.camera.lookAt(targetPosition);
  }

  /**
   * ContextMenu function
   * @param  {object} event Event
   */
  public contextMenu(event: Event): void {
    event.preventDefault();
  }

  /**
   * Dispose function
   */
  public dispose(): void {
    this.domElement.removeEventListener(
      'contextmenu',
      this._contextMenu,
      false
    );
    this.domElement.removeEventListener('mousedown', this._onMouseDown, false);
    this.domElement.removeEventListener('mousemove', this._onMouseMove, false);
    this.domElement.removeEventListener('mouseup', this._onMouseUp, false);

    window.removeEventListener('keydown', this._onKeyDown, false);
    window.removeEventListener('keyup', this._onKeyUp, false);
  }
}

export default FirstPersonControls;
