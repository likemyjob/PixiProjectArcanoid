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
        LeftWall.components['WallComponent'].position.Set(5, this.render.height / 2);
        LeftWall.components['WallComponent'].width = 10;
        LeftWall.components['WallComponent'].height = this.render.height;

        let RightWall = new Wall();
        RightWall.name = 'RightWall';
        RightWall.components['WallComponent'].position.Set(this.render.width - 5, this.render.height / 2);
        RightWall.components['WallComponent'].width = 10;
        RightWall.components['WallComponent'].height = this.render.height;

        let TopWall = new Wall();
        TopWall.name = 'TopWall';
        TopWall.components['WallComponent'].position.Set(this.render.width / 2, 5);
        TopWall.components['WallComponent'].width = this.render.width;
        TopWall.components['WallComponent'].height = 10;

        let DownWall = new Wall();
        DownWall.name = 'DownWall';
        DownWall.components['WallComponent'].position.Set(this.render.width / 2, this.render.height - 5);
        DownWall.components['WallComponent'].width = this.render.width;
        DownWall.components['WallComponent'].height = 100;
    }
}
