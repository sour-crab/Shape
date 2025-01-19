import { _decorator, Color } from 'cc';
import { Shape } from './base/Shape';
const { ccclass } = _decorator;

@ccclass('Circle')
export class Circle extends Shape {
    private radius: number = 30;

    protected draw() {
        if (!this.graphics) {
            console.error("No graphics component in Circle draw()");
            return;
        }
        
        console.log("Drawing circle with graphics:", this.graphics);
        
        this.graphics.clear();
        
        // 设置边框样式
        this.graphics.lineWidth = this.borderThickness;
        this.graphics.strokeColor = Color.RED.clone();
        
        // 设置填充颜色
        let fillColor: Color;
        switch(this.shapeColor) {
            case 'black':
                fillColor = new Color(0, 0, 0, 255);
                break;
            case 'white':
                fillColor = new Color(255, 255, 255, 255);
                break;
            case 'yellow':
                fillColor = new Color(255, 255, 0, 255);
                break;
            default:
                fillColor = new Color(255, 0, 0, 255); // 红色作为默认值
        }
        this.graphics.fillColor = fillColor;

        console.log("Drawing circle with colors:", {
            stroke: this.graphics.strokeColor.toString(),
            fill: this.graphics.fillColor.toString()
        });

        // 绘制圆形
        this.graphics.circle(0, 0, this.radius);
        this.graphics.fill();
        this.graphics.stroke();
    }
}