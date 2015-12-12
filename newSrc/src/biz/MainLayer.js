/**
 * Created by win7 on 15-12-11.
 */
var MainLayer = cc.Layer.extend({
    ctor : function() {
        this._super();
        return true;
    },
    init : function(from) {
        cc.spriteFrameCache.addSpriteFrames(res.RobotP);

        var layer = new cc.Layer();
        this.addChild(layer);

        var mainBg = new cc.Sprite(res.MainBg);
        mainBg.attr({
            x : winSize.width / 2,
            y : winSize.height / 2
        });
        layer.addChild(mainBg);


        this.robot = new cc.Sprite("#robot_1.png");
        this.robot.attr({
            x : winSize.width / 2,
            y : winSize.height / 2
        });
        layer.addChild(this.robot);

//        var aniFrames = [];
//        for(var i = 1; i < 3; i++) {
//            var frames = cc.spriteFrameCache.getSpriteFrame('robot_' + i + '.png');
//            aniFrames.push(frames);
//        }
//        var animation = new cc.Animation(aniFrames, 0.5);
        var animate = HH.func.animate.animation(3, 'robot_', 0.5);//new cc.Animate(animation);
        this.robot.runAction(cc.RepeatForever.create(animate));

        return true;
    }
});

MainLayer.create = function(from) {
    var layer = new MainLayer();
    if(layer && layer.init(from)) {
        return layer;
    }
    return null;
};

MainLayer.open = function(from) {
    var scene = cc.director.getRunningScene();
    if(scene == null) return;

    var layer = MainLayer.create(from);
    scene.mainLayer = layer;
    scene.addChild(layer);
};

MainLayer.close = function() {
    var scene = cc.director.getRunningScene();
    if(scene == null) return;

    if(scene.mainLayer) {
        scene.mainLayer.removeFromParent(true);
        scene.mainLayer = undefined;
    }
};