import { _decorator, Color } from 'cc';
import { Shape } from './base/Shape';
const { ccclass } = _decorator;

@ccclass('Square')
export class Square extends Shape {
    private sideLength: number = 50;

    protected draw() {
        if (!this.graphics) return;
        
        this.graphics.clear();
        
        // 设置边框样式
        this.graphics.lineWidth = this.borderThickness;
        this.graphics.strokeColor = Color.RED.clone();
        
        // 设置填充颜色
        switch(this.shapeColor) {
            case 'black':
                this.graphics.fillColor = new Color(0, 0, 0, 255);
                break;
            case 'white':
                this.graphics.fillColor = new Color(255, 255, 255, 255);
                break;
            case 'yellow':
                this.graphics.fillColor = new Color(255, 255, 0, 255);
                break;
        }

        // 绘制正方形
        const halfSide = this.sideLength / 2;
        this.graphics.rect(-halfSide, -halfSide, this.sideLength, this.sideLength);
        this.graphics.fill();
        this.graphics.stroke();
    }
}

