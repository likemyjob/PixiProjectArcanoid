import {GameObjectInterface} from "./GameObjectInterface";
export interface ComponentInterface {
    update(delta: number): void;
    init(entity: GameObjectInterface): void;
}
