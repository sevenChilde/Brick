/**
 * Created by win7 on 15-12-11.
 */
var GameScene = cc.Scene.extend({
    onEnter : function() {
        this._super();

        cc.log("GameScene");
        MainLayer.open();
        MyHeroLayer.open();
    }
});

GameScene.open = function() {
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new GameScene());
    }, this);

};