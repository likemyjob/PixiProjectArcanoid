import {Container, Service} from "typedi";
import {EntityInterface} from "../interfaces/EntityInterface";
import {SystemInterface} from "../interfaces/SystemInterface";
import {Render} from "../Render";
import {DestroyComponent} from "../components/DestroyComponent";
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
        this.render.app.stage.removeChild(entity.components['PixiView'].container);
        this.render.world.DestroyBody(entity.components['PhysicsComponent'].body);
        let index = this.entities.indexOf(entity);
        this.entities.splice(index, 1);
        // delete this.entities[index];
    }

    findEntity(className: any) {
        return this.entities.find((e: any) => (e instanceof className));
    }

    findEntityByBody(body: Box2D.Dynamics.b2Body, component: string): EntityInterface {
        return this.entities.find((e: any) => ((e.components[component] && body == e.components['PhysicsComponent'].body)));
    }

    removeSetOfEntities(entity: any) {
        this.entities.forEach((e: EntityInterface) => {
            if (e instanceof entity) {
                e.components['DestroyComponent'] = new DestroyComponent(e);
            }
        });
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
