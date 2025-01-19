import { _decorator, Component, Button, director, sys, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartGame')
export class StartGame extends Component {
    @property(Button)
    startBtn: Button = null!;

    @property(Button)
    exitBtn: Button = null!;

    start() {
        // 绑定开始游戏按钮点击事件
        const startBtnlabel = this.startBtn.node.getComponentInChildren(Label);
        if (startBtnlabel) {
            startBtnlabel.string = "开始游戏";
        }
        this.startBtn.node.on(Button.EventType.CLICK, this.onStartGame, this);
        
        // 绑定退出游戏按钮点击事件
        const exitBtnlabel = this.exitBtn.node.getComponentInChildren(Label);
        if (exitBtnlabel) {
            exitBtnlabel.string = "退出游戏";
        }
        this.exitBtn.node.on(Button.EventType.CLICK, this.onExitGame, this);
    }

    onStartGame() {
        // 切换到角色创建场景
        director.loadScene('PrepareScene');
    }

    onExitGame() {
        // 退出游戏
        window.close();
    }
}


