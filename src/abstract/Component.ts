import {ComponentInterface} from "../interfaces/ComponentInterface";
import {GameObjectInterface} from "../interfaces/GameObjectInterface";
export abstract class Component implements ComponentInterface {

    protected entity: GameObjectInterface;

    protected eventsListener() {
    }

    constructor() {
        this.eventsListener();
    }

    update(delta: number): void {
    }

    init(entity: GameObjectInterface): void {
        this.entity = entity;
    }
}
