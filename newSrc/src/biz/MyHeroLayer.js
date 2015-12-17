/**
 * Created by win7 on 15-12-14.
 */
var MyHeroLayer = cc.Layer.extend({
    robot : undefined,
    arrowL : null,
    arrowR : null,
    leftMove : null,
    rightMove : null,
    topTimeLimit : null,
    ctor : function() {
        this._super();
        this.robot = undefined;
        this.topTimeLimit = false;
        this.scheduleUpdate();
        return true;
    },
    /**
     * 初始化主角和键位
     * @returns {boolean}
     */
    init : function() {
        var self = this;
        cc.spriteFrameCache.addSpriteFrames(res.RobotP);
        var layer = new cc.Layer();
        this.addChild(layer);

        this.robot = new cc.Sprite("#robot_1.png");
        this.robot.attr({
            x : winSize.width / 2,
            y : winSize.height / 2
        });
        layer.addChild(this.robot);
        var animate = HH.func.animate.animation(3, 'robot_', 0.5);
        this.robot.runAction(cc.RepeatForever.create(animate));

        this.arrowL = new cc.Sprite(res.ArrowL);
        this.arrowL.attr({
            x : 160,
            y : 150
        });
        layer.addChild(this.arrowL);
        this._addOperListener(this.arrowL, null, "left");

        this.arrowR = new cc.Sprite(res.ArrowR);
        this.arrowR.attr({
            x : 300,
            y : 150
        });
        layer.addChild(this.arrowR);
        this._addOperListener(this.arrowR, null, "right");


        this.littleTop = new cc.Sprite(res.littleTop);
        this.littleTop.attr({
            x : 700,
            y : 150
        });
        layer.addChild(this.littleTop);
        this._addOperListener(this.littleTop, null, "littleTop");

        this.willTop = new cc.Sprite(res.willTop);
        this.willTop.attr({
            x : 800,
            y : 150
        });
        layer.addChild(this.willTop);
        this._addOperListener(this.willTop, null, "willTop");
        return true;
    },
    getRobot : function() {
        return this.robot;
    },
    /**
     * 添加上，下 小跳，大跳的监听
     * @param obj  需要监听的node
     * @param func 需要的回调
     * @param param 需要的属性
     * @private
     */
    _addOperListener : function(obj, func, param) {
        cc.log("_addOperListener come into");
        obj.param = param;
        obj.func = func;
        var eventL = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan : this.touchBegan.bind(this),
            onTouchMoved : this.touchMoved.bind(this),
            onTouchEnded : this.touchEnded.bind(this)
        });
        cc.eventManager.addListener(eventL.clone(), obj);
    },
    touchBegan : function(touch, event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();

        var rect = cc.rect(0, 0, 0, 0);
        if(target && target.touchRect) {
            rect = cc.rect(-target.touchRect.l, -target.touchRect.b, s.width + target.touchRect.r + target.touchRect.l, s.height + target.touchRect.b + target.touchRect.t);
        } else {
            rect = cc.rect(0, 0, s.width, s.height);
        }

        if(cc.rectContainsPoint(rect, locationInNode)) {
            if(target == this.arrowL) {
                this.leftMove = true;
            } else if(target == this.arrowR) {
                this.rightMove = true;
            }
            return true;
        }
        return false;
    },
    touchMoved : function(touch, event) {

    },
    touchEnded : function(touch, event) {
        var target = event.getCurrentTarget();
        cc.log("touchEnded target.param = " + target.param);
        if(target == this.arrowL) {
            this.leftMove = false;
        } else if(target == this.arrowR) {
            this.rightMove = false;
        } else {
            if(!this.topTimeLimit) {
                this.topTimeLimit = true;
                this._jumpAction(target.param);
            }
        }
    },
    _moveAction : function(dir) {
        var offX = -5;
        if(dir == "right") {
            offX = 5;
        }
        this.robot.runAction(cc.MoveBy.create(0.1, cc.p(offX, 0)));
    },
    _jumpAction : function(dir) {
        var offY = 20;
        if(dir == "willTop") {
            offY = 50;
        }
        var ac1 = cc.JumpBy.create(1, 0, 0, offY, 1);
        this.robot.runAction(cc.Sequence.create(ac1, cc.CallFunc.create(function() {
            this.topTimeLimit = false;
        }.bind(this))));
    },
    update : function(dt) {
        if(this.leftMove) {
            this._moveAction("left");
        } else if(this.rightMove) {
            this._moveAction("right");
        }
    }
});


MyHeroLayer.create = function() {
    var layer = new MyHeroLayer();
    if(layer && layer.init()) {
        return layer;
    }
    return null;
};

MyHeroLayer.open = function() {
    var scene = cc.director.getRunningScene();
    if(!scene) return;

    var layer = MyHeroLayer.create();
    scene.myHeroLayer = layer;
    scene.addChild(layer);
};

MyHeroLayer.close = function() {
    var scene = cc.director.getRunningScene();
    if(!scene) return;

    if(scene.myHeroLayer) {
        scene.myHeroLayer.removeFromParent(true);
        scene.myHeroLayer = undefined;
    }
};
