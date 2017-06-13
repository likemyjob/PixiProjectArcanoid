import {ComponentInterface} from "../interfaces/ComponentInterface";
import {EntityInterface} from "../interfaces/EntityInterface";
export abstract class Component implements ComponentInterface {
    initialize: boolean = false;
    public entity: EntityInterface;

    constructor(entity: EntityInterface) {
        this.entity = entity;
    }

}
