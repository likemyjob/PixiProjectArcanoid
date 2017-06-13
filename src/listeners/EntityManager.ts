import {Container, Service} from "typedi";
import {EntityInterface} from "../interfaces/EntityInterface";
import {SystemInterface} from "../interfaces/SystemInterface";
import {Render} from "../Render";
Service();
export class EntityManager {

    render: Render;
    entities: any = [];
    systems: any = [];

    constructor() {
        this.render = Container.get(Render);
    }

    addEntity(obj: any) {
        this.entities.push(obj);
    }

    addSystem(obj: any) {
        this.systems.push(obj);
    }

    destroyEntity(entity: EntityInterface) {
        if (entity.components['DestroyComponent']) {
            this.render.app.stage.removeChild(entity.components['ViewComponent'].container);
            this.render.world.DestroyBody(entity.components['PhysicsComponent'].body);
            let index = this.entities.indexOf(entity);
            delete this.entities[index];
        }
    }

    update() {
        let that = this;
        that.entities.forEach(function (entity: EntityInterface) {
            that.systems.forEach(function (system: SystemInterface) {
                system.update(entity);
            })
        })
    }
}
