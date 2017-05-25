import {ComponentInterface} from "../interfaces/ComponentInterface";
import {EntityInterface} from "../interfaces/EntityInterface";
export abstract class Component implements ComponentInterface {

    public name:string;
    public entity: EntityInterface;

    constructor(entity: EntityInterface) {
        this.entity = entity;
    }

}
