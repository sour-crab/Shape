// Shape.ts
import { _decorator, Component, Color, Graphics, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Shape')
export class Shape extends Component {
    protected borderThickness: number = 1;
    protected hp: number = 20;
    protected shapeColor: string = 'black';
    protected age: number = 0;
    protected lifeExpectancy: number = 30;
    protected graphics: Graphics | null = null;

    start() {
        // 确保有Graphics组件
        this.graphics = this.getComponent(Graphics);
        if (!this.graphics) {
            this.graphics = this.addComponent(Graphics);
        }
        
        // 初始化属性
        this.initProperties();
        
        // 直接绘制形状，不要设置位置（位置由GameMainScene控制）
        this.draw();
    }

    protected initProperties() {
        this.borderThickness = Math.round(this.gaussianRandom(1, 6));
        this.hp = Math.round(this.gaussianRandom(20, 50));
        this.lifeExpectancy = Math.round(this.gaussianRandom(30, 80));
        
        const colors = ['black', 'white', 'yellow'];
        this.shapeColor = colors[Math.floor(Math.random() * colors.length)];
    }

    protected gaussianRandom(min: number, max: number): number {
        let u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        
        num = num / 10.0 + 0.5;
        num = Math.min(Math.max(num, 0), 1);
        
        return min + (max - min) * num;
    }

    protected draw() {
        // 由子类实现
    }
}