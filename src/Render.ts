function configurable(v:boolean):any {
    return v;
}
namespace Template {

    export class Render {
        private _x: number = 1;

        @configurable(true)
        get x() {
            return this._x;
        }
    }

}
