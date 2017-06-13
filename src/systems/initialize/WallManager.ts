import {System} from "../../abstract/System";
import {Wall} from "../../entities/Wall";
export class WallManager extends System {

    constructor() {
        super();
        this.createWalls();
    }

    createWalls() {
        let LeftWall = new Wall();
        LeftWall.name = 'LeftWall';
        LeftWall.components['PhysicsComponent'].position.Set(5, this.render.height / 2);
        LeftWall.components['PhysicsComponent'].width = 10;
        LeftWall.components['PhysicsComponent'].height = this.render.height;

        let RightWall = new Wall();
        RightWall.name = 'RightWall';
        RightWall.components['PhysicsComponent'].position.Set(this.render.width - 5, this.render.height / 2);
        RightWall.components['PhysicsComponent'].width = 10;
        RightWall.components['PhysicsComponent'].height = this.render.height;

        let TopWall = new Wall();
        TopWall.name = 'TopWall';
        TopWall.components['PhysicsComponent'].position.Set(this.render.width / 2, 5);
        TopWall.components['PhysicsComponent'].width = this.render.width;
        TopWall.components['PhysicsComponent'].height = 10;

        let DownWall = new Wall();
        DownWall.name = 'DownWall';
        DownWall.components['PhysicsComponent'].position.Set(this.render.width / 2, this.render.height - 5);
        DownWall.components['PhysicsComponent'].width = this.render.width;
        DownWall.components['PhysicsComponent'].height = 100;
    }
}
