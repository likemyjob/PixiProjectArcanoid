// import {Component} from "./abstract/Component";
// import {Vector} from "./Vector";
// export class ControlMouse extends Component {
//
//     private directionVector: Vector = new Vector(0, 0);
//     private targetPoint: PIXI.Point;
//
//     update(delta: number): void {
//         this.move();
//     }
//
//     protected eventsListener() {
//         document.addEventListener('click', (e: MouseEvent) => {
//             this.click(e);
//         })
//     }
//
//     public move() {
//         if (!this.directionVector.isNull()) {
//             this.start();
//             let module = Math.sqrt(Math.pow(this.directionVector.x, 2) + Math.pow(this.directionVector.y, 2));
//             this.entity.view.position.x += this.entity.speed * this.directionVector.x / module;
//             this.entity.view.position.y += this.entity.speed * this.directionVector.y / module;
//
//             let length = Math.sqrt(Math.pow(this.targetPoint.x - this.entity.view.position.x, 2) + Math.pow(this.targetPoint.y - this.entity.view.position.y, 2));
//             if (length < this.entity.speed) {
//                 this.directionVector = new Vector(0, 0);
//                 this.stop();
//             }
//         }
//     }
//
//     private start() {
//         this.entity.movement = true;
//     }
//
//     private stop() {
//         this.directionVector = new Vector(0, 0);
//         this.entity.movement = false;
//     }
//
//     click(e: MouseEvent) {
//         this.start();
//         this.directionVector = new Vector(e.clientX - this.entity.view.position.x, e.clientY - this.entity.view.position.y);
//         this.targetPoint = new PIXI.Point(e.clientX, e.clientY);
//     }
//
// }
