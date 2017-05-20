export class Vector extends PIXI.Point {

    clone(): Vector {
        return new Vector(this.x, this.y);
    }

    public addVector(vec: Vector) {
        this.x += vec.x;
        this.y += vec.y;
    }

    public subVector(vec: Vector) {
        this.x -= vec.x;
        this.y -= vec.y;
    }

    public multiply(n: number) {
        this.x *= n;
        this.y *= n;
    }

    isNull() {
        return (this.x == 0) && (this.y == 0);
    }
}
