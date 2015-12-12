/**
 * Created by win7 on 15-12-12.
 */
/**
 * 公共方法
 * @type {HH|*|{}}
 */
var HH = HH || {};
HH.func = {

    animate : {
        animation : function(picNum, picName, rateNum) {
            cc.log("picNum = " + picNum + "  picName = " + picName + "  rateNum = " + rateNum);
            var aniFrames = [];
            for(var i = 1; i < picNum; i++) {
                var frames = cc.spriteFrameCache.getSpriteFrame(picName + i + '.png');
                aniFrames.push(frames);
            }
            var animation = new cc.Animation(aniFrames, rateNum);
            var animate = new cc.Animate(animation);
            return animate;
        }
    }
};