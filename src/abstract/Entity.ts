import {Container} from "typedi";
import {EntityInterface} from "../interfaces/EntityInterface";
import {ComponentsMap} from "../interfaces/ComponentsMap";
import {ComponentInterface} from "../interfaces/ComponentInterface";
import {EntityManager} from "../listeners/EntityManager";
export abstract class Entity implements EntityInterface {

    name: string = '';
    public components: ComponentsMap<ComponentInterface> = {};

    private em: EntityManager;

    constructor() {
        this.em = Container.get(EntityManager);
        this.em.addEntity(this);
    }
}
