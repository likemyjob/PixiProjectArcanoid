export interface GameObjectInterface {
    build():void;
    status(): boolean;
    update(delta:number): void;
    destroy(): void;
}
