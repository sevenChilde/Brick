/**
 * Created by win7 on 15-12-11.
 */
var MainLayer = cc.Layer.extend({
    ctor : function() {
        this._super();
        return true;
    },
    init : function(from) {
        var layer = new cc.Layer();
        this.addChild(layer);

        var mainBg = new cc.Scale9Sprite(res.MainBg);
        mainBg.setContentSize(960, 640);
        mainBg.attr({
            x : winSize.width / 2,
            y : winSize.height / 2
        });
        layer.addChild(mainBg);

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