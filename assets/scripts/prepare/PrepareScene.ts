// CharacterCreateScene.ts
import { _decorator, Component, Node, EditBox, Button, director, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CharacterCreateScene')
export class CharacterCreateScene extends Component {
    @property(EditBox)
    nameInput: EditBox = null!;

    @property(Button)
    readyBtn: Button = null!;

    @property(Button)
    backBtn: Button = null!;

    start() {
        // 设置最大输入长度
        this.nameInput.maxLength = 20; // 或设置为-1取消限制
        
        // 如果需要设置其他输入相关属性
        this.nameInput.string = ''; // 清空默认文本
        this.nameInput.placeholder = '请输入角色名称';  // 设置占位符文本
        // 绑定就绪按钮点击事件
        const readyBtnlabel = this.readyBtn.node.getComponentInChildren(Label);
        if (readyBtnlabel) {
            readyBtnlabel.string = "GO!!!";
        }
        this.readyBtn.node.on(Button.EventType.CLICK, this.onReady, this);
        
        // 绑定返回按钮点击事件
        const backBtnlabel = this.backBtn.node.getComponentInChildren(Label);
        if (backBtnlabel) {
            backBtnlabel.string = "返回";
        }
        this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
    }

    onReady() {
        // 获取玩家输入的名字
        const playerName = this.nameInput.string;
        
        // 可以将玩家名字保存到全局变量或本地存储
        globalThis.playerName = playerName;
        
        // 切换到游戏主场景
        director.loadScene('GameMainScene');
    }

    onBack() {
        // 返回到欢迎场景
        director.loadScene('WelcomeScene');
    }
}