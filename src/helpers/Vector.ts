export class Vector extends PIXI.Point {
    public addVector(vec: Vector) {
        this.x += vec.x;
        this.y += vec.y;
    }

    public subVector(vec: Vector) {
        this.x -= vec.x;
        this.y -= vec.y;
    }

    isNull() {
        return (this.x == 0) && (this.y == 0);
    }
}
