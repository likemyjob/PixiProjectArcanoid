import {System} from "../../abstract/System";
import {WallGr} from "../../views/graphics/WallGr";
import {EnemyGr} from "../../views/graphics/EnemyGr";
import {BallGr} from "../../views/graphics/BallGr";
import {PlayerGr} from "../../views/graphics/PlayerGr";
import {UserInterfaceGr} from "../../views/graphics/UserInterfaceGr";
export class ViewIntSystem extends System {
    assignComponents: any = {
        'BallComponent': ['initBall'],
        'PlayerComponent': ['initPlayer'],
        'WallComponent': ['initWall'],
        'EnemyComponent': ['initEnemy'],
        'UIComponent': ['initUI'],
    };

    setComponent() {
        this.component = this.entity.components['PixiView'];
    }

    initBall() {
        if (this.checkInit()) {
            return;
        }
        BallGr.initBall(this.component);
    }

    initPlayer() {
        if (this.checkInit()) {
            return;
        }
        PlayerGr.initPlayer(this.component);
    }

    initWall() {
        if (this.checkInit()) {
            return;
        }
        WallGr.initWall(this.component);
    }

    initEnemy() {
        if (this.checkInit()) {
            return;
        }
        EnemyGr.initEnemy(this.component);
    }

    initUI() {
        if (this.checkInit()) {
            return;
        }

        this.component.helper = new UserInterfaceGr(this.component);
    }

    checkInit() {
        if (this.component.initialize) {
            return this.component.initialize;
        }
        this.component.initialize = true;
    }

    static syncPosition(component: any, bodyComp: any) {
        component.container.position.x = bodyComp.position.x - bodyComp.width / 2;
        component.container.position.y = bodyComp.position.y - bodyComp.height / 2;
    }

}
