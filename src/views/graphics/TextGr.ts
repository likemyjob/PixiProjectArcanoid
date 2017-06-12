export class TextGr {
    style: any = {};

    constructor() {
        this.style['default'] = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
        });

        this.style['hpStyle'] = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 14,
            fontStyle: 'normal',
            fontWeight: 'bold',
            stroke: '#ffffff',
            strokeThickness: 5,
            wordWrap: true,
            wordWrapWidth: 440
        });
    }

    public createText(container: PIXI.Container, text: string, style: string) {
        let pt = new PIXI.Text(text, this.style[style]);
        container.addChild(pt);
        return pt;
    }
}
