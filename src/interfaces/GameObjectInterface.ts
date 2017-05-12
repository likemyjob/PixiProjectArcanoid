export interface GameObjectInterface {
    view: PIXI.Sprite;
    speed:number;
    build(): void;
    status(): boolean;
    update(delta: number): void;
    destroy(): void;
}
