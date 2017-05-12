export class PlayerMovementComponent {
    private angle: number = 0;
    public speed: number = 2;
    public movement: boolean = false;
    public position: PIXI.Point = new PIXI.Point(100, 100);
    public entity: any;

    constructor(entity: any) {
        this.entity = entity;
    }
}
