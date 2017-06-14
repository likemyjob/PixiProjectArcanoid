import {System} from "../abstract/System";
export class DestroySystem extends System {
    assignComponents: any = {
        'DestroyComponent': ['destroy'],
    };

    destroy() {
        this.em.destroyEntity(this.entity);
    }
}
