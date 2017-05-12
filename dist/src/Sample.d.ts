import { GameObjectAbstract } from "./abstract/GameObjectAbstract";
export declare class Sample extends GameObjectAbstract {
    private text;
    private alpha;
    speed: number;
    private components;
    build(): void;
    update(delta: number): void;
    constructor();
}
