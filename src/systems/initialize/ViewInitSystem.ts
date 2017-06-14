import {System} from "../../abstract/System";
import {WallGr} from "../../views/graphics/WallGr";
import {EnemyGr} from "../../views/graphics/EnemyGr";
import {UserInterfaceView} from "../../views/UserInterfaceView";
import {BallGr} from "../../views/graphics/BallGr";
import {PlayerGr} from "../../views/graphics/PlayerGr";
export class ViewIntSystem extends System {
    assignComponents: any = {
        'BallComponent': ['initBall'],
        'PlayerComponent': ['initPlayer'],
        'WallComponent': ['initWall'],
        'EnemyComponent': ['initEnemy'],
        // 'UserInterfaceView': ['initUserInterface'],
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

    initUserInterface(component: UserInterfaceView) {
        // if (ViewIntSystem.checkInit(component)) {
        //     return;
        // }
        //
        // component.helper = new UserInterfaceGr(component);

        // component.container.removeChildAt(0);
        // PanelGr.createPanel(component);
        // HpGr.createHpBar(component);
        // let textGr = new TextGr();
        //
        // let hp = textGr.createText(component, 'HP', 'hpStyle');
        // hp.position.set(10, 110);
        //
        // component.container.position.set(100, 100);

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
