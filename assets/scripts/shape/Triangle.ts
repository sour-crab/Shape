import { _decorator, Color } from 'cc';
import { Shape } from './base/Shape';
const { ccclass } = _decorator;

export class Triangle extends Shape {
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

        // 绘制等边三角形
        const height = this.sideLength * Math.sqrt(3) / 2;
        const points = [
            { x: 0, y: height / 2 },                    // 顶点
            { x: -this.sideLength / 2, y: -height / 2 }, // 左下角
            { x: this.sideLength / 2, y: -height / 2 }   // 右下角
        ];

        this.graphics.moveTo(points[0].x, points[0].y);
        this.graphics.lineTo(points[1].x, points[1].y);
        this.graphics.lineTo(points[2].x, points[2].y);
        this.graphics.close();
        this.graphics.fill();
        this.graphics.stroke();
    }
}