export interface GameObjectInterface {
    view: PIXI.Sprite;
    speed:number;
    movement:boolean;
    build(): void;
    status(): boolean;
    update(delta: number): void;
    destroy(): void;
}
