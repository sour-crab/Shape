import { _decorator, Component, Node, Label, Vec3, input, Input, KeyCode, Graphics, view, UITransform, Canvas, Color, Camera } from 'cc';
import { Circle } from '../shape/Circle';
import { Square } from '../shape/Square';
import { Triangle } from '../shape/Triangle';
import { Shape } from '../shape/base/Shape';

const { ccclass, property } = _decorator;

@ccclass('GameMainScene')
export class GameMainScene extends Component {
    @property(Node)
    private player: Node | null = null;

    @property(Label)
    private nameLabel: Label | null = null;

    @property(Canvas)
    private canvas: Canvas | null = null;

    private moveSpeed: number = 200;
    private moveDirection: Vec3 = new Vec3(0, 0, 0);
    private isMoving: boolean = false;

    private keyStates = {
        up: false,
        down: false,
        left: false,
        right: false
    };

    start() {
        console.log("Player node:", this.player);
        console.log("Player active:", this.player?.active);
        console.log("Player layer:", this.player?.layer);
        console.log("Player parent:", this.player?.parent);
        console.log("Player components:", this.player?.components);
        console.log("Name label:", this.nameLabel);
        console.log("Canvas:", this.canvas);
        console.log("Player name from global:", globalThis.playerName);

        // 确保有canvas引用
        if (!this.canvas) {
            this.canvas = this.getComponentInChildren(Canvas);
        }

        // 设置相机
        const camera = this.canvas?.node.getComponentInChildren(Camera);
        if (camera) {
            camera.clearFlags = Camera.ClearFlag.SOLID_COLOR;
            camera.clearColor = new Color(40, 40, 40, 255);
            camera.projection = Camera.ProjectionType.ORTHO;
        }

        // 初始化玩家节点
        this.initPlayer();
        
        // 初始化名字标签
        this.initNameLabel();
        
        // 注册键盘事件
        this.registerInput();

        // 打印出名字，用于调试
        console.log("Player name:", globalThis.playerName);
    }

    private initPlayer() {
        if (!this.player) return;
        
        console.log("Initializing player...");
        
        // 确保Player是Canvas的子节点
        if (this.canvas && this.player.parent !== this.canvas.node) {
            this.player.parent = this.canvas.node;
        }
        
        // 添加 UITransform 组件
        let transform = this.player.getComponent(UITransform);
        if (!transform) {
            transform = this.player.addComponent(UITransform);
            transform.setContentSize(100, 100);
        }
        
        // 确保有 Graphics 组件
        let graphics = this.player.getComponent(Graphics);
        if (!graphics) {
            graphics = this.player.addComponent(Graphics);
        }
        
        // 获取Canvas的尺寸
        const canvas = this.canvas.getComponent(UITransform);
        if (canvas) {
            const width = canvas.width;
            const height = canvas.height;
            // 设置到画布中心
            this.player.setPosition(new Vec3(0, 0, 0));
        }
        
        this.player.active = true;
        
        this.scheduleOnce(() => {
            this.createRandomShape();
        }, 0);
    }

    private initNameLabel() {
        if (!this.nameLabel || !this.canvas) return;
        
        // 设置 Label 属性
        this.nameLabel.fontSize = 20;
        this.nameLabel.lineHeight = 20;
        this.nameLabel.color = Color.WHITE;
        
        // 确保设置玩家名字
        const playerName = globalThis.playerName || "Player";
        console.log("Setting player name:", playerName); // 调试用
        this.nameLabel.string = playerName;
        
        // 立即更新位置
        this.updateNameLabelPosition();
    }

    private createRandomShape() {
        if (!this.player) return;

        const existingShape = this.player.getComponent(Shape);
        if (existingShape) {
            existingShape.destroy();
        }

        const graphics = this.player.getComponent(Graphics);
        if (!graphics) {
            console.error("Graphics component not found!");
            return;
        }

        // 确保 Graphics 是激活的
        graphics.enabled = true;

        const shapes = [Circle, Square, Triangle];
        const RandomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const shape = this.player.addComponent(RandomShape as typeof Shape);

        // 强制立即绘制
        if (shape) {
            graphics.clear();
            shape['draw']();
            console.log("Shape drawn:", shape);
            console.log("Graphics component state:", {
                enabled: graphics.enabled,
                color: graphics.color,
                position: this.player.position
            });
        }
    }

    private registerInput() {
        // 注册按键按下事件
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        // 注册按键释放事件
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(deltaTime: number) {
        if (!this.player || !this.isMoving) return;

        // 计算移动距离
        const moveAmount = new Vec3(
            this.moveDirection.x * this.moveSpeed * deltaTime,
            this.moveDirection.y * this.moveSpeed * deltaTime,
            0
        );

        // 更新玩家位置
        const newPos = this.player.position.clone().add(moveAmount);
        this.player.setPosition(newPos);

        // 确保每一帧都更新名字标签位置
        this.updateNameLabelPosition();
    }

    onDestroy() {
        // 清理事件监听
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    private onKeyDown(event: any) {
        switch(event.keyCode) {
            case KeyCode.ARROW_UP:
            case KeyCode.KEY_W:
                this.keyStates.up = true;
                break;
            case KeyCode.ARROW_DOWN:
            case KeyCode.KEY_S:
                this.keyStates.down = true;
                break;
            case KeyCode.ARROW_LEFT:
            case KeyCode.KEY_A:
                this.keyStates.left = true;
                break;
            case KeyCode.ARROW_RIGHT:
            case KeyCode.KEY_D:
                this.keyStates.right = true;
                break;
        }
        this.updateMoveDirection();
    }

    private onKeyUp(event: any) {
        switch(event.keyCode) {
            case KeyCode.ARROW_UP:
            case KeyCode.KEY_W:
                this.keyStates.up = false;
                break;
            case KeyCode.ARROW_DOWN:
            case KeyCode.KEY_S:
                this.keyStates.down = false;
                break;
            case KeyCode.ARROW_LEFT:
            case KeyCode.KEY_A:
                this.keyStates.left = false;
                break;
            case KeyCode.ARROW_RIGHT:
            case KeyCode.KEY_D:
                this.keyStates.right = false;
                break;
        }
        this.updateMoveDirection();
    }

    private updateMoveDirection() {
        this.moveDirection.x = 0;
        this.moveDirection.y = 0;

        if (this.keyStates.up) this.moveDirection.y += 1;
        if (this.keyStates.down) this.moveDirection.y -= 1;
        if (this.keyStates.left) this.moveDirection.x -= 1;
        if (this.keyStates.right) this.moveDirection.x += 1;

        if (this.moveDirection.x !== 0 || this.moveDirection.y !== 0) {
            Vec3.normalize(this.moveDirection, this.moveDirection);
            this.isMoving = true;
        } else {
            this.isMoving = false;
        }
    }

    private updateNameLabelPosition() {
        if (!this.player || !this.nameLabel) return;
        
        // 由于都在Canvas下，直接使用相对位置即可
        const playerPos = this.player.position;
        this.nameLabel.node.position = new Vec3(playerPos.x, playerPos.y + 50, 0);
    }
}