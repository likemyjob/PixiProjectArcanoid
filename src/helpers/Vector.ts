// import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
// export class Vector {
//
//     x: <T>;
//     y: number;
//
//     constructor(vx: <T>, y: number = null) {
//         if (y === null) {
//             this.x = vx.x;
//             this.y = vx.y;
//         }
//         this.x = vx;
//         this.y = y;
//     }
//
//     clone(): Vector {
//         return new Vector(this.x, this.y);
//     }
//
//     public addVector(vec: Vector) {
//         this.x += vec.x;
//         this.y += vec.y;
//     }
//
//     public subVector(vec: Vector) {
//         this.x -= vec.x;
//         this.y -= vec.y;
//     }
//
//     public multiply(n: number) {
//         this.x *= n;
//         this.y *= n;
//     }
//
//     isNull() {
//         return (this.x == 0) && (this.y == 0);
//     }
// }
